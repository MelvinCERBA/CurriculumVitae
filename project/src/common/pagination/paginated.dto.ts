import { IsInt, IsOptional, Max, Min } from "class-validator"

export abstract class BasePaginationRequest {
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10

  @IsInt()
  @Min(1)
  page: number = 1
}