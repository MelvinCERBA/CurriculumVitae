import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateExperienceDto } from '../../experience/dto/create-experience.dto';
import { ICreateUserData } from '../interfaces/create-user-data.interface';

export class CreateUserDto implements ICreateUserData {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  pictureUrl?: string | null;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

}
