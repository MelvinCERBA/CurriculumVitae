import { Experience } from './experience/entities/experience.entity';
import { Tag } from './tag/entities/tag.entity';
import { TagAlias } from './tag/entities/tagAlias.entity';
import { User } from './user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  name: 'my_datasource', // used to identify the datasource
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'local',
  database: 'curriculum',

  // entities: ['dist/**/*.entity.js'],
  entities: [User, Experience, Tag, TagAlias],

  migrations: ['dist/data/migrations/*.js'],
  synchronize: true, // autosync schéma de BDD -> PAS EN PROD
};

// used by type orm to run migrations
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
