import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LogInDto, LogInResponseDto } from './dto/LogInDto';
import { AuthenticationService } from './authentication.service';
import { Public } from './public.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async logIn(@Body() signInDto: LogInDto): Promise<LogInResponseDto> {
    return this.authService.logIn(signInDto);
  }
}
