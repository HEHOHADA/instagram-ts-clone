import React from 'react'
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { MessageItem } from 'components/direct/MessageItem'
import { AppLoader } from 'components/ui/AppLoader'
import { useReceivedMessage } from 'hooks/useRecieveMessage'
import {
  navigationBarPaddingV,
  screenHeight,
  screenWidth,
  statusBarHeight
} from 'constants/demens'
import { TabDirectParamList } from 'types/navigation'
import { ConversationInput } from 'components/direct/ConversationInput'
import { useChatQuery } from 'geterated'
import { View } from 'components/Themed'


export default function ChatScreen() {
  const {params} = useRoute<RouteProp<TabDirectParamList, 'TabChatScreen'>>()
  useReceivedMessage()
  const {data, loading} =useChatQuery({
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
          { loading || !data?.chat.id ? <AppLoader/> :
            <Animated.View style={ {
              ...styles.inboxContainer,
              height: '100%',
              transform: [{
                translateY: Animated.multiply(-1, Animated.subtract(new Animated.Value(0),
                  Animated.multiply(64, Animated.divide(new Animated.Value(0), screenWidth + 44))))
              }]
            } }>
              <FlatList
                showsVerticalScrollIndicator={ false }
                style={ {
                  height: screenHeight - statusBarHeight - 88 - 30,
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
    paddingVertical: navigationBarPaddingV,
    color: 'white',
    backgroundColor: '#fff',
    height: screenHeight,
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
    height: screenHeight - statusBarHeight - 44,
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
