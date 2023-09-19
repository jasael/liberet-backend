import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Category } from 'src/shared/database/models/category.entity';
import { DeepPartial } from 'typeorm';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  category: DeepPartial<Category>;
}
