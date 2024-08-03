import { IsArray, IsString } from 'class-validator';
import { CreateTagDto } from './create-tag.dto';

export class addAliasesToTagDto {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  aliases?: string[];
}
