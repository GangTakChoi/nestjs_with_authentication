import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  getUserAll(): User[] {
    return [];
  }

  getOne(): User {
    return new User();
  }

  create() {
    return '';
  }
}
