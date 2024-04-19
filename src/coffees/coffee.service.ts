import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateCoffeeDto } from './dto/create.coffee.dto';
import { Flavor } from './entities/flavors.entity';
import { PaginateQueryDto } from 'src/common/dto/paginate.query.dto';
import { UpdateCoffeeDto } from './dto/update.coffee.dto';
import { EventEntity } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { CoffeeBrandFactory } from './coffee.module';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly dataSource: DataSource,
    @Inject(COFFEE_BRANDS)
    private readonly coffeeBrandFactory: CoffeeBrandFactory,
  ) {
    console.log(coffeeBrandFactory);
  }

  async findAll(paginateQuery?: PaginateQueryDto) {
    const { limit = 10, offset = 0 } = paginateQuery || {};
    return await this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async remove(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (!coffee) throw new NotFoundException('Coffee Not Found');
    await this.coffeeRepository.remove(coffee);
    return coffee;
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException('Coffee not found');
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto);
    if (createCoffeeDto?.flavors?.length !== 0) {
      const flavors = await this.createFlavors(createCoffeeDto.flavors);
      createCoffeeDto.flavors = flavors;
    }
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async createFlavors(flavors: Flavor[]) {
    return await Promise.all(
      flavors.map(async (name) => {
        const isInDatabase = await this.flavorRepository.findOne({
          where: { name: name.toString() },
        });
        if (isInDatabase) {
          return isInDatabase;
        }
        const flavor = await this.flavorRepository.create({
          name: name.toString(),
        });
        return await this.flavorRepository.save(flavor);
      }),
    );
  }

  async update(updateCoffeeDto: UpdateCoffeeDto, id: number) {
    if (updateCoffeeDto?.flavors?.length !== 0 && updateCoffeeDto) {
      updateCoffeeDto.flavors = await this.createFlavors(
        updateCoffeeDto.flavors,
      );
    }
    const coffee = await this.coffeeRepository.preload({
      id: id,
      ...updateCoffeeDto,
      flavors: updateCoffeeDto.flavors,
    });
    if (!coffee) {
      throw new NotFoundException('Coffee not found');
    }
    return await this.coffeeRepository.save(coffee);
  }

  async recommendThisCoffee(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (!coffee) throw new NotFoundException('Coffee Not Found');
    return await this.recommendCoffee(coffee);
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendation++;
      const event = new EventEntity();
      event.name = 'recommend_coffee';
      event.type = 'coffee';
      event.payload = { coffeeId: coffee.id };
      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(event);
    } catch (error) {
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
    return await this.findOne(coffee.id);
  }
}
