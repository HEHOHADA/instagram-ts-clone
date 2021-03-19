import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { AppIcon } from '@ui/AppIcon'
import { IMessage, IUser } from '@instagram/common'
import { UserInfo } from './UserInfo'

type PropsType = {
  users: Array<Pick<IUser, 'pictureUrl' | 'username'>>
  lastMessage?: Pick<IMessage, 'text' | 'date'> | null
  id: string
  goToChat: any
}

export const ChatItem: FC<PropsType> = ({users, id, goToChat, lastMessage}) => {
  const user = users[0]
  return (
    <TouchableOpacity
      onLongPress={ () => goToChat(id, user.username, lastMessage?.text, user.pictureUrl) }
      style={ styles.dialog } activeOpacity={ 0.8 }>
      <UserInfo
        username={ user.username } text={ lastMessage?.text }
        pictureUrl={ user.pictureUrl }/>
      <TouchableOpacity>
        <AppIcon color={ 'black' } name={ 'camera-outline' }/>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  dialog: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

})
