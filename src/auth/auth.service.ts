import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const validPassword = await bcrypt.compare(password, user.password);

    if (user && validPassword) {
      const { id, name, email, created_at } = user;
      return { id, name, email, created_at };
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
