import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, Query } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { GetExperiencesDto, GetExperiencesResponseDto } from './dto/get-experiences.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) { }

  @Post() @UseGuards(AuthenticationGuard)
  create(@Req() req, @Body() createExperienceDto: CreateExperienceDto) {
    if (req.user.sub !== createExperienceDto.userId) {
      throw new UnauthorizedException("You are not authorized to create experiences for others");
    }
    return this.experienceService.create(createExperienceDto);
  }

  @Get()
  findAll(@Query() params: GetExperiencesDto): GetExperiencesResponseDto {
    return {
      data: [],
      total: 0,
      current_page: 1,
      limit: 10
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.experienceService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto) {
    return this.experienceService.update(+id, updateExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceService.remove(+id);
  }
}
