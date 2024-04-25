import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create.coffee.dto';
import { CoffeeService } from './coffee.service';
import { PaginateQueryDto } from 'src/common/dto/paginate.query.dto';
import { UpdateCoffeeDto } from './dto/update.coffee.dto';

@UsePipes(ValidationPipe)
@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}
  @Get('/')
  async findAll(@Query() paginateQuery: PaginateQueryDto) {
    return await this.coffeeService.findAll(paginateQuery);
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.coffeeService.findOne(id);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this.coffeeService.remove(id);
  }

  @Post('/')
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    await this.coffeeService.create(createCoffeeDto);
    return createCoffeeDto;
  }

  @Post('/:id')
  async recommendCoffee(@Param('id') id: number) {
    return this.coffeeService.recommendThi;
    sCoffee(id);
  }

  @Patch('/:id')
  async update(
    @Body() updateCoffeeDto: UpdateCoffeeDto,
    @Param('id') id: number,
  ) {
    return await this.coffeeService.update(updateCoffeeDto, id);
  }
}
