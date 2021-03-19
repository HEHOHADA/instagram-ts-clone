import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type IQuery = {
  __typename?: 'Query';
  chat: IChat;
  chats: Array<IChat>;
  getFollowers: Array<IUser>;
  getFollowings: Array<IUser>;
  feed: IPaginatedPhotos;
  viewUserPhoto: Array<IPhoto>;
  viewPhotoById: IPhoto;
  search: IPaginatedUsersSearch;
  getUserInfo: IUser;
  me: Maybe<IUser>;
  refreshToken: IRefreshResponseType;
};


export type IQueryChatArgs = {
  id: Scalars['String'];
};


export type IQueryGetFollowersArgs = {
  userId: Scalars['String'];
};


export type IQueryGetFollowingsArgs = {
  userId: Scalars['String'];
};


export type IQueryFeedArgs = {
  cursor: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type IQueryViewUserPhotoArgs = {
  username: Scalars['String'];
};


export type IQueryViewPhotoByIdArgs = {
  id: Scalars['String'];
};


export type IQuerySearchArgs = {
  cursor: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  subString: Scalars['String'];
};


export type IQueryGetUserInfoArgs = {
  username: Scalars['String'];
};

export type IChat = {
  __typename?: 'Chat';
  id: Scalars['ID'];
  date: Scalars['String'];
  messages: Array<IMessage>;
  lastMessage: Maybe<IMessage>;
  unread: Scalars['Boolean'];
  users: Array<IUser>;
};

export type IMessage = {
  __typename?: 'Message';
  id: Scalars['ID'];
  text: Scalars['String'];
  isAuthor: Scalars['Boolean'];
  chatId: Scalars['String'];
  readTime: Maybe<Scalars['DateTime']>;
  date: Scalars['String'];
  chat: IChat;
  user: IUser;
};


export type IUser = {
  __typename?: 'User';
  id: Scalars['ID'];
  fullName: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  pictureUrl: Maybe<Scalars['String']>;
  followerCount:Scalars['Float'];
  followingCount: Scalars['Float'];
  photoCount: Scalars['Float'];
  chats: IChat;
  isFollowed: Scalars['Boolean'];
  isFollowing: Scalars['Boolean'];
  isCurrentUser: Scalars['Boolean'];
};

export type IPaginatedPhotos = {
  __typename?: 'PaginatedPhotos';
  items: Array<IPhoto>;
  paginationInfo: IPaginatedPhotoResponse;
};

export type IPhoto = {
  __typename?: 'Photo';
  id: Scalars['ID'];
  date: Scalars['String'];
  pictureUrl: Scalars['String'];
  postText: Scalars['String'];
  userId: Scalars['String'];
  user: IUser;
  likeCount: Maybe<Scalars['Float']>;
  commentCount: Maybe<Scalars['Float']>;
  isLiked: Scalars['Boolean'];
  isAuthor: Scalars['Boolean'];
  comments: Maybe<Array<IComment>>;
};

export type IComment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  photoId: Scalars['ID'];
  commentText: Scalars['String'];
  userId: Scalars['String'];
  isAuthor: Scalars['Boolean'];
  date: Scalars['String'];
  user: IUser;
  photo: IPhoto;
};

export type IPaginatedPhotoResponse = {
  __typename?: 'PaginatedPhotoResponse';
  hasMore: Scalars['Boolean'];
  endCursor: Scalars['DateTime'];
};

export type IPaginatedUsersSearch = {
  __typename?: 'PaginatedUsersSearch';
  items: Array<IUser>;
  paginationInfo: IPaginatedUserResponse;
};

export type IPaginatedUserResponse = {
  __typename?: 'PaginatedUserResponse';
  hasMore: Scalars['Boolean'];
  endCursor: Scalars['String'];
};

export type IRefreshResponseType = {
  __typename?: 'RefreshResponseType';
  accessToken: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type IMutation = {
  __typename?: 'Mutation';
  createChat: IChat;
  findOrCreateChat: IChat;
  createComment: IComment;
  deleteComment: Scalars['Boolean'];
  followUser: Scalars['Boolean'];
  unFollowUser: Scalars['Boolean'];
  like: Scalars['Boolean'];
  createMessage: IMessage;
  createPhoto: IPhoto;
  deletePhoto: Scalars['Boolean'];
  changeForgotPassword: IUser;
  changePassword: IUser;
  confirmUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: ILoginResponseType;
  logout: Scalars['Boolean'];
  setPictureProfile: Scalars['String'];
  register: IUser;
};


export type IMutationCreateChatArgs = {
  userId: Scalars['String'];
};


export type IMutationFindOrCreateChatArgs = {
  userId: Scalars['String'];
};


export type IMutationCreateCommentArgs = {
  data: ICreateCommentType;
};


export type IMutationDeleteCommentArgs = {
  data: IDeleteCommentType;
};


export type IMutationFollowUserArgs = {
  userId: Scalars['String'];
};


export type IMutationUnFollowUserArgs = {
  userId: Scalars['String'];
};


export type IMutationLikeArgs = {
  photoId: Scalars['String'];
};


export type IMutationCreateMessageArgs = {
  chatId: Scalars['String'];
  text: Scalars['String'];
};


export type IMutationCreatePhotoArgs = {
  picture: Scalars['Upload'];
  title: Scalars['String'];
};


export type IMutationDeletePhotoArgs = {
  id: Scalars['String'];
};


export type IMutationChangeForgotPasswordArgs = {
  data: IChangeForgotPassword;
};


export type IMutationChangePasswordArgs = {
  data: IChangePassword;
};


export type IMutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type IMutationForgotPasswordArgs = {
  email: IForgotPasswordType;
};


export type IMutationLoginArgs = {
  data: ILoginInput;
};


export type IMutationSetPictureProfileArgs = {
  picture: Scalars['Upload'];
};


export type IMutationRegisterArgs = {
  data: IRegisterInput;
};

export type ICreateCommentType = {
  photoId: Scalars['String'];
  commentText: Scalars['String'];
};

export type IDeleteCommentType = {
  id: Scalars['String'];
};


export type IChangeForgotPassword = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type IChangePassword = {
  password: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type IForgotPasswordType = {
  email: Scalars['String'];
};

export type ILoginResponseType = {
  __typename?: 'LoginResponseType';
  accessToken: Scalars['String'];
  user: IUser;
};

export type ILoginInput = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type IRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  fullName: Scalars['String'];
  username: Scalars['String'];
};

export type ISubscription = {
  __typename?: 'Subscription';
  messageReceived: IMessage;
};

export type ICommentItemFragment = (
  { __typename?: 'Comment' }
  & Pick<IComment, 'date' | 'userId' | 'id' | 'isAuthor' | 'commentText' | 'photoId'>
  );

export type IPhotoItemFragment = (
  { __typename?: 'Photo' }
  & Pick<IPhoto, 'date' | 'userId' | 'id' | 'pictureUrl' | 'likeCount' | 'commentCount'>
  & {
  user: (
    { __typename?: 'User' }
    & IUserMeFragment
    ), comments: Maybe<Array<(
    { __typename?: 'Comment' }
    & {
    user: (
      { __typename?: 'User' }
      & IUserMeFragment
      )
  }
    & ICommentItemFragment
    )>>
}
  );

export type IUserMeFragment = (
  { __typename?: 'User' }
  & Pick<IUser, 'email' | 'id' | 'username' | 'pictureUrl' | 'fullName'>
  );

export type IFindOrCreateChatMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type IFindOrCreateChatMutation = (
  { __typename?: 'Mutation' }
  & {
  findOrCreateChat: (
    { __typename?: 'Chat' }
    & Pick<IChat, 'id'>
    & {
    users: Array<(
      { __typename?: 'User' }
      & Pick<IUser, 'username' | 'id' | 'isCurrentUser' | 'pictureUrl'>
      )>, messages: Array<(
      { __typename?: 'Message' }
      & Pick<IMessage, 'text' | 'date' | 'readTime' | 'isAuthor'>
      )>
  }
    )
}
  );

export type ICreateCommentMutationVariables = Exact<{
  data: ICreateCommentType;
}>;


export type ICreateCommentMutation = (
  { __typename?: 'Mutation' }
  & {
  createComment: (
    { __typename?: 'Comment' }
    & {
    user: (
      { __typename?: 'User' }
      & IUserMeFragment
      )
  }
    & ICommentItemFragment
    )
}
  );

export type IDeleteCommentMutationVariables = Exact<{
  data: IDeleteCommentType;
}>;


export type IDeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'deleteComment'>
  );

export type IFollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type IFollowUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'followUser'>
  );

export type IUnFollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type IUnFollowUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'unFollowUser'>
  );

export type ILikeMutationVariables = Exact<{
  photoId: Scalars['String'];
}>;


export type ILikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'like'>
  );

export type ICreateMessageMutationVariables = Exact<{
  chatId: Scalars['String'];
  text: Scalars['String'];
}>;


export type ICreateMessageMutation = (
  { __typename?: 'Mutation' }
  & {
  createMessage: (
    { __typename?: 'Message' }
    & Pick<IMessage, 'text' | 'id' | 'date' | 'readTime' | 'isAuthor'>
    & {
    user: (
      { __typename?: 'User' }
      & Pick<IUser, 'username' | 'pictureUrl'>
      )
  }
    )
}
  );

export type ICreatePhotoMutationVariables = Exact<{
  picture: Scalars['Upload'];
  title: Scalars['String'];
}>;


export type ICreatePhotoMutation = (
  { __typename?: 'Mutation' }
  & {
  createPhoto: (
    { __typename?: 'Photo' }
    & Pick<IPhoto, 'date' | 'userId' | 'postText' | 'id' | 'isLiked' | 'isAuthor' | 'pictureUrl' | 'likeCount' | 'commentCount'>
    & {
    user: (
      { __typename?: 'User' }
      & Pick<IUser, 'pictureUrl' | 'fullName' | 'username'>
      )
  }
    )
}
  );

export type IDeletePhotoMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type IDeletePhotoMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'deletePhoto'>
  );

export type IChangeForgotPasswordMutationVariables = Exact<{
  data: IChangeForgotPassword;
}>;


export type IChangeForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & {
  changeForgotPassword: (
    { __typename?: 'User' }
    & Pick<IUser, 'id' | 'username'>
    )
}
  );

export type IConfirmUserMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type IConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'confirmUser'>
  );

export type IForgotPasswordMutationVariables = Exact<{
  email: IForgotPasswordType;
}>;


export type IForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'forgotPassword'>
  );

export type ILoginMutationVariables = Exact<{
  data: ILoginInput;
}>;


export type ILoginMutation = (
  { __typename?: 'Mutation' }
  & {
  login: (
    { __typename?: 'LoginResponseType' }
    & Pick<ILoginResponseType, 'accessToken'>
    & {
    user: (
      { __typename?: 'User' }
      & IUserMeFragment
      )
  }
    )
}
  );

export type ILogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type ILogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'logout'>
  );

export type IRegisterMutationVariables = Exact<{
  data: IRegisterInput;
}>;


export type IRegisterMutation = (
  { __typename?: 'Mutation' }
  & {
  register: (
    { __typename?: 'User' }
    & IUserMeFragment
    )
}
  );

export type ISetPictureProfileMutationVariables = Exact<{
  picture: Scalars['Upload'];
}>;


export type ISetPictureProfileMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'setPictureProfile'>
  );

export type IChatQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IChatQuery = (
  { __typename?: 'Query' }
  & {
  chat: (
    { __typename?: 'Chat' }
    & Pick<IChat, 'id'>
    & {
    users: Array<(
      { __typename?: 'User' }
      & Pick<IUser, 'username' | 'id' | 'isCurrentUser' | 'pictureUrl'>
      )>, messages: Array<(
      { __typename?: 'Message' }
      & Pick<IMessage, 'text' | 'id' | 'date' | 'readTime' | 'isAuthor'>
      & {
      user: (
        { __typename?: 'User' }
        & Pick<IUser, 'username' | 'pictureUrl'>
        )
    }
      )>
  }
    )
}
  );

export type IChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type IChatsQuery = (
  { __typename?: 'Query' }
  & {
  chats: Array<(
    { __typename?: 'Chat' }
    & Pick<IChat, 'id' | 'unread'>
    & {
    users: Array<(
      { __typename?: 'User' }
      & Pick<IUser, 'pictureUrl' | 'username'>
      )>, lastMessage: Maybe<(
      { __typename?: 'Message' }
      & Pick<IMessage, 'date' | 'text'>
      )>
  }
    )>
}
  );

export type IGetFollowersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type IGetFollowersQuery = (
  { __typename?: 'Query' }
  & {
  getFollowers: Array<(
    { __typename?: 'User' }
    & Pick<IUser, 'id' | 'isFollowed' | 'isFollowing' | 'username' | 'fullName' | 'followerCount' | 'pictureUrl'>
    )>
}
  );

export type IGetFollowingsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type IGetFollowingsQuery = (
  { __typename?: 'Query' }
  & {
  getFollowings: Array<(
    { __typename?: 'User' }
    & Pick<IUser, 'id' | 'isFollowed' | 'isFollowing' | 'username' | 'fullName' | 'followerCount' | 'pictureUrl'>
    )>
}
  );

export type IFeedQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor: Maybe<Scalars['String']>;
}>;


export type IFeedQuery = (
  { __typename?: 'Query' }
  & {
  feed: (
    { __typename?: 'PaginatedPhotos' }
    & {
    items: Array<(
      { __typename?: 'Photo' }
      & Pick<IPhoto, 'isLiked' | 'isAuthor' | 'postText'>
      & IPhotoItemFragment
      )>, paginationInfo: (
      { __typename?: 'PaginatedPhotoResponse' }
      & Pick<IPaginatedPhotoResponse, 'hasMore' | 'endCursor'>
      )
  }
    )
}
  );

export type IViewUserPhotoQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type IViewUserPhotoQuery = (
  { __typename?: 'Query' }
  & {
  viewUserPhoto: Array<(
    { __typename?: 'Photo' }
    & Pick<IPhoto, 'date' | 'userId' | 'id' | 'pictureUrl'>
    )>
}
  );

export type IViewPhotoByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IViewPhotoByIdQuery = (
  { __typename?: 'Query' }
  & {
  viewPhotoById: (
    { __typename?: 'Photo' }
    & Pick<IPhoto, 'isLiked' | 'isAuthor' | 'postText'>
    & IPhotoItemFragment
    )
}
  );

export type IGetUserInfoQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type IGetUserInfoQuery = (
  { __typename?: 'Query' }
  & {
  getUserInfo: (
    { __typename?: 'User' }
    & Pick<IUser, 'followerCount' | 'photoCount' | 'followingCount' | 'isCurrentUser' | 'isFollowing' | 'isFollowed'>
    & IUserMeFragment
    )
}
  );

export type IMeQueryVariables = Exact<{ [key: string]: never; }>;


export type IMeQuery = (
  { __typename?: 'Query' }
  & {
  me: Maybe<(
    { __typename?: 'User' }
    & IUserMeFragment
    )>
}
  );

export type IMessageReceivedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type IMessageReceivedSubscription = (
  { __typename?: 'Subscription' }
  & {
  messageReceived: (
    { __typename?: 'Message' }
    & Pick<IMessage, 'text' | 'id' | 'date' | 'chatId' | 'readTime' | 'isAuthor'>
    & {
    user: (
      { __typename?: 'User' }
      & Pick<IUser, 'id' | 'pictureUrl' | 'username'>
      )
  }
    )
}
  );

export type ISearchQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor: Maybe<Scalars['String']>;
  subString: Scalars['String'];
}>;


export type ISearchQuery = (
  { __typename?: 'Query' }
  & {
  search: (
    { __typename?: 'PaginatedUsersSearch' }
    & {
    items: Array<(
      { __typename?: 'User' }
      & IUserMeFragment
      )>, paginationInfo: (
      { __typename?: 'PaginatedUserResponse' }
      & Pick<IPaginatedUserResponse, 'hasMore' | 'endCursor'>
      )
  }
    )
}
  );

export const UserMeFragmentDoc = gql`
  fragment userMe on User {
    email
    id
    username
    pictureUrl
    fullName
  }
`
export const CommentItemFragmentDoc = gql`
  fragment commentItem on Comment {
    date
    userId
    id
    isAuthor
    commentText
    photoId
  }
`
export const PhotoItemFragmentDoc = gql`
  fragment photoItem on Photo {
    date
    userId
    id
    pictureUrl
    likeCount
    commentCount
    user {
      ...userMe
    }
    comments {
      ...commentItem
      user {
        ...userMe
      }
    }
  }
  ${UserMeFragmentDoc}
${CommentItemFragmentDoc}`
export const FindOrCreateChatDocument = gql`
  mutation FindOrCreateChat($userId: String!) {
    findOrCreateChat(userId: $userId) {
      id
      users {
        username
        id
        isCurrentUser
        pictureUrl
      }
      messages {
        text
        date
        readTime
        isAuthor
      }
    }
  }
`
export type IFindOrCreateChatMutationFn = Apollo.MutationFunction<IFindOrCreateChatMutation, IFindOrCreateChatMutationVariables>;

/**
 * __useFindOrCreateChatMutation__
 *
 * To run a mutation, you first call `useFindOrCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindOrCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findOrCreateChatMutation, { data, loading, error }] = useFindOrCreateChatMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindOrCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<IFindOrCreateChatMutation, IFindOrCreateChatMutationVariables>) {
  return Apollo.useMutation<IFindOrCreateChatMutation, IFindOrCreateChatMutationVariables>(FindOrCreateChatDocument, baseOptions)
}

export type FindOrCreateChatMutationHookResult = ReturnType<typeof useFindOrCreateChatMutation>;
export type FindOrCreateChatMutationResult = Apollo.MutationResult<IFindOrCreateChatMutation>;
export type FindOrCreateChatMutationOptions = Apollo.BaseMutationOptions<IFindOrCreateChatMutation, IFindOrCreateChatMutationVariables>;
export const CreateCommentDocument = gql`
  mutation CreateComment($data: CreateCommentType!) {
    createComment(data: $data) {
      ...commentItem
      user {
        ...userMe
      }
    }
  }
  ${CommentItemFragmentDoc}
${UserMeFragmentDoc}`
export type ICreateCommentMutationFn = Apollo.MutationFunction<ICreateCommentMutation, ICreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<ICreateCommentMutation, ICreateCommentMutationVariables>) {
  return Apollo.useMutation<ICreateCommentMutation, ICreateCommentMutationVariables>(CreateCommentDocument, baseOptions)
}

export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<ICreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<ICreateCommentMutation, ICreateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
  mutation DeleteComment($data: DeleteCommentType!) {
    deleteComment(data: $data)
  }
`
export type IDeleteCommentMutationFn = Apollo.MutationFunction<IDeleteCommentMutation, IDeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<IDeleteCommentMutation, IDeleteCommentMutationVariables>) {
  return Apollo.useMutation<IDeleteCommentMutation, IDeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions)
}

export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<IDeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<IDeleteCommentMutation, IDeleteCommentMutationVariables>;
export const FollowUserDocument = gql`
  mutation FollowUser($userId: String!) {
    followUser(userId: $userId)
  }
`
export type IFollowUserMutationFn = Apollo.MutationFunction<IFollowUserMutation, IFollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<IFollowUserMutation, IFollowUserMutationVariables>) {
  return Apollo.useMutation<IFollowUserMutation, IFollowUserMutationVariables>(FollowUserDocument, baseOptions)
}

export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<IFollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<IFollowUserMutation, IFollowUserMutationVariables>;
export const UnFollowUserDocument = gql`
  mutation UnFollowUser($userId: String!) {
    unFollowUser(userId: $userId)
  }
`
export type IUnFollowUserMutationFn = Apollo.MutationFunction<IUnFollowUserMutation, IUnFollowUserMutationVariables>;

/**
 * __useUnFollowUserMutation__
 *
 * To run a mutation, you first call `useUnFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unFollowUserMutation, { data, loading, error }] = useUnFollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<IUnFollowUserMutation, IUnFollowUserMutationVariables>) {
  return Apollo.useMutation<IUnFollowUserMutation, IUnFollowUserMutationVariables>(UnFollowUserDocument, baseOptions)
}

export type UnFollowUserMutationHookResult = ReturnType<typeof useUnFollowUserMutation>;
export type UnFollowUserMutationResult = Apollo.MutationResult<IUnFollowUserMutation>;
export type UnFollowUserMutationOptions = Apollo.BaseMutationOptions<IUnFollowUserMutation, IUnFollowUserMutationVariables>;
export const LikeDocument = gql`
  mutation Like($photoId: String!) {
    like(photoId: $photoId)
  }
`
export type ILikeMutationFn = Apollo.MutationFunction<ILikeMutation, ILikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      photoId: // value for 'photoId'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<ILikeMutation, ILikeMutationVariables>) {
  return Apollo.useMutation<ILikeMutation, ILikeMutationVariables>(LikeDocument, baseOptions)
}

export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<ILikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<ILikeMutation, ILikeMutationVariables>;
export const CreateMessageDocument = gql`
  mutation CreateMessage($chatId: String!, $text: String!) {
    createMessage(chatId: $chatId, text: $text) {
      text
      id
      user {
        username
        pictureUrl
      }
      date
      readTime
      isAuthor
    }
  }
`
export type ICreateMessageMutationFn = Apollo.MutationFunction<ICreateMessageMutation, ICreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<ICreateMessageMutation, ICreateMessageMutationVariables>) {
  return Apollo.useMutation<ICreateMessageMutation, ICreateMessageMutationVariables>(CreateMessageDocument, baseOptions)
}

export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<ICreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<ICreateMessageMutation, ICreateMessageMutationVariables>;
export const CreatePhotoDocument = gql`
  mutation CreatePhoto($picture: Upload!, $title: String!) {
    createPhoto(picture: $picture, title: $title) {
      date
      userId
      postText
      id
      isLiked
      isAuthor
      pictureUrl
      likeCount
      commentCount
      user {
        pictureUrl
        fullName
        username
      }
    }
  }
`
export type ICreatePhotoMutationFn = Apollo.MutationFunction<ICreatePhotoMutation, ICreatePhotoMutationVariables>;

/**
 * __useCreatePhotoMutation__
 *
 * To run a mutation, you first call `useCreatePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPhotoMutation, { data, loading, error }] = useCreatePhotoMutation({
 *   variables: {
 *      picture: // value for 'picture'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreatePhotoMutation(baseOptions?: Apollo.MutationHookOptions<ICreatePhotoMutation, ICreatePhotoMutationVariables>) {
  return Apollo.useMutation<ICreatePhotoMutation, ICreatePhotoMutationVariables>(CreatePhotoDocument, baseOptions)
}

export type CreatePhotoMutationHookResult = ReturnType<typeof useCreatePhotoMutation>;
export type CreatePhotoMutationResult = Apollo.MutationResult<ICreatePhotoMutation>;
export type CreatePhotoMutationOptions = Apollo.BaseMutationOptions<ICreatePhotoMutation, ICreatePhotoMutationVariables>;
export const DeletePhotoDocument = gql`
  mutation DeletePhoto($id: String!) {
    deletePhoto(id: $id)
  }
`
export type IDeletePhotoMutationFn = Apollo.MutationFunction<IDeletePhotoMutation, IDeletePhotoMutationVariables>;

/**
 * __useDeletePhotoMutation__
 *
 * To run a mutation, you first call `useDeletePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePhotoMutation, { data, loading, error }] = useDeletePhotoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePhotoMutation(baseOptions?: Apollo.MutationHookOptions<IDeletePhotoMutation, IDeletePhotoMutationVariables>) {
  return Apollo.useMutation<IDeletePhotoMutation, IDeletePhotoMutationVariables>(DeletePhotoDocument, baseOptions)
}

export type DeletePhotoMutationHookResult = ReturnType<typeof useDeletePhotoMutation>;
export type DeletePhotoMutationResult = Apollo.MutationResult<IDeletePhotoMutation>;
export type DeletePhotoMutationOptions = Apollo.BaseMutationOptions<IDeletePhotoMutation, IDeletePhotoMutationVariables>;
export const ChangeForgotPasswordDocument = gql`
  mutation ChangeForgotPassword($data: ChangeForgotPassword!) {
    changeForgotPassword(data: $data) {
      id
      username
    }
  }
`
export type IChangeForgotPasswordMutationFn = Apollo.MutationFunction<IChangeForgotPasswordMutation, IChangeForgotPasswordMutationVariables>;

/**
 * __useChangeForgotPasswordMutation__
 *
 * To run a mutation, you first call `useChangeForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeForgotPasswordMutation, { data, loading, error }] = useChangeForgotPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<IChangeForgotPasswordMutation, IChangeForgotPasswordMutationVariables>) {
  return Apollo.useMutation<IChangeForgotPasswordMutation, IChangeForgotPasswordMutationVariables>(ChangeForgotPasswordDocument, baseOptions)
}

export type ChangeForgotPasswordMutationHookResult = ReturnType<typeof useChangeForgotPasswordMutation>;
export type ChangeForgotPasswordMutationResult = Apollo.MutationResult<IChangeForgotPasswordMutation>;
export type ChangeForgotPasswordMutationOptions = Apollo.BaseMutationOptions<IChangeForgotPasswordMutation, IChangeForgotPasswordMutationVariables>;
export const ConfirmUserDocument = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`
export type IConfirmUserMutationFn = Apollo.MutationFunction<IConfirmUserMutation, IConfirmUserMutationVariables>;

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmUserMutation(baseOptions?: Apollo.MutationHookOptions<IConfirmUserMutation, IConfirmUserMutationVariables>) {
  return Apollo.useMutation<IConfirmUserMutation, IConfirmUserMutationVariables>(ConfirmUserDocument, baseOptions)
}

export type ConfirmUserMutationHookResult = ReturnType<typeof useConfirmUserMutation>;
export type ConfirmUserMutationResult = Apollo.MutationResult<IConfirmUserMutation>;
export type ConfirmUserMutationOptions = Apollo.BaseMutationOptions<IConfirmUserMutation, IConfirmUserMutationVariables>;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: ForgotPasswordType!) {
    forgotPassword(email: $email)
  }
`
export type IForgotPasswordMutationFn = Apollo.MutationFunction<IForgotPasswordMutation, IForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<IForgotPasswordMutation, IForgotPasswordMutationVariables>) {
  return Apollo.useMutation<IForgotPasswordMutation, IForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions)
}

export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<IForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<IForgotPasswordMutation, IForgotPasswordMutationVariables>;
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      accessToken
      user {
        ...userMe
      }
    }
  }
${UserMeFragmentDoc}`
export type ILoginMutationFn = Apollo.MutationFunction<ILoginMutation, ILoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<ILoginMutation, ILoginMutationVariables>) {
  return Apollo.useMutation<ILoginMutation, ILoginMutationVariables>(LoginDocument, baseOptions)
}

export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<ILoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<ILoginMutation, ILoginMutationVariables>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`
export type ILogoutMutationFn = Apollo.MutationFunction<ILogoutMutation, ILogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<ILogoutMutation, ILogoutMutationVariables>) {
  return Apollo.useMutation<ILogoutMutation, ILogoutMutationVariables>(LogoutDocument, baseOptions)
}

export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<ILogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<ILogoutMutation, ILogoutMutationVariables>;
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      ...userMe
    }
  }
${UserMeFragmentDoc}`
export type IRegisterMutationFn = Apollo.MutationFunction<IRegisterMutation, IRegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<IRegisterMutation, IRegisterMutationVariables>) {
  return Apollo.useMutation<IRegisterMutation, IRegisterMutationVariables>(RegisterDocument, baseOptions)
}

export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<IRegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<IRegisterMutation, IRegisterMutationVariables>;
export const SetPictureProfileDocument = gql`
  mutation SetPictureProfile($picture: Upload!) {
    setPictureProfile(picture: $picture)
  }
`
export type ISetPictureProfileMutationFn = Apollo.MutationFunction<ISetPictureProfileMutation, ISetPictureProfileMutationVariables>;

/**
 * __useSetPictureProfileMutation__
 *
 * To run a mutation, you first call `useSetPictureProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPictureProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPictureProfileMutation, { data, loading, error }] = useSetPictureProfileMutation({
 *   variables: {
 *      picture: // value for 'picture'
 *   },
 * });
 */
export function useSetPictureProfileMutation(baseOptions?: Apollo.MutationHookOptions<ISetPictureProfileMutation, ISetPictureProfileMutationVariables>) {
  return Apollo.useMutation<ISetPictureProfileMutation, ISetPictureProfileMutationVariables>(SetPictureProfileDocument, baseOptions)
}

export type SetPictureProfileMutationHookResult = ReturnType<typeof useSetPictureProfileMutation>;
export type SetPictureProfileMutationResult = Apollo.MutationResult<ISetPictureProfileMutation>;
export type SetPictureProfileMutationOptions = Apollo.BaseMutationOptions<ISetPictureProfileMutation, ISetPictureProfileMutationVariables>;
export const ChatDocument = gql`
  query Chat($id: String!) {
    chat(id: $id) {
      users {
        username
        id
        isCurrentUser
        pictureUrl
      }
      id
      messages {
        text
        id
        user {
          username
          pictureUrl
        }
        date
        readTime
        isAuthor
      }
    }
  }
`

/**
 * __useChatQuery__
 *
 * To run a query within a React component, call `useChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChatQuery(baseOptions: Apollo.QueryHookOptions<IChatQuery, IChatQueryVariables>) {
  return Apollo.useQuery<IChatQuery, IChatQueryVariables>(ChatDocument, baseOptions)
}

export function useChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IChatQuery, IChatQueryVariables>) {
  return Apollo.useLazyQuery<IChatQuery, IChatQueryVariables>(ChatDocument, baseOptions)
}

export type ChatQueryHookResult = ReturnType<typeof useChatQuery>;
export type ChatLazyQueryHookResult = ReturnType<typeof useChatLazyQuery>;
export type ChatQueryResult = Apollo.QueryResult<IChatQuery, IChatQueryVariables>;
export const ChatsDocument = gql`
  query Chats {
    chats {
      id
      unread
      users {
        pictureUrl
        username
      }
      lastMessage {
        date
        text
      }
    }
  }
`

/**
 * __useChatsQuery__
 *
 * To run a query within a React component, call `useChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChatsQuery(baseOptions?: Apollo.QueryHookOptions<IChatsQuery, IChatsQueryVariables>) {
  return Apollo.useQuery<IChatsQuery, IChatsQueryVariables>(ChatsDocument, baseOptions)
}

export function useChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IChatsQuery, IChatsQueryVariables>) {
  return Apollo.useLazyQuery<IChatsQuery, IChatsQueryVariables>(ChatsDocument, baseOptions)
}

export type ChatsQueryHookResult = ReturnType<typeof useChatsQuery>;
export type ChatsLazyQueryHookResult = ReturnType<typeof useChatsLazyQuery>;
export type ChatsQueryResult = Apollo.QueryResult<IChatsQuery, IChatsQueryVariables>;
export const GetFollowersDocument = gql`
  query GetFollowers($userId: String!) {
    getFollowers(userId: $userId) {
      id
      isFollowed
      isFollowing
      username
      fullName
      followerCount
      pictureUrl
    }
  }
`

/**
 * __useGetFollowersQuery__
 *
 * To run a query within a React component, call `useGetFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetFollowersQuery(baseOptions: Apollo.QueryHookOptions<IGetFollowersQuery, IGetFollowersQueryVariables>) {
  return Apollo.useQuery<IGetFollowersQuery, IGetFollowersQueryVariables>(GetFollowersDocument, baseOptions)
}

export function useGetFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetFollowersQuery, IGetFollowersQueryVariables>) {
  return Apollo.useLazyQuery<IGetFollowersQuery, IGetFollowersQueryVariables>(GetFollowersDocument, baseOptions)
}

export type GetFollowersQueryHookResult = ReturnType<typeof useGetFollowersQuery>;
export type GetFollowersLazyQueryHookResult = ReturnType<typeof useGetFollowersLazyQuery>;
export type GetFollowersQueryResult = Apollo.QueryResult<IGetFollowersQuery, IGetFollowersQueryVariables>;
export const GetFollowingsDocument = gql`
  query GetFollowings($userId: String!) {
    getFollowings(userId: $userId) {
      id
      isFollowed
      isFollowing
      username
      fullName
      followerCount
      pictureUrl
    }
  }
`

/**
 * __useGetFollowingsQuery__
 *
 * To run a query within a React component, call `useGetFollowingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowingsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetFollowingsQuery(baseOptions: Apollo.QueryHookOptions<IGetFollowingsQuery, IGetFollowingsQueryVariables>) {
  return Apollo.useQuery<IGetFollowingsQuery, IGetFollowingsQueryVariables>(GetFollowingsDocument, baseOptions)
}

export function useGetFollowingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetFollowingsQuery, IGetFollowingsQueryVariables>) {
  return Apollo.useLazyQuery<IGetFollowingsQuery, IGetFollowingsQueryVariables>(GetFollowingsDocument, baseOptions)
}

export type GetFollowingsQueryHookResult = ReturnType<typeof useGetFollowingsQuery>;
export type GetFollowingsLazyQueryHookResult = ReturnType<typeof useGetFollowingsLazyQuery>;
export type GetFollowingsQueryResult = Apollo.QueryResult<IGetFollowingsQuery, IGetFollowingsQueryVariables>;
export const FeedDocument = gql`
  query Feed($limit: Int!, $cursor: String) {
    feed(limit: $limit, cursor: $cursor) {
      items {
        isLiked
        isAuthor
        postText
        ...photoItem
      }
      paginationInfo {
        hasMore
        endCursor
      }
    }
  }
${PhotoItemFragmentDoc}`

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useFeedQuery(baseOptions: Apollo.QueryHookOptions<IFeedQuery, IFeedQueryVariables>) {
  return Apollo.useQuery<IFeedQuery, IFeedQueryVariables>(FeedDocument, baseOptions)
}

export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IFeedQuery, IFeedQueryVariables>) {
  return Apollo.useLazyQuery<IFeedQuery, IFeedQueryVariables>(FeedDocument, baseOptions)
}

export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<IFeedQuery, IFeedQueryVariables>;
export const ViewUserPhotoDocument = gql`
  query ViewUserPhoto($username: String!) {
    viewUserPhoto(username: $username) {
      date
      userId
      id
      pictureUrl
    }
  }
`

/**
 * __useViewUserPhotoQuery__
 *
 * To run a query within a React component, call `useViewUserPhotoQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewUserPhotoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewUserPhotoQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useViewUserPhotoQuery(baseOptions: Apollo.QueryHookOptions<IViewUserPhotoQuery, IViewUserPhotoQueryVariables>) {
  return Apollo.useQuery<IViewUserPhotoQuery, IViewUserPhotoQueryVariables>(ViewUserPhotoDocument, baseOptions)
}

export function useViewUserPhotoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IViewUserPhotoQuery, IViewUserPhotoQueryVariables>) {
  return Apollo.useLazyQuery<IViewUserPhotoQuery, IViewUserPhotoQueryVariables>(ViewUserPhotoDocument, baseOptions)
}

export type ViewUserPhotoQueryHookResult = ReturnType<typeof useViewUserPhotoQuery>;
export type ViewUserPhotoLazyQueryHookResult = ReturnType<typeof useViewUserPhotoLazyQuery>;
export type ViewUserPhotoQueryResult = Apollo.QueryResult<IViewUserPhotoQuery, IViewUserPhotoQueryVariables>;
export const ViewPhotoByIdDocument = gql`
  query ViewPhotoById($id: String!) {
    viewPhotoById(id: $id) {
      isLiked
      isAuthor
      postText
      ...photoItem
    }
  }
${PhotoItemFragmentDoc}`

/**
 * __useViewPhotoByIdQuery__
 *
 * To run a query within a React component, call `useViewPhotoByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewPhotoByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewPhotoByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useViewPhotoByIdQuery(baseOptions: Apollo.QueryHookOptions<IViewPhotoByIdQuery, IViewPhotoByIdQueryVariables>) {
  return Apollo.useQuery<IViewPhotoByIdQuery, IViewPhotoByIdQueryVariables>(ViewPhotoByIdDocument, baseOptions)
}

export function useViewPhotoByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IViewPhotoByIdQuery, IViewPhotoByIdQueryVariables>) {
  return Apollo.useLazyQuery<IViewPhotoByIdQuery, IViewPhotoByIdQueryVariables>(ViewPhotoByIdDocument, baseOptions)
}

export type ViewPhotoByIdQueryHookResult = ReturnType<typeof useViewPhotoByIdQuery>;
export type ViewPhotoByIdLazyQueryHookResult = ReturnType<typeof useViewPhotoByIdLazyQuery>;
export type ViewPhotoByIdQueryResult = Apollo.QueryResult<IViewPhotoByIdQuery, IViewPhotoByIdQueryVariables>;
export const GetUserInfoDocument = gql`
  query GetUserInfo($username: String!) {
    getUserInfo(username: $username) {
      ...userMe
      followerCount
      photoCount
      followingCount
      isCurrentUser
      isFollowing
      isFollowed
    }
  }
${UserMeFragmentDoc}`

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions: Apollo.QueryHookOptions<IGetUserInfoQuery, IGetUserInfoQueryVariables>) {
  return Apollo.useQuery<IGetUserInfoQuery, IGetUserInfoQueryVariables>(GetUserInfoDocument, baseOptions)
}

export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetUserInfoQuery, IGetUserInfoQueryVariables>) {
  return Apollo.useLazyQuery<IGetUserInfoQuery, IGetUserInfoQueryVariables>(GetUserInfoDocument, baseOptions)
}

export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<IGetUserInfoQuery, IGetUserInfoQueryVariables>;
export const MeDocument = gql`
  query Me {
    me {
      ...userMe
    }
  }
${UserMeFragmentDoc}`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<IMeQuery, IMeQueryVariables>) {
  return Apollo.useQuery<IMeQuery, IMeQueryVariables>(MeDocument, baseOptions)
}

export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IMeQuery, IMeQueryVariables>) {
  return Apollo.useLazyQuery<IMeQuery, IMeQueryVariables>(MeDocument, baseOptions)
}

export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<IMeQuery, IMeQueryVariables>;
export const MessageReceivedDocument = gql`
  subscription MessageReceived {
    messageReceived {
      text
      id
      date
      chatId
      readTime
      isAuthor
      user {
        id
        pictureUrl
        username
      }
    }
  }
`

/**
 * __useMessageReceivedSubscription__
 *
 * To run a query within a React component, call `useMessageReceivedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageReceivedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageReceivedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMessageReceivedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<IMessageReceivedSubscription, IMessageReceivedSubscriptionVariables>) {
  return Apollo.useSubscription<IMessageReceivedSubscription, IMessageReceivedSubscriptionVariables>(MessageReceivedDocument, baseOptions)
}

export type MessageReceivedSubscriptionHookResult = ReturnType<typeof useMessageReceivedSubscription>;
export type MessageReceivedSubscriptionResult = Apollo.SubscriptionResult<IMessageReceivedSubscription>;
export const SearchDocument = gql`
  query Search($limit: Int!, $cursor: String, $subString: String!) {
    search(limit: $limit, cursor: $cursor, subString: $subString) {
      items {
        ...userMe
      }
      paginationInfo {
        hasMore
        endCursor
      }
    }
  }
${UserMeFragmentDoc}`

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      subString: // value for 'subString'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<ISearchQuery, ISearchQueryVariables>) {
  return Apollo.useQuery<ISearchQuery, ISearchQueryVariables>(SearchDocument, baseOptions)
}

export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ISearchQuery, ISearchQueryVariables>) {
  return Apollo.useLazyQuery<ISearchQuery, ISearchQueryVariables>(SearchDocument, baseOptions)
}

export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<ISearchQuery, ISearchQueryVariables>;
