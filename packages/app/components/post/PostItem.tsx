import React, { FC } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { HeaderButtons } from 'react-navigation-header-buttons'
import { FontAwesome5 } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { AppHeaderIcon } from 'components/ui/AppHeaderIcon'
import { AppImage } from 'components/ui/AppImage'
import { screenWidth } from 'constants/demens'
import { AppIcon } from 'components/ui/AppIcon'
import { iconSize, icons } from 'constants/icons'
import { IPhoto, IPhotoItemFragment } from 'geterated'
import { Text } from 'components/Themed'

type PropsType = (Pick<IPhoto, 'isLiked' | 'isAuthor' | 'postText'> & IPhotoItemFragment) & {
  onNavigatePost?: (id: string) => void
  onNavigateProfile?: (id: string) => void
  onLike: (photoId: string, isLiked: boolean) => void

}

export const PostItem: FC<PropsType> = ({
  user,
  commentCount,
  postText,
  onLike,
  isLiked,
  likeCount, id,
  pictureUrl,
  onNavigatePost,
  onNavigateProfile
}) => {
  const { navigate } = useNavigation()
  return (
    <View style={ styles.wrapper }>
      <View style={ styles.header }>
        <TouchableOpacity
          style={ styles.user }
          onLongPress={ () => onNavigateProfile?.(user.username) }>
          { user?.pictureUrl && <AppImage uri={ user.pictureUrl as string } /> }
          <View style={ styles.info }>
            <Text style={ { fontWeight: 'bold', fontSize: 16 } }>{ user.username }</Text>
            <Text>{ user.fullName }</Text>
          </View>
        </TouchableOpacity>
        <View>
          <HeaderButtons
            HeaderButtonComponent={ AppHeaderIcon }>
            <FontAwesome5 name='ellipsis-v' size={ 20 } color='black' onPress={ () => {
            } } />
          </HeaderButtons>
        </View>
      </View>
      <TouchableOpacity
        style={ styles.container }
        activeOpacity={ 0.9 }
        onLongPress={ () => onNavigatePost && onNavigatePost(id) }>
        <TapGestureHandler
          numberOfTaps={ 2 }>
          <View>
            <Image
              width={ screenWidth }
              height={ screenWidth }
              source={ { uri: pictureUrl } }
            />
          </View>
        </TapGestureHandler>
      </TouchableOpacity>
      <View style={ styles.reactionsWrapper }>
        <View style={ styles.reactions }>
          <View style={ styles.lReactions }>
            <TouchableOpacity
              onPress={ () => onLike(id, isLiked) }
            >
              <AppIcon name={ icons.like } color={ isLiked ? 'red' : 'black' } />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome5 name={ icons.comment } size={ iconSize.big } color='black' />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => navigate('Direct', { screen: 'TabDirectScreen' }) }>
              <FontAwesome5 name={ icons.direct } size={ iconSize.big } color='black' />
            </TouchableOpacity>
          </View>
        </View>
        { likeCount ? <Text style={ {
          fontWeight: 'bold',
          marginVertical: 5
        } }>{ likeCount >= 1000 ?
          (Math.round(likeCount / 1000) + 'k')
          : likeCount } { likeCount < 2 ? 'like' : 'likes' }</Text> : null }
        { commentCount && commentCount > 0 ?
          <>
            <View>
              <Text style={ {
                fontWeight: '600',
                marginVertical: 5
              } }>{ user.username }
                <Text style={ {
                  fontWeight: '600'
                } }>
                </Text>{ postText }</Text>
            </View>
            <TouchableOpacity
              onPress={ () => {
              } }
              style={ styles.btnViewCmt }>
              <Text style={ {
                color: '#666'
              } }>
                View all { commentCount } comments
              </Text>
            </TouchableOpacity>
          </> : null
        }
        <TouchableOpacity
          activeOpacity={ 1 }
          style={ styles.commentInputWrapper }>
          <View style={ { flexDirection: 'row', alignItems: 'center' } }>
            <Image source={ { uri: user.pictureUrl as string } }
                   style={ styles.commentAvatar } />
            <Text style={ {
              color: '#666',
              marginHorizontal: 10
            } }>Add a comment...</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 10
  },
  user: {
    flexDirection: 'row'
  },
  info: {
    marginLeft: 10
  },
  container: {
    position: 'relative'
  },
  reactionsWrapper: {
    padding: 10
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lReactions: {
    flexDirection: 'row',
    width: 30.3 * 3 + 15,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btnViewCmt: {
    marginVertical: 5
  },
  commentInputWrapper: {
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  commentIconsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 14.3 * 3 + 15
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 24
  }
})
