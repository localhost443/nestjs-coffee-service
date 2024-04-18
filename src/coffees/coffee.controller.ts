import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create.coffee.dto';
import { CoffeeService } from './coffee.service';
import { query } from 'express';
import { PaginateQueryDto } from 'src/common/dto/paginate.query.dto';
import { UpdateCoffeeDto } from './dto/update.coffee.dto';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}
  @Get('/')
  async findAll(@Query() paginateQuery: PaginateQueryDto) {
    return await this.coffeeService.findAll(paginateQuery);
  }

  @Post('/')
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    await this.coffeeService.create(createCoffeeDto);
    return createCoffeeDto;
  }

  @Patch('/:id')
  async update(
    @Body() updateCoffeeDto: UpdateCoffeeDto,
    @Param('id') id: number,
  ) {
    return await this.coffeeService.update(updateCoffeeDto, id);
  }
}
