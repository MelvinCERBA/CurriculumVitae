import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag/entities/tag.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class AutocompletionService {

  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) { }


  async autocompletion(query: string): Promise<Tag[]> {
    return this.tagRepository.find({ where: { name: Like(`%${query}%`) }, order: { priority: 'DESC' }, take: 5 });
  }
}
