import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthenticationModule)],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
