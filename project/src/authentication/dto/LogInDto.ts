import { IsEmail, IsString } from 'class-validator';
import { BaseLogInData } from '../interfaces/login.interface';
export class LogInDto extends BaseLogInData {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LogInResponseDto {
  userId: number;
  token: string;
}