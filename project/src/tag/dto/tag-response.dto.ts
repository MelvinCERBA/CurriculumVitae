import { Tag } from "../entities/tag.entity"
import { TagCategoryResponseDto } from "./tag-category-response.dto"

export class TagResponseDto {
  id: number
  name: string
  category: TagCategoryResponseDto | undefined
  aliases: TagResponseDto[] | undefined

  static fromEntity(entity: Tag): TagResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      category: entity.category ? TagCategoryResponseDto.fromEntity(entity.category) : undefined,
      aliases: entity.aliases ? entity.aliases.map(tag => TagResponseDto.fromEntity(tag)) : undefined
    }
  }
}