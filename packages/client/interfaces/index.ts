export interface IUserMe {
  email: string
  id: string
  username: string
  pictureUrl: string | null
  fullName: string
}

export interface IUserInfo extends IUserMe {
  followerCount: number
  followingCount: number
  photoCount: number
  isFollowing: boolean
  isFollowed: boolean
  isCurrentUser: boolean
}
