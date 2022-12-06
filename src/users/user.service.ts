import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './entities/user-role.entity';
import { Role } from 'src/auth/role/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  private async generatePasswordHash(password): Promise<string> {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = bcrypt.hash(password, salt);

    return hash;
  }

  getUserAll(findOption?: object): Promise<User[]> {
    // return this.userRepository.createQueryBuilder('user').getMany();
    return this.userRepository.find(findOption);
  }

  getOneIncludedPassword(accountId: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.account_id = :accountId', { accountId })
      .addSelect('user.password')
      .getOne();
  }

  getOne(findOption?: object): Promise<User> {
    return this.userRepository.findOneBy(findOption);
  }

  async getIsUniqueAccountId(accountId: string): Promise<boolean> {
    const user = await this.getOne({ accountId });
    if (!user) return true;
    return false;
  }

  async create(createUserDto: CreateUserDto) {
    // 아이디 중복체크
    if (!(await this.getIsUniqueAccountId(createUserDto.accountId))) {
      throw new ConflictException('중복된 아이디입니다.');
    }

    // 비밀번호 Hash 값 생성
    createUserDto.password = await this.generatePasswordHash(
      createUserDto.password,
    );

    const user = await this.userRepository.save(createUserDto);
    await this.userRoleRepository.save({ user, role: Role.User });

    return this.userRepository.findOneBy({ id: user.id });
  }

  async delete(id: number) {
    this.userRepository.delete(id);
  }
}
