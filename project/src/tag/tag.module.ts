import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagCategoryService } from './tag-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagCategory } from './entities/tag-category.entity';
import { Tag } from './entities/tag.entity';
import { TagResolver } from './graphql/tag.resolver';

@Module({
  controllers: [TagController],
  imports: [TypeOrmModule.forFeature([Tag, TagCategory])],
  providers: [TagService, TagCategoryService, TagResolver],
  exports: [TagService, TypeOrmModule]
})
export class TagModule { }
