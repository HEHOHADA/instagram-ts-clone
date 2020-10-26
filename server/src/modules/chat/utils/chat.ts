import { Chat } from '../../../entity/Chat'
import { User } from '../../../entity/User'

export async function createChatFn(meId: string, userId: string) {
  const chat = await Chat.create({date: new Date()}).save()

  const users = await User.find({
    where: [{id: meId}, {id: userId}],
    relations: ['chats']
  })

  users.forEach((user) => {
    user.chats ? user.chats.push(chat) : (user.chats = [chat])
    user.save()
  })

  chat.users = users

  return chat
}
