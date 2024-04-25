import { IsString } from 'class-validator';
import { Flavor } from '../entities/flavors.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of the coffee' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'the brand of this coffee' })
  @IsString()
  brand: string;

  @ApiProperty({ description: 'the list of flavors' })
  @IsString({ each: true })
  flavors: Flavor[];
}
