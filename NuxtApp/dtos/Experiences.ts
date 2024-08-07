import type { ProfileResponseDto } from "./Profile"

export interface ExperienceResponseDto {
  id: number
  pictureUrl: string
  title: string
  description: string
  link: string
  tags: { id: string, name: string }[]
  user?: ProfileResponseDto
}