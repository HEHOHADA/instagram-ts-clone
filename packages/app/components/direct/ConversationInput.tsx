import React, { FC, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { TabBarIcon } from '@ui/AppIcon'
import { SCREEN_WIDTH } from '@constants/demens'
import { Text } from '@components/Themed'
import { useMutation } from '@apollo/client'
import { CreateMessageDocument, ICreateMessageMutationVariables } from '@instagram/common'

export const ConversationInput: FC<{ id: string }> = ({id}) => {

  const [createMessage,{loading}] = useMutation<ICreateMessageMutationVariables>(CreateMessageDocument)
  const [text, setText] = useState('')

  return (
    <View style={ styles.msgInputWrapper }>
      <>
        <TouchableOpacity
          onPress={ async () => {
          } }
          activeOpacity={ 0.8 }
          style={ styles.btnCamera }>
          <TabBarIcon color={ 'black' } size={ 20 } name={ 'camera-outline' }/>
        </TouchableOpacity>
        <TextInput
          value={ text }
          onChangeText={ setText }
          multiline
          style={ {
            ...styles.msgInput,
            width: SCREEN_WIDTH - 30 - 44 - 60
          } }
          placeholder="Message..."
        />
        <TouchableOpacity
          disabled={loading}
          onPress={ async () => {
            createMessage({variables: {chatId: id, text}}).then(res => {
              res.data && setText('')
            })
          } }
          style={ styles.btnSend }>
          <Text style={ {
            fontWeight: '600',
            color: '#318bfb'
          } }>
            Send
          </Text>
        </TouchableOpacity>
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  msgInputWrapper: {
    marginTop: 10,
    width: SCREEN_WIDTH - 30,
    marginHorizontal: 15,
    minHeight: 44,
    borderRadius: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnCamera: {
    height: 34,
    width: 34,
    margin: 4,
    borderRadius: 34,
    backgroundColor: '#318bfb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  msgInput: {
    paddingHorizontal: 10,
    marginVertical: 5
  },
  btnSend: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
})
