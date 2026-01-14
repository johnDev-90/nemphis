import { Type } from 'class-transformer';
import {
  IsBoolean,
  isDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  isString,
  IsString,
} from 'class-validator';

export class ProductsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @Type(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
