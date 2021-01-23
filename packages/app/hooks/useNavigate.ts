import { useNavigation } from '@react-navigation/native'

export function useNavigate() {
  const {navigate} = useNavigation()

  const navigateToPostId = (id: string) => {
    navigate('Shared', {screen: 'PostScreen', params: {id}})
  }

  const navigateToProfile = (queryUserName: string) => {
    navigate('Shared', {screen: 'ProfileScreen', params: {queryUserName}})
  }

  const navigateToChat = (id: string, name: string, message: string, url: string) => {
    navigate('Direct', {screen: 'TabChatScreen', params: {id, name, message, url}})
  }

  return {
    navigateToPostId,
    navigateToProfile,
    navigateToChat
  }
}
