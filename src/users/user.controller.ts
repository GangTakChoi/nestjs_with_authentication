import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
// import { Public } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUserAll({ relations: { roles: true } });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(
    @Param('id', ParseIntPipe)
    id: number,
    @Request() req,
  ): Promise<User> {
    console.log(req.user);
    return this.userService.getOne({ id });
  }

  @Get('account-id/:id')
  getOneByAccountId(@Param('id') accountId: string) {
    return this.userService.getOne({ accountId });
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.softDelete(id);
  }
}
