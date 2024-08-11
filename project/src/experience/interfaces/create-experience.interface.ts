import { ICreateTagData } from "../../tag/interfaces/create-tag-data.interface"

export interface ICreateExperienceData {
  userId: number
  pictureUrl?: string
  title: string
  description: string
  link: string
  tags: ICreateTagData[]
}