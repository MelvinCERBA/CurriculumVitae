import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagCategoryDto } from './dto/create-tag-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagCategory } from './entities/tag-category.entity';
import { TagService } from './tag.service';

@Injectable()
export class TagCategoryService {


  constructor(
    @InjectRepository(TagCategory)
    private readonly tagCategoryRepository: Repository<TagCategory>,

    @Inject(forwardRef(() => TagService))
    private readonly tagService: TagService
  ) { }

  async create(createTagCategoryDto: CreateTagCategoryDto) {
    const tags = await Promise.all(
      createTagCategoryDto.aliases.map(async name => {
        const tag = await this.tagService.findByName(name);
        if (!tag) {
          throw new NotFoundException(`Tag with name ${name} not found : category ${createTagCategoryDto.name} could not be created`);
        }
        return tag;
      })
    );

    return this.tagCategoryRepository.save({
      name: createTagCategoryDto.name,
      tags: tags
    });
  }

  async addTagsToCategory(tagNames: string[], categoryName: string) {
    if (!tagNames) {
      throw new BadRequestException("Cannot supply and empty list of tags. Either provide non-empty list of or remove the 'tags' key.");
    }
    const tags = await Promise.all(tagNames.map(async (name) => {
      return this.tagService.getOrCreate({ name });
    }))

    const category = await this.tagCategoryRepository.findOne({ where: { name: categoryName } });
    if (!category) {
      throw new NotFoundException(`Tag category with name ${categoryName} not found : tags ${tagNames} could not be updated`);
    }

    category.tags = [...category.tags, ...tags];
    return this.tagCategoryRepository.save(category);
  }

  findByName(category: string) {
    return this.tagCategoryRepository.findOne({ where: { name: category } });
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
