import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import EnvironmentVariables from 'config/env';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { BaseLogInData } from './interfaces/login.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async logIn({ email, password }: BaseLogInData): Promise<{ userId: number, token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`No user with email ${email}.`);
    }
    if (!(user?.passwordHash) || !(await compare(password, user.passwordHash))) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return {
      userId: user.id,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
