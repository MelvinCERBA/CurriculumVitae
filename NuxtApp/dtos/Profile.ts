import type { ExperienceResponseDto } from "./Experiences"
import type { TagResponseDto } from "./Tag"

export interface ProfileResponseDto {
  id: number
  email: string
  firstName: string
  lastName: string
  description: string | null
  pictureUrl: string
  tags: string[]
  experiences?: ExperienceResponseDto[]
}