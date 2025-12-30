import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
    constructor(private users : UserService){}

    @Get()
    getUsers(){
        return this.users.findUsers()
    }
}
