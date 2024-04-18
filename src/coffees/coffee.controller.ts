import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create.coffee.dto';
import { CoffeeService } from './coffee.service';
import { query } from 'express';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}
  @Get('/')
  async findAll(@Query() paginateQuery: { limit: number; offset: number }) {
    return await this.coffeeService.findAll(paginateQuery);
  }

  @Post('/')
  async create(@Body() CreateCoffeeDto: CreateCoffeeDto) {
    return await this.coffeeService.create(CreateCoffeeDto);
  }
}
