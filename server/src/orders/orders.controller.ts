import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service.js';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getAllOrders() {
    return this.ordersService.getOrders_fromDb();
  }

  @Get(':id')
  getOrdersByUser(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOrders_byUser(id);
  }

  @Post()
  createOrder(@Body() order) {
    return this.ordersService.create_order(order);
  }
}
