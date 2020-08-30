import DataLoader from 'dataloader'
import { Likes } from '../entity/Likes'


export const createLikeLoader = () => new DataLoader<{ photoId: string, userId: string }, Likes | null>(async (keys) => {
  const likes = await Likes.findByIds(keys as any)

  const likeIdsToLike: Record<string, Likes> = {}

  likes.forEach(like => {
    likeIdsToLike[`${ like.userId }|${ like.photoId }`] = like
  })


  return keys.map(key => likeIdsToLike[`${ key.userId }|${ key.photoId }`])
})
