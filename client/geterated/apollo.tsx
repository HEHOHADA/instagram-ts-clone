import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
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

export type Query = {
  __typename?: 'Query';
  feed?: Maybe<Array<Photo>>;
  viewUserPhoto: Array<Photo>;
  getUserInfo: User;
  me?: Maybe<User>;
  refreshToken: RefreshResponseType;
};


export type QueryViewUserPhotoArgs = {
  username: Scalars['String'];
};


export type QueryGetUserInfoArgs = {
  username: Scalars['String'];
};

export type Photo = {
  __typename?: 'Photo';
  photoId: Scalars['ID'];
  date: Scalars['DateTime'];
  pictureUrl: Scalars['String'];
  userId: Scalars['String'];
  user: User;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  fullName: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  pictureUrl?: Maybe<Scalars['String']>;
  followerCount: Scalars['Float'];
  followingCount: Scalars['Float'];
  photoCount: Scalars['Float'];
  isFollowed: Scalars['Boolean'];
  isFollowing: Scalars['Boolean'];
  isCurrentUser: Scalars['Boolean'];
};

export type RefreshResponseType = {
  __typename?: 'RefreshResponseType';
  accessToken: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  deleteComment: Scalars['Boolean'];
  followUser: Scalars['Boolean'];
  unFollowUser: Scalars['Boolean'];
  createPhoto: Scalars['Boolean'];
  deletePhoto: Scalars['Boolean'];
  changeForgotPassword: User;
  changePassword: User;
  confirmUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: LoginResponseType;
  logout: Scalars['Boolean'];
  setPictureProfile: Scalars['String'];
  register: User;
};


export type MutationCreateCommentArgs = {
  data: CreateCommentType;
};


export type MutationDeleteCommentArgs = {
  data: DeleteCommentType;
};


export type MutationFollowUserArgs = {
  userId: Scalars['String'];
};


export type MutationUnFollowUserArgs = {
  userId: Scalars['String'];
};


export type MutationCreatePhotoArgs = {
  picture: Scalars['Upload'];
};


export type MutationDeletePhotoArgs = {
  pictureId: Scalars['String'];
};


export type MutationChangeForgotPasswordArgs = {
  data: ChangeForgotPassword;
};


export type MutationChangePasswordArgs = {
  data: ChangePassword;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: ForgotPasswordType;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationSetPictureProfileArgs = {
  picture: Scalars['Upload'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type Comment = {
  __typename?: 'Comment';
  photoId: Scalars['ID'];
  commentId: Scalars['ID'];
  commentText: Scalars['String'];
  userId: Scalars['String'];
  date: Scalars['DateTime'];
  user: User;
  photo: Photo;
};

export type CreateCommentType = {
  photoId: Scalars['String'];
  commentText: Scalars['String'];
};

export type DeleteCommentType = {
  commentId: Scalars['String'];
};


export type ChangeForgotPassword = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ChangePassword = {
  password: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type ForgotPasswordType = {
  email: Scalars['String'];
};

export type LoginResponseType = {
  __typename?: 'LoginResponseType';
  accessToken: Scalars['String'];
  user: User;
};

export type LoginInput = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  fullName: Scalars['String'];
  username: Scalars['String'];
};

export type ViewUserPhotoQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type ViewUserPhotoQuery = (
  { __typename?: 'Query' }
  & { viewUserPhoto: Array<(
    { __typename?: 'Photo' }
    & Pick<Photo, 'date' | 'userId' | 'photoId' | 'pictureUrl'>
  )> }
);

export type ChangeForgotPasswordMutationVariables = Exact<{
  data: ChangeForgotPassword;
}>;


export type ChangeForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { changeForgotPassword: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type ConfirmUserMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: ForgotPasswordType;
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponseType' }
    & Pick<LoginResponseType, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'pictureUrl' | 'fullName'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RefreshTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenQuery = (
  { __typename?: 'Query' }
  & { refreshToken: (
    { __typename?: 'RefreshResponseType' }
    & Pick<RefreshResponseType, 'accessToken'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username'>
  ) }
);

export type SetPictureProfileMutationVariables = Exact<{
  picture: Scalars['Upload'];
}>;


export type SetPictureProfileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setPictureProfile'>
);

export type GetUserInfoQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserInfoQuery = (
  { __typename?: 'Query' }
  & { getUserInfo: (
    { __typename?: 'User' }
    & Pick<User, 'email' | 'id' | 'username' | 'pictureUrl' | 'fullName' | 'followerCount' | 'photoCount' | 'followingCount' | 'isCurrentUser' | 'isFollowing' | 'isFollowed'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'id' | 'username' | 'pictureUrl' | 'fullName'>
  )> }
);


export const ViewUserPhotoDocument = gql`
    query ViewUserPhoto($username: String!) {
  viewUserPhoto(username: $username) {
    date
    userId
    photoId
    pictureUrl
  }
}
    `;

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
export function useViewUserPhotoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ViewUserPhotoQuery, ViewUserPhotoQueryVariables>) {
        return ApolloReactHooks.useQuery<ViewUserPhotoQuery, ViewUserPhotoQueryVariables>(ViewUserPhotoDocument, baseOptions);
      }
export function useViewUserPhotoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ViewUserPhotoQuery, ViewUserPhotoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ViewUserPhotoQuery, ViewUserPhotoQueryVariables>(ViewUserPhotoDocument, baseOptions);
        }
export type ViewUserPhotoQueryHookResult = ReturnType<typeof useViewUserPhotoQuery>;
export type ViewUserPhotoLazyQueryHookResult = ReturnType<typeof useViewUserPhotoLazyQuery>;
export type ViewUserPhotoQueryResult = ApolloReactCommon.QueryResult<ViewUserPhotoQuery, ViewUserPhotoQueryVariables>;
export const ChangeForgotPasswordDocument = gql`
    mutation ChangeForgotPassword($data: ChangeForgotPassword!) {
  changeForgotPassword(data: $data) {
    id
    username
  }
}
    `;
export type ChangeForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ChangeForgotPasswordMutation, ChangeForgotPasswordMutationVariables>;

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
export function useChangeForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangeForgotPasswordMutation, ChangeForgotPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangeForgotPasswordMutation, ChangeForgotPasswordMutationVariables>(ChangeForgotPasswordDocument, baseOptions);
      }
export type ChangeForgotPasswordMutationHookResult = ReturnType<typeof useChangeForgotPasswordMutation>;
export type ChangeForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ChangeForgotPasswordMutation>;
export type ChangeForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangeForgotPasswordMutation, ChangeForgotPasswordMutationVariables>;
export const ConfirmUserDocument = gql`
    mutation ConfirmUser($token: String!) {
  confirmUser(token: $token)
}
    `;
export type ConfirmUserMutationFn = ApolloReactCommon.MutationFunction<ConfirmUserMutation, ConfirmUserMutationVariables>;

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
export function useConfirmUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ConfirmUserMutation, ConfirmUserMutationVariables>) {
        return ApolloReactHooks.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, baseOptions);
      }
export type ConfirmUserMutationHookResult = ReturnType<typeof useConfirmUserMutation>;
export type ConfirmUserMutationResult = ApolloReactCommon.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = ApolloReactCommon.BaseMutationOptions<ConfirmUserMutation, ConfirmUserMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: ForgotPasswordType!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

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
export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    accessToken
    user {
      id
      username
      email
      pictureUrl
      fullName
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = gql`
    query RefreshToken {
  refreshToken {
    accessToken
  }
}
    `;

/**
 * __useRefreshTokenQuery__
 *
 * To run a query within a React component, call `useRefreshTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefreshTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RefreshTokenQuery, RefreshTokenQueryVariables>) {
        return ApolloReactHooks.useQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, baseOptions);
      }
export function useRefreshTokenLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RefreshTokenQuery, RefreshTokenQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, baseOptions);
        }
export type RefreshTokenQueryHookResult = ReturnType<typeof useRefreshTokenQuery>;
export type RefreshTokenLazyQueryHookResult = ReturnType<typeof useRefreshTokenLazyQuery>;
export type RefreshTokenQueryResult = ApolloReactCommon.QueryResult<RefreshTokenQuery, RefreshTokenQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    id
    email
    username
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SetPictureProfileDocument = gql`
    mutation SetPictureProfile($picture: Upload!) {
  setPictureProfile(picture: $picture)
}
    `;
export type SetPictureProfileMutationFn = ApolloReactCommon.MutationFunction<SetPictureProfileMutation, SetPictureProfileMutationVariables>;

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
export function useSetPictureProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetPictureProfileMutation, SetPictureProfileMutationVariables>) {
        return ApolloReactHooks.useMutation<SetPictureProfileMutation, SetPictureProfileMutationVariables>(SetPictureProfileDocument, baseOptions);
      }
export type SetPictureProfileMutationHookResult = ReturnType<typeof useSetPictureProfileMutation>;
export type SetPictureProfileMutationResult = ApolloReactCommon.MutationResult<SetPictureProfileMutation>;
export type SetPictureProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<SetPictureProfileMutation, SetPictureProfileMutationVariables>;
export const GetUserInfoDocument = gql`
    query GetUserInfo($username: String!) {
  getUserInfo(username: $username) {
    email
    id
    username
    pictureUrl
    fullName
    followerCount
    photoCount
    followingCount
    isCurrentUser
    isFollowing
    isFollowed
  }
}
    `;

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
export function useGetUserInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, baseOptions);
      }
export function useGetUserInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, baseOptions);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoQueryResult = ApolloReactCommon.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    email
    id
    username
    pictureUrl
    fullName
  }
}
    `;

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
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;