import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ItemsService {
  constructor(private Prisma: PrismaService) {}

  getAll_items() {
    return this.Prisma.orderItems.findMany();
  }
}
