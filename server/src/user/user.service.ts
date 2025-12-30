import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserService {
    constructor(private prisma : PrismaService){}

    findUsers(){
        return this.prisma.users.findMany()
    }
}
