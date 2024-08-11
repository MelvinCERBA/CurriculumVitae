import { Module, Query } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './datasource';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { ExperienceModule } from './experience/experience.module';
import { TagModule } from './tag/tag.module';
import { AutocompletionService } from './autocompletion/autocompletion.service';
import { AutocompletionModule } from './autocompletion/autocompletion.module';
import { GraphQLModule } from '@nestjs/graphql/dist';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => dataSourceOptions }),
    ConfigModule.forRoot({
      envFilePath: ['config/.env'],
      isGlobal: true,
      cache: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
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
