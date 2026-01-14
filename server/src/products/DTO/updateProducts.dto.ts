import { PartialType } from '@nestjs/mapped-types';
import { ProductsDto } from './products.dto.js';

export class UpdateProductsDto extends PartialType(ProductsDto) {}
