import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): Promise<User[]> {
    return this.userService.getUserAll();
  }

  @Public()
  @Get(':id')
  getOne(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    return this.userService.getOne(id);
  }

  @Get('account-id/:id')
  getOneByAccountId(@Param('id') accountId: string) {
    return this.userService.getOneByAccountId(accountId);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
