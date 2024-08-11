import { Controller, Post, Body, HttpException, HttpStatus, HttpCode, Param, Get, UseGuards, Req, Patch, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { DataSourceErrors } from '../error/datasourceErrors.enum';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { request } from 'express';
import { Public } from '../authentication/public.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { GetUserDto } from './dto/get-users.dto';

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

  @Get('profile/:id')
  @HttpCode(HttpStatus.OK)
  @Public()
  async getOneProfile(@Param("id") id: number) {
    const profile = await this.userService.findOneById(id, { relations: ['experiences', 'experiences.tags'] });
    return UserResponseDto.fromEntity(profile);
  }

  @Post('profile')
  @HttpCode(HttpStatus.OK)
  @Public()
  async getProfiles(@Body() { tags }: GetUserDto) {
    const users = await this.userService.findUsersByTags(tags);
    return users.map(profile => UserResponseDto.fromEntity(profile));
  }

  @Patch('profile/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticationGuard)
  async patchProfile(@Req() { user }, @Param("id") userId, @Body() dto: UpdateUserDto): Promise<UserResponseDto> {
    if (userId != user.userId) {
      throw new UnauthorizedException("Cannot modify other users.");
    }
    const profile = await this.userService.update(userId, dto);
    return UserResponseDto.fromEntity(profile);
  }
}
