import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByName(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(loginInput: LoginUserInput) {
    const user = await this.validateUser(
      loginInput.username,
      loginInput.password,
    );
    if (!user) {
      return null;
    }
    const payload = { username: user.username, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
