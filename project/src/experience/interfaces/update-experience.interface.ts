import { ICreateTagData } from "../../tag/interfaces/create-tag-data.interface"

export interface IUpdateExperienceData {
  pictureUrl?: string
  title?: string
  description?: string
  link?: string
  tagNames?: ICreateTagData[]
}
