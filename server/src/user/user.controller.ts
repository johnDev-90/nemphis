import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
  constructor(private users: UserService) {}

  @Get()
  getUsers() {
    return this.users.findUsers();
  }

  @Post()
  CreateUsers(@Body() data) {
    return this.users.create_user(data);
  }
}
