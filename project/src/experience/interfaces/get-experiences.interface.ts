import { BasePaginationRequest } from "../../common/pagination/paginated.dto"
import { Experience } from "../entities/experience.entity"

export abstract class BaseGetExperiencesData extends BasePaginationRequest {
  userId?: number
  tagNames?: string[]
}