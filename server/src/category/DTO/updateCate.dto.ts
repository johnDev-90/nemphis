import { PartialType } from '@nestjs/swagger';
import { createCatDto } from './createCat.dto.js';

export class updateCatDto extends PartialType(createCatDto) {}
