import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class PaginateQueryDto {
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  limit: number;
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  offset: number;
}
