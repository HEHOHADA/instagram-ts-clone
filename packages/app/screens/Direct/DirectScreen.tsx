import React, { useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { NAVIGATION_BAR_PADDING_V, SCREEN_HEIGHT, SCREEN_WIDTH } from '@constants/demens'
import { View } from '@components/Themed'
import { ChatItem } from '@components/direct/ChatItem'
import { useQuery } from '@apollo/client'
import { ChatsDocument, IChatsQuery } from '@instagram/common'
import { useNavigate } from '@hooks/useNavigate'
import { InputIcon } from '@components/shared/InputIcon'


export default function DirectScreen() {
  const [search, setSearch] = useState('')
  const {data} = useQuery<IChatsQuery>(ChatsDocument)
  const {navigateToChat} = useNavigate()
  return (
    <SafeAreaView style={ styles.container }>
      <View style={ styles.inputWrapper }>
        <View style={ styles.inputContainer }>
          <InputIcon
            inputProps={ {style: styles.input} }
            iconStyle={ styles.searchIcon } value={ search } iconName={ 'search' }
            onChangeText={ setSearch }/>
        </View>
      </View>

      <View style={ styles.chat }>
        <FlatList keyExtractor={ post => post.id?.toString() || '' }
                  data={ data?.chats }
                  renderItem={ ({item}) => {
                    return (
                      <ChatItem
                        goToChat={ navigateToChat }
                        { ...item }/>
                    )
                  } }/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: NAVIGATION_BAR_PADDING_V,
    color: 'white',
    backgroundColor: '#fff',
    height: SCREEN_HEIGHT,
  },
  inputWrapper: {
    padding: 5,
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dedede',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
  },
  inputContainer: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10
  },
  input: {
    width: SCREEN_WIDTH * 0.7,
    height: '100%',
    paddingHorizontal: 15
  },
  chat: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10
  },
})
