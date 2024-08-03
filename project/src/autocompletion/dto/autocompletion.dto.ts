import { IsString } from "class-validator";

export class AutocompletionDto {
  @IsString()
  query: string
}