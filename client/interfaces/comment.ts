import { IUserMe } from './index'

export interface IComment {
  date: Date
  userId: string
  user: IUserMe
  photoId: string
  commentText: string
  id: string
}
