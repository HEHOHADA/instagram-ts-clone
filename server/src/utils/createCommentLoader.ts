import DataLoader from 'dataloader'
import { Comment } from '@/entity/Comment'

export const createCommentLoader = () => new DataLoader<string, Comment>(async commentIds => {
  const comments = await Comment.findByIds(commentIds as string[])

  const commentIdsToComments: Record<string, Comment> = {}

  comments.forEach(comment => {
    commentIdsToComments[comment.id] = comment
  })


  return commentIds.map(uId => commentIdsToComments[uId])
})
