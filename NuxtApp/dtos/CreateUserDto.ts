export interface CreateUserDto {
  firstName: string,
  lastName: string,
  pictureUrl: string | null,
  description: string | null,
  email: string,
  password: string
}