import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeeRatingController } from './coffee-rating.controller';
import { CoffeeModule } from 'src/coffees/coffee.module';

@Module({
  providers: [CoffeeRatingService],
  imports: [CoffeeModule],
  controllers: [CoffeeRatingController],
})
export class CoffeeRatingModule {}
