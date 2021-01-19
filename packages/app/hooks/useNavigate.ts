import { useNavigation } from '@react-navigation/native'

export function useNavigate() {
  const {navigate} = useNavigation()

  const navigateToPostId = (id: string) => {
    navigate('Shared', {screen: 'PostScreen', params: {id}})
  }

  const navigateToProfile = (queryUserName: string) => {
    navigate('Shared', {screen: 'ProfileScreen', params: {queryUserName}})
  }

  return {
    navigateToPostId,
    navigateToProfile
  }
}
