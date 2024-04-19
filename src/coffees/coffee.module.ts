import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavors.entity';
import { EventEntity } from 'src/events/entities/event.entity';

class MockCoffeeService {}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, EventEntity])],
  controllers: [CoffeeController],
  providers: [CoffeeService],
  exports: [CoffeeService],
})
export class CoffeeModule {}

// @Module({
//   imports: [TypeOrmModule.forFeature([Coffee, Flavor, EventEntity])],
//   controllers: [CoffeeController],
//   providers: [{ provide: CoffeeService, useValue: new MockCoffeeService() }],
//   exports: [CoffeeService],
// })
// export class CoffeeModule {}
