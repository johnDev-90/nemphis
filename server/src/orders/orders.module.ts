import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  providers: [OrdersService, PrismaService],
  controllers: [OrdersController],
})
export class OrdersModule {}
