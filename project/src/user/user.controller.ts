import { Controller, Post, Body, HttpException, HttpStatus, HttpCode, Param, Get, UseGuards, Req, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { DataSourceErrors } from '../error/datasourceErrors.enum';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { request } from 'express';
import { Public } from '../authentication/public.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post() @Public() @HttpCode(HttpStatus.CREATED)
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

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticationGuard)
  async getProfile(@Req() { user }) {
    const profile = await this.userService.findOneByEmail(user.email);
    return UserResponseDto.fromEntity(profile);
  }

  @Patch('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticationGuard)
  async patchProfile(@Req() { user }, @Body() dto: UpdateUserDto): Promise<UserResponseDto> {
    const profile = await this.userService.update(user.sub, dto);
    return UserResponseDto.fromEntity(profile);
  }
}
