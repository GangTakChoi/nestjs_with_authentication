import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async generatePasswordHash(password): Promise<string> {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = bcrypt.hash(password, salt);

    return hash;
  }

  getUserAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  getOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  getOneByAccountId(accountId: string): Promise<User> {
    return this.userRepository.findOneBy({ accountId });
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.generatePasswordHash(
      createUserDto.password,
    );
    return this.userRepository.save(createUserDto);
  }
}
