import { IUserMe } from './index'
import { IComment } from './comment'

export interface IPhoto {
  date: Date
  userId: string
  id: string
  isAuthor:boolean
  isLiked:boolean
  pictureUrl: string
  likeCount: number
  commentCount: number
  user: IUserMe
  comments: IComment[]
}
