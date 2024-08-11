import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag/entities/tag.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class AutocompletionService {

  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) { }


  async autocompletion(query: string, limit: number = 5): Promise<Tag[]> {
    return this.tagRepository.find({ where: { slug: Like(`${query.toLowerCase()}%`) }, order: { priority: 'DESC' }, take: limit });
  }
}
