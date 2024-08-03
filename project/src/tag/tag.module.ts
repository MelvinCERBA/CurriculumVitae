import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagCategoryService } from './tag-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagCategory } from './entities/tag-category.entity';
import { Tag } from './entities/tag.entity';

@Module({
  controllers: [TagController],
  imports: [TypeOrmModule.forFeature([Tag, TagCategory])],
  providers: [TagService, TagCategoryService],
  exports: [TagService]
})
export class TagModule { }
