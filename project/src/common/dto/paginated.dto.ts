import { IsInt, Max, Min } from "class-validator"

export abstract class PaginatedDto {
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number

  @IsInt()
  @Min(1)
  page: number
}