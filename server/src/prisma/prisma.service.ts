import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    try {
      const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL as string,
      });
      super({ adapter });
      console.log(process.env.DATABASE_URL);
    } catch (error) {
      console.log(error);
    }
  }
}
