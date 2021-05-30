import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { SCREEN_WIDTH } from '@constants/demens'
import { AppImage } from '@components/ui/AppImage'
import { Animated } from 'react-native'
import { IChatQuery, IUser } from '@instagram/common'
import { Text } from '@components/Themed'
import { DEFAULT_IMAGE } from '@constants/default'


type PropsType = {
  isAuthor: boolean
  readTime: string | null
  text: string
  user: NonNullable<Pick<IUser, 'pictureUrl' | 'username'>>
}

export const MessageItem: FC<PropsType> = ({ isAuthor, text, readTime, user }) => {
  return (
    <TouchableOpacity
      delayLongPress={ 200 }
      activeOpacity={ 1 }
      style={ {
        ...styles.messageItem,
        justifyContent: isAuthor ? 'flex-end' : 'flex-start'
      } }>
      { !isAuthor &&
      <AppImage
        style={ styles.yourAvatar }
        uri={ user.pictureUrl || DEFAULT_IMAGE }
      />
      }
      <Animated.View
        style={ [styles.message, isAuthor
          ? styles.myMessage : styles.yourMessage, styles.textMessage, {
          alignItems: isAuthor ? 'flex-end' : 'flex-start'
        }] }>
        <Text
          style={ styles.msgText }
        >{ text }</Text>
      </Animated.View>
      {
        readTime ?
          <View style={ styles.seenLabel }>
            <Text style={ {
              fontSize: 12,
              color: '#666'
            } }>Seen</Text>
          </View> : null
      }

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  messageItem: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end'
  },
  message: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    maxWidth: SCREEN_WIDTH * 0.6
  },
  textMessage: {
    paddingHorizontal: 15
  },
  myMessage: {
    backgroundColor: '#ddd',
    marginHorizontal: 15
  },
  yourAvatar: {
    marginLeft: 15,
    marginRight: 10,
    height: 40,
    width: 40,
    borderRadius: 40
  },
  yourMessage: {},
  msgText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  seenLabel: {
    zIndex: 1,
    position: 'absolute',
    width: 50,
    bottom: 0,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
