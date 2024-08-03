import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { TagModule } from '../tag/tag.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [ExperienceController],
  imports: [UserModule, TypeOrmModule.forFeature([Experience]), TagModule, AuthenticationModule],
  providers: [ExperienceService],
})
export class ExperienceModule { }
