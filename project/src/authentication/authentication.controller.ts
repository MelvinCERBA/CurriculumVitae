import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LogInDto } from './dto/LogInDto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() signInDto: LogInDto) {
    return this.authService.logIn(signInDto);
  }
}
