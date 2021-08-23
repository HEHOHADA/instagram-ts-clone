import React, { FC, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { screenWidth } from 'constants/demens'
import { InputIcon } from 'components/shared/InputIcon'
import { Text } from 'components/Themed'
import { useCreateMessageMutation } from 'geterated'

export const ConversationInput: FC<{ id: string }> = ({ id }) => {

  const [createMessage, { loading }] = useCreateMessageMutation()
  const [text, setText] = useState('')

  return (
    <View style={ styles.msgInputWrapper }>
      <InputIcon
        value={ text }
        onChangeText={ setText }
        iconName={ 'camera-outline' }
        iconStyle={ styles.btnCamera } inputProps={ {
        multiple: true, style: {
          ...styles.msgInput,
          width: screenWidth - 30 - 44 - 60
        },
        placeholder: 'Message...'
      } } />
      <TouchableOpacity
        disabled={ loading }
        onPress={ async () => {
          createMessage({ variables: { chatId: id, text } }).then(res => {
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
    </View>
  )
}

const styles = StyleSheet.create({
  msgInputWrapper: {
    marginTop: 10,
    width: screenWidth - 30,
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
    width: 60
  }
})
