import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, Query } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { ExperienceResponseDto, GetExperiencesDto } from './dto/get-experiences.dto';
import { PaginatedResponse } from '../common/pagination/paginated-response.abstract';
import { paginateResponse } from '../common/utils/pagination.utils';
import { Public } from '../authentication/public.guard';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) { }



  @Post()
  async create(@Req() req, @Body() createExperienceDto: CreateExperienceDto): Promise<ExperienceResponseDto> {
    if (req.user.sub !== createExperienceDto.userId) {
      throw new UnauthorizedException("You are not authorized to create experiences for others");
    }
    return ExperienceResponseDto.fromEntity(await this.experienceService.create(createExperienceDto));
  }

  @Post('search') @Public()
  async findAll(@Body() dto: GetExperiencesDto): Promise<PaginatedResponse<ExperienceResponseDto>> {
    const pagedExps = await this.experienceService.search(dto)
    const pagedDtos: PaginatedResponse<ExperienceResponseDto> = {
      ...pagedExps,
      data: pagedExps.data.map(experience => ExperienceResponseDto.fromEntity(experience))
    }
    return pagedDtos;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.experienceService.findOne(+id);
  // }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto): Promise<ExperienceResponseDto> {
    const { user, ...res } = await this.experienceService.update(+id, updateExperienceDto);
    return res
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceService.remove(+id);
  }
}
