import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './datasource';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { ExperienceModule } from './experience/experience.module';
import { TagModule } from './tag/tag.module';
import { AutocompletionService } from './autocompletion/autocompletion.service';
import { AutocompletionModule } from './autocompletion/autocompletion.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => dataSourceOptions }),
    ConfigModule.forRoot({
      envFilePath: ['config/.env'],
      isGlobal: true,
      cache: true,
    }),
    UserModule,
    AuthenticationModule,
    ExperienceModule,
    TagModule,
    AutocompletionModule,
  ],
  providers: [AutocompletionService],
})
export class AppModule { }
