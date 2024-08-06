import { ExperienceResponseDto } from "../../experience/dto/get-experiences.dto"
import { User } from "../entities/user.entity"

export class UserResponseDto {
  id: number
  firstName: string
  lastName: string
  email: string
  description: string
  experiences?: ExperienceResponseDto[]
  tags: string[]

  static fromEntity(entity: User): UserResponseDto {
    const { passwordHash, ...dto } = entity
    const dict_hasTag = entity.experiences?.reduce(
      (acc, experience) => {
        const exp = ExperienceResponseDto.fromEntity(experience)
        exp.tags?.forEach(tag => acc[tag.name] = true)
        return acc
      },
      {}
    )

    return {
      ...dto,
      tags: dict_hasTag ? Object.keys(dict_hasTag) : [],
      experiences: entity.experiences?.map(experience => ExperienceResponseDto.fromEntity(experience))
    }
  }
}