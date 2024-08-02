import { Controller, Post, Body, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { DataSourceErrors } from '../error/datasourceErrors.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post() @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const { passwordHash: _, ...user } = await this.userService.create(createUserDto);
      return user;
    }
    catch (error) {
      if (error.code === DataSourceErrors.DUPLICATED_ENTRY) {
        throw new HttpException(`User with email ${createUserDto.email} already exists.`, HttpStatus.CONFLICT);
      }
      throw error;
    }
  }
}
