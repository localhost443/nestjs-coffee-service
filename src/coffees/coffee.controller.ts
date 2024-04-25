import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create.coffee.dto';
import { CoffeeService } from './coffee.service';
import { PaginateQueryDto } from 'src/common/dto/paginate.query.dto';
import { UpdateCoffeeDto } from './dto/update.coffee.dto';
import { PublicRoute } from 'src/common/decorators/public.decorator';
import { PersonalParseIntPipe } from 'src/common/pipes/personal-parse-int.pipe';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffee')
@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get('/')
  async findAll(@Query() paginateQuery: PaginateQueryDto) {
    return await this.coffeeService.findAll(paginateQuery);
  }

  @ApiResponse({ status: 403, description: 'Forbidden' })
  @PublicRoute()
  @Get('/:id')
  async findOne(@Param('id', PersonalParseIntPipe) id: number) {
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
    return this.coffeeService.recommendThisCoffee(id);
  }

  @Patch('/:id')
  async update(
    @Body() updateCoffeeDto: UpdateCoffeeDto,
    @Param('id') id: number,
  ) {
    return await this.coffeeService.update(updateCoffeeDto, id);
  }
}
