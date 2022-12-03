import { Controller, Get, Post } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): User[] {
    return this.userService.getUserAll();
  }

  @Get('/:id')
  getOne(): User {
    return this.userService.getOne();
  }

  @Post()
  createUser() {
    return '';
  }
}
