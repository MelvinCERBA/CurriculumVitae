import { forwardRef, Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { TagModule } from '../tag/tag.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UserModule } from '../user/user.module';
import { ExperienceResolver } from './graphql/experience.resolver';

@Module({
  controllers: [ExperienceController],
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Experience]), TagModule, AuthenticationModule],
  providers: [ExperienceService, ExperienceResolver],
  exports: [ExperienceService],
})
export class ExperienceModule { }
