import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(accountId: string, pass: string): Promise<any> {
    const user = await this.userService.getOneIncludedPassword(accountId);

    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) return null;

    const { password, ...result } = user;

    return result;
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      nickname: user.nickname,
      accountId: user.accountId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
