import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { TagCategoryService } from './tag-category.service';
import slugify from 'slugify';
import { addAliasesToTagDto } from './dto/add-aliases-to-tag.dto';
import { ICreateTagData } from './interfaces/create-tag-data.interface';
import { IAddAliasesToTagData } from './interfaces/add-aliases-to-tag-data.interface';

@Injectable()
export class TagService {

  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @Inject(forwardRef(() => TagCategoryService)) private readonly tagCategoryService: TagCategoryService
  ) { }

  async findByName(name: string) {
    return this.tagRepository.findOne({ where: { name } });
  }

  async findById(id: number) {
    return this.tagRepository.findOne({ where: { id } });
  }

  async create({ name, categoryName, aliases, aliasFor }: ICreateTagData) {
    let category = null;

    if (categoryName) {
      category = await this.tagCategoryService.findByName(categoryName);
      if (!category) {
        throw new NotFoundException(`Tag category with name ${categoryName} not found : tag ${name} could not be created`);
      }
    }

    let aliasedTag = null;
    if (aliasFor) {
      aliasedTag = await this.findById(aliasFor);
    }
    const tag = this.tagRepository.create({ name, category, slug: slugify(name, { lower: true }), aliasFor: aliasedTag });

    let savedTag = await this.tagRepository.save(tag);

    if (!aliases) {
      return savedTag;
    }

    const tags = await Promise.all(
      aliases.map(async (name) => {
        return this.getOrCreate({ name, aliasFor: savedTag.id });
      })
    );

    savedTag.aliases = tags;
    return this.tagRepository.save(savedTag);

  }

  async getOrCreate(createTagData: ICreateTagData): Promise<Tag> {
    let tag = await this.findByName(createTagData.name);
    if (!tag) {
      tag = await this.create(createTagData);
    }
    return tag;
  }

  async addAliasesToTag(data: IAddAliasesToTagData) {
    const tag = await this.tagRepository.findOne({ where: { name: data.name }, relations: ['aliases'] });
    if (!tag) {
      throw new NotFoundException(`Tag with name ${data.name} not found : aliases ${data.aliases} could not be appended.`);
    }

    const aliasesTags = await Promise.all(data.aliases.map(name => {
      const new_tag = this.getOrCreate({ name });
      return new_tag;
    }));

    const mergedAliases = Object.values([...tag.aliases, ...aliasesTags].reduce((acc, tag) => { acc[tag.id] = tag; return acc }, {}))

    const newTag = { ...tag, aliases: mergedAliases };

    return this.tagRepository.save(newTag);
  }

  async findAll(includeAliases = false) {
    const options = includeAliases ? {} : { where: { aliasFor: null } };
    return this.tagRepository.find(options);
  }
}
