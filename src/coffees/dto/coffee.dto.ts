import { IsString } from 'class-validator';

export class CoffeeDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsString({ each: true })
  flavors: string[];
}
