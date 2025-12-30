import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({

  providers: [UserService, PrismaService],
  controllers: [UserController]
})
export class UserModule {}
