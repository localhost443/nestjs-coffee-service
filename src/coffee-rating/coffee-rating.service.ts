import { Injectable } from '@nestjs/common';
import { CoffeeService } from 'src/coffees/coffee.service';

@Injectable()
export class CoffeeRatingService {
  constructor(private readonly coffeeService: CoffeeService) {}
  async findAll() {
    return await this.coffeeService.findAll();
  }
}
