import { ExperienceResponseDto } from "../../experience/dto/get-experiences.dto"
import { User } from "../entities/user.entity"

export class UserResponseDto {
  id: number
  firstName: string
  lastName: string
  email: string
  description: string
  experiences?: ExperienceResponseDto[]

  static fromEntity(entity: User): UserResponseDto {
    return {
      ...entity,
      experiences: entity.experiences?.map(experience => ExperienceResponseDto.fromEntity(experience))
    }
  }
}