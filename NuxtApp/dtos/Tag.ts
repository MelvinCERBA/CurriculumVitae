export interface TagCategoryResponseDto {
  id: number
  name: string
  tags: TagResponseDto[]
}

export interface TagResponseDto {
  id: number
  name: string
}