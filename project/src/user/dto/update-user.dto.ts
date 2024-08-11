import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IUpdateUserData } from '../interfaces/update-user-data.interface';

export class UpdateUserDto implements IUpdateUserData {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  pictureUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
