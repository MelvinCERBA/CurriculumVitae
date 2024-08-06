import type { TagResponseDto } from "./Tag"

export interface ProfileResponseDto {
  id: number
  email: string
  firstName: string
  lastName: string
  description: string
  tags: TagResponseDto[]
}