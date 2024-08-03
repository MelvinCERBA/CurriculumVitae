import { TagCategory } from "../entities/tag-category.entity"
import { TagResponseDto } from "./tag-response.dto"

export class TagCategoryResponseDto {
  id: number
  name: string
  priority: number
  tags: TagResponseDto[]

  static fromEntity(entity: TagCategory): TagCategoryResponseDto {
    return {
      id: entity.id,
      tags: entity.tags ? entity.tags.map(tag => TagResponseDto.fromEntity(tag)) : [],
      name: entity.name,
      priority: entity.priority
    }
  }
}