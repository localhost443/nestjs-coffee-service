import { Controller, Get } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';

@Controller('coffee-rating')
export class CoffeeRatingController {
  constructor(private coffeeRatingService: CoffeeRatingService) {}
  @Get('/')
  async getAll() {
    return await this.coffeeRatingService.findAll();
  }
}
