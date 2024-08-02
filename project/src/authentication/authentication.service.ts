import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import EnvironmentVariables from 'config/env';
import { compare } from 'bcrypt';
import { LogInDto } from './dto/LogInDto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async logIn({ email, password }: LogInDto): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException(`No user with email ${email}.`);
    }
    if (!(user?.passwordHash) || !(await compare(password, user.passwordHash))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
