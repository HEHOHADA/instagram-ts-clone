import { useNavigation } from '@react-navigation/native'
import { SubscriptionType } from '@type/subscription'

export function useNavigate() {
  const {navigate} = useNavigation()

  const navigateToPostId = (id: string) => {
    navigate('Shared', {screen: 'PostScreen', params: {id}})
  }

  const navigateToProfile = (queryUserName: string) => {
    navigate('Profile', {screen: 'ProfileScreen', params: {queryUserName}})
  }

  const navigateToChat = (id: string, name: string, message: string, url: string) => {
    navigate('Direct', {screen: 'TabChatScreen', params: {id, name, message, url}})
  }

  const navigateFollower = (id: string, type: SubscriptionType) => {
    navigate('FollowScreen', {params: {type, userId: id}})
  }

  return {
    navigateToPostId,
    navigateToProfile,
    navigateToChat,
    navigateFollower
  }
}
