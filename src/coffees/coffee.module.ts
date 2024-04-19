import { Injectable, Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavors.entity';
import { EventEntity } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { DataSource } from 'typeorm';
import { DatabaseModule } from 'src/database/database.module';

@Injectable()
export class CoffeeBrandFactory {
  create() {
    /**
     * Your logic for destroying the multiverse for coffee , and bring them all here
     */
    return ['idiot', 'blind', 'date', 'hen', 'egg', 'cow', 'goat'];
  }
}
@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, EventEntity]),
    DatabaseModule.register({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: '',
      port: 3306,
      database: 'hukka',
    }),
  ],
  controllers: [CoffeeController],
  providers: [
    CoffeeService,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (dataSource: DataSource) => {
        const coffeeBrands = await Promise.all(['one', 'tow', 'three']);
        console.log('awaiting done');
        return coffeeBrands;
      },
    },
  ],
  exports: [CoffeeService],
})
export class CoffeeModule {}

/**
 * Example of injectable service injection in ioc
 */
// @Injectable()
// export class CoffeeBrandFactory {
//   create() {
//     /**
//      * Your logic for destroying the multiverse for coffee , and bring them all here
//      */
//     return ['idiot', 'blind', 'date', 'hen', 'egg', 'cow', 'goat'];
//   }
// }
// @Module({
//   imports: [TypeOrmModule.forFeature([Coffee, Flavor, EventEntity])],
//   controllers: [CoffeeController],
//   providers: [
//     CoffeeService,
//     CoffeeBrandFactory,
//     {
//       provide: COFFEE_BRANDS,
//       useFactory: (coffeeBrandFactory: CoffeeBrandFactory) =>
//         coffeeBrandFactory.create(),
//       inject: [CoffeeBrandFactory],
//     },
//   ],
//   exports: [CoffeeService],
// })
// export class CoffeeModule {}

/**
 * Example for provide class Provider
 */

// class ConfigService {}
// class ProductionConfigService {}
// class DevelopmentConfigService {}
// @Module({
//   imports: [TypeOrmModule.forFeature([Coffee, Flavor, EventEntity])],
//   controllers: [CoffeeController],
//   providers: [
//     CoffeeService,
//     {
//       provide: ConfigService,
//       useClass:
//         process.env?.NODE_ENV === 'PRODUCTION'
//           ? ProductionConfigService
//           : DevelopmentConfigService,
//     },
//   ],
//   exports: [CoffeeService],
// })
// export class CoffeeModule {}

/**
 * Example for Provide Values
 */

// @Module({
//   imports: [TypeOrmModule.forFeature([Coffee, Flavor, EventEntity])],
//   controllers: [CoffeeController],
//   providers: [
//     CoffeeService,
//     {
//       provide: COFFEE_BRANDS,
//       useValue: ['body brew', 'milkshake', 'chocolate'],
//     },
//   ],
//   exports: [CoffeeService],
// })

// class MockCoffeeService {}
// @Module({
//   imports: [TypeOrmModule.forFeature([Coffee, Flavor, EventEntity])],
//   controllers: [CoffeeController],
//   providers: [{ provide: CoffeeService, useValue: new MockCoffeeService() }],
//   exports: [CoffeeService],
// })
// export class CoffeeModule {}
