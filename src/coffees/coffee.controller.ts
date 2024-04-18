import { Controller, Get } from '@nestjs/common';

@Controller('coffee')
export class CoffeeController {
  @Get('/')
  findAll() {
    return [
      {
        id: '1',
        name: 'Coffee 1',
        brand: 'Brand 1',
        flavors: ['chocolate', 'vanilla'],
      },
      { id: '2', name: 'Coffee 2', brand: 'Brand 2', flavors: ['caramel'] },
      { id: '3', name: 'Coffee 3', brand: 'Brand 3', flavors: ['mocha'] },
      { id: '4', name: 'Coffee 4', brand: 'Brand 4', flavors: ['mocha'] },
    ];
  }
}
