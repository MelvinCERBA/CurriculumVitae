import { Module } from '@nestjs/common';
import { AutocompletionService } from './autocompletion.service';
import { AutocompletionController } from './autocompletion.controller';
import { TagModule } from '../tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../tag/entities/tag.entity';

@Module({
  providers: [AutocompletionService],
  controllers: [AutocompletionController],
  imports: [TagModule],
})
export class AutocompletionModule { }
