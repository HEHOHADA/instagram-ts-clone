import { SubscriptionType } from './subscription'

export type RootStackParamList = {
  Root: undefined
  Auth: undefined
  NotFound: undefined
}

export type DriverTabParamsList = {
  TabDirect: undefined
}

export type BottomTabParamList = {
  TabHome: undefined
  TabSearch: undefined
  TabAdd: undefined
  TabNews: undefined
  TabProfile: { queryUserName: string }
}

export type TabSearchParamList = {
  TabSearchScreen: undefined
}

export type TabAddParamList = {
  TabAddScreen: undefined
}


export type TabProfileParams = {
  ProfileScreen: { queryUserName: string }
  FollowScreen: { id: string, type: SubscriptionType }
}

export type TabPostParamList = {
  TabPostScreen: { id: string }
}

export type TabNewsParamList = {
  TabNewsScreen: undefined
}

export type TabHomeParamList = {
  TabHomeScreen: undefined
}

export type TabTwoParamList = {
  TabTwoScreen: undefined
}

export type TabDirectParamList = {
  TabDirectScreen: undefined
  TabChatScreen: { id: string, url: string, name: string, message?: string }
}

export type AuthParamList = {
  TabLogin: undefined
  TabRegister: undefined
  TabChangePassword: undefined
  TabForgotPassword: undefined
}

export type SharedTabParamList = {
  PostScreen: { id: string }
  Profile: { queryUserName: string }
}
