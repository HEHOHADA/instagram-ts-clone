import React from 'react'
import {
  ActivityIndicator,
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import {
  NAVIGATION_BAR_PADDING_V,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT
} from '@constants/demens'
import { useReceivedMessage } from '@hooks/useRecieveMessage'
import { ChatDocument, IChatQuery } from '@instagram/common'
import { useQuery } from '@apollo/client'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TabDirectParamList } from '@type/navigation'
import { View } from '@components/Themed'
import { MessageItem } from '@components/direct/MessageItem'
import { ConversationInput } from '@components/direct/ConversationInput'


export default function ChatScreen() {
  const {params} = useRoute<RouteProp<TabDirectParamList, 'TabChatScreen'>>()
  useReceivedMessage()
  const {data, loading} = useQuery<IChatQuery>(ChatDocument, {
    variables: {
      id: params.id
    }
  })
  return (
    <SafeAreaView style={ styles.container }>
      <View style={ styles.container }>
        <KeyboardAvoidingView
          behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
          style={ styles.messagesContainer }>
          { loading || !data?.chat.id ? <ActivityIndicator/> :
            <Animated.View style={ {
              ...styles.inboxContainer,
              height: '100%',
              transform: [{
                translateY: Animated.multiply(-1, Animated.subtract(new Animated.Value(0),
                  Animated.multiply(64, Animated.divide(new Animated.Value(0), SCREEN_WIDTH + 44))))
              }]
            } }>
              <FlatList
                showsVerticalScrollIndicator={ false }
                style={ {
                  height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 88 - 30,
                } }
                scrollsToTop={ false }
                data={ data?.chat.messages }
                renderItem={ ({item}) =>
                  <MessageItem  { ...item }/>
                }
                keyExtractor={ ({id}) => id }
              />
              <ConversationInput id={ data?.chat.id }/>
            </Animated.View> }
        </KeyboardAvoidingView>
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
  btnNavigation: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  targetUserAvatar: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderColor: '#333',
    borderWidth: 0.3
  },
  messagesContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 44,
    paddingBottom: 20
  },
  inboxContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    bottom: 20,
    left: 0
  },
})
