import { Module } from '@nestjs/common';
import { AutocompletionService } from './autocompletion.service';
import { AutocompletionController } from './autocompletion.controller';
import { TagModule } from '../tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../tag/entities/tag.entity';
import { AutocompletionResolver } from './graphql/autocompletion.resolver';

@Module({
  providers: [AutocompletionService, AutocompletionResolver],
  controllers: [AutocompletionController],
  imports: [TagModule],
})
export class AutocompletionModule { }
