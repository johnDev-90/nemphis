import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { error, timeStamp } from 'console';

import { PrismaService } from '../prisma/prisma.service.js';
import { createCatDto } from './DTO/createCat.dto.js';
import { updateCatDto } from './DTO/updateCate.dto.js';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategoriesFromDb() {
    const categories = await this.prisma.category.findMany();

    if (!categories.length)
      throw new NotFoundException('No hay categorias registradas.');

    return categories;
  }

  async create_category(data: createCatDto) {
    const normalise = data.name.toLowerCase().trim();

    data.name = normalise;

    const existeCategoria = await this.prisma.category.findFirst({
      where: { name: data.name },
    });

    if (existeCategoria)
      throw new ConflictException(
        `Categoria ${existeCategoria.name} ya existe`,
      );

    return this.prisma.category.create({
      data,
    });
  }

  update_category(id: number, data: updateCatDto) {
    return this.prisma.category.update({
      where: { id },
      data: data,
    });
  }

  deleteCategory_fromDb(id) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
