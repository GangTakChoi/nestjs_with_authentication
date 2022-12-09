import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/role/role.enum';
import { Roles } from 'src/auth/role/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@Request() req) {
    const id = req.user.id;
    return this.userService.getOne({ id });
  }

  @Roles(Role.Admin)
  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUserAll({ relations: { roles: true } });
  }

  @Roles(Role.Admin)
  @Get(':id')
  getOne(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    return this.userService.getOne({ id });
  }

  @Public()
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post('admin')
  createAdminUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, true);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.softDelete(id);
  }
}
