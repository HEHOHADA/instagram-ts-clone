import DataLoader from 'dataloader'
import { User } from '@/entity/User'

export const createUserLoader = () => new DataLoader<string, User>(async userIds => {
  const users = await User.findByIds(userIds as string[])

  const userIdToUser: Record<string, User> = {}

  users.forEach(user => {
    userIdToUser[user.id] = user
  })


  return userIds.map(uId => userIdToUser[uId])
})
