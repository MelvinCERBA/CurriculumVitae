import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagResponseDto } from './dto/tag-response.dto';
import { CreateTagCategoryDto } from './dto/create-tag-category.dto';
import { TagCategoryResponseDto } from './dto/tag-category-response.dto';
import { TagCategoryService } from './tag-category.service';
import { addAliasesToTagDto } from './dto/add-aliases-to-tag.dto';

@Controller('tag')
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly tagCategoryService: TagCategoryService
  ) { }

  @Post()
  async createTag(@Body() dto: CreateTagDto): Promise<TagResponseDto> {
    return TagResponseDto.fromEntity(await this.tagService.create(dto));
  }

  @Post('aliases')
  async addTagAliases(@Body() dto: addAliasesToTagDto): Promise<TagResponseDto> {
    return TagResponseDto.fromEntity(await this.tagService.addAliasesToTag(dto));
  }

  @Post('category')
  async createTagCategory(@Body() dto: CreateTagCategoryDto): Promise<TagCategoryResponseDto> {
    return this.tagCategoryService.create(dto);
  }

  @Get('category')
  async getCategories(): Promise<TagCategoryResponseDto[]> {
    const categories = await this.tagCategoryService.findAll();
    return categories.map(c => TagCategoryResponseDto.fromEntity(c));
  }

  // @Get()
  // findAll() {
  //   return this.tagService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tagService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
  //   return this.tagService.update(+id, updateTagDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tagService.remove(+id);
  // }
}
