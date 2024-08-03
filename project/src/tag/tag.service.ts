import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { TagCategoryService } from './tag-category.service';

@Injectable()
export class TagService {

  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @Inject(forwardRef(() => TagCategoryService)) private readonly tagCategoryService: TagCategoryService
  ) { }

  async findByName(name: string) {
    return this.tagRepository.findOne({ where: { name } });
  }

  async create({ name, categoryName }: CreateTagDto) {
    let category = null;

    if (categoryName) {
      category = await this.tagCategoryService.findByName(categoryName);
      if (!category) {
        throw new NotFoundException(`Tag category with name ${categoryName} not found : tag ${name} could not be created`);
      }
    }
    const tag = this.tagRepository.create({ name, category });
    return this.tagRepository.save(tag);
  }

  async getOrCreate(createTagDto: CreateTagDto): Promise<Tag> {
    let tag = await this.findByName(createTagDto.name);
    if (!tag) {
      tag = await this.create(createTagDto);
    }
    return tag;
  }

  // findAll() {
  //   return `This action returns all tag`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} tag`;
  // }

  // update(id: number, updateTagDto: UpdateTagDto) {
  //   return `This action updates a #${id} tag`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} tag`;
  // }
}
