import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UserModule } from './user/user.module.js';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module.js';
import { CategoryModule } from './category/category.module.js';
import { OrdersModule } from './orders/orders.module.js';

import { ItemsModule } from './items/items.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    ProductsModule,
    CategoryModule,
    OrdersModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
