import { IUserMe } from './index'

export interface IComment {
  date: Date
  userId: string
  user: IUserMe
  isAuthor: boolean
  photoId: string
  commentText: string
  id: string
}
