import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class OrdersService {
  constructor(private Prisma: PrismaService) {}

  getOrders_fromDb() {
    const orders = this.Prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return orders;
  }

  getOrders_byUser(id) {
    return this.Prisma.order.findMany({
      where: { userId: id },
    });
  }

  async create_order(order) {
    return this.Prisma.$transaction(async (tx) => {
      const { email, name, phone } = order.customer;

      let user = await tx.users.findUnique({ where: { email } });

      if (!user) {
        user = await tx.users.create({
          data: { email, name, phone_number: phone, is_guest: true },
        });
      }

      const newOrder = await tx.order.create({
        data: { userId: user.id, total: 0 },
      });

      let total = 0;

      for (const item of order.items) {
        const product = await tx.products.findUnique({
          where: { id: item.productId },
        });

        if (!product) throw new NotFoundException('Producto no existe');
        if (product.stock < item.quantity)
          throw new NotFoundException('Stock insuficiente');

        const subtotal = Number(product.price) * item.quantity;
        total += subtotal;

        await tx.orderItems.create({
          data: {
            orderId: newOrder.id,
            productId: product.id,
            quantity: item.quantity,
          },
        });

        await tx.products.update({
          where: { id: product.id },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }

      await tx.order.update({
        where: { id: newOrder.id },
        data: { total },
      });

      return newOrder;
    });
  }
}
