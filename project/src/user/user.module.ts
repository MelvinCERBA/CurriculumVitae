import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UserResolver } from "./graphql/user.resolver";
import { ExperienceModule } from '../experience/experience.module';
import { TagModule } from '../tag/tag.module';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthenticationModule), forwardRef(() => ExperienceModule), forwardRef(() => TagModule)],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule { } 1
