import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create.coffee.dto';
import { Flavor } from './entities/flavors.entity';
import { off } from 'process';
import { PaginateQueryDto } from 'src/common/dto/paginate.query.dto';
import { UpdateCoffeeDto } from './dto/update.coffee.dto';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  async findAll(paginateQuery: PaginateQueryDto) {
    console.log(paginateQuery);
    return await this.coffeeRepository.find({
      relations: ['flavors'],
      skip: paginateQuery?.offset,
      take: paginateQuery?.limit,
    });
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
    const flavors = updateCoffeeDto.flavors;
    if (flavors) {
      updateCoffeeDto.flavors = await this.createFlavors(flavors);
    }
    await this.coffeeRepository.update(id, {
      ...updateCoffeeDto,
      flavors: updateCoffeeDto.flavors,
    });
    return await this.coffeeRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });
  }
}
