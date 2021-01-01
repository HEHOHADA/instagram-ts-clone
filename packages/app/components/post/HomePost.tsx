import React, { FC } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppImage } from '@ui/AppImage'
import { Text } from '@components/Themed'
import { AppHeaderIcon } from '@ui/AppHeaderIcon'
import { HeaderButtons } from 'react-navigation-header-buttons'
import { FontAwesome5 } from '@expo/vector-icons'
import { SCREEN_WIDTH } from '@constants/demens'
import { TabBarIcon } from '@components/ui/AppIcon'
import { ICON_SIZE, ICONS } from '@constants/icons'
import { IFeedQuery } from '@instagram/common'
import { useNavigation } from '@react-navigation/native'

type PropsType = IFeedQuery['feed']['items'][0]

export const HomePost: FC<PropsType> = ({
                                          user,
                                          commentCount,
                                          postText,
                                          isLiked,
                                          likeCount,
                                          pictureUrl
                                        }) => {

  const {navigate} = useNavigation()
  return (
    <View style={ styles.wrapper }>
      <View style={ styles.header }>
        <View style={ styles.user }>
          <AppImage uri={ user.pictureUrl as string }/>
          <View style={ styles.info }>
            <Text style={ {fontWeight: 'bold', fontSize: 16} }>{ user.username }</Text>
            <Text>{ user.fullName }</Text>
          </View>
        </View>
        <View>
          <HeaderButtons
            HeaderButtonComponent={ AppHeaderIcon }>
            <FontAwesome5 name="ellipsis-v" size={ 20 } color="black" onPress={ () => {
            } }/>
          </HeaderButtons>
        </View>
      </View>
      <View style={ styles.container }>
        <View>
          <Image
            style={ {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH
            } }
            source={ {uri: pictureUrl} }
          />
        </View>
      </View>
      <View style={ styles.reactionsWrapper }>
        <View style={ styles.reactions }>
          <View style={ styles.lReactions }>
            <TouchableOpacity
              onPress={ () => {
              } }
            >
              <TabBarIcon name={ ICONS.like } color={ isLiked ? 'red' : 'black' }/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => {
            } }>
              <FontAwesome5 name={ ICONS.comment } size={ ICON_SIZE.big } color="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => navigate('TabDirect', {screen: 'TabDirectScreen'}) }>
              <FontAwesome5 name={ ICONS.direct } size={ ICON_SIZE.big } color="black"/>
            </TouchableOpacity>
          </View>
        </View>
        { likeCount && <Text style={ {
          fontWeight: 'bold',
          marginVertical: 5,
        } }>{ likeCount >= 1000 ?
          (Math.round(likeCount / 1000) + 'k')
          : likeCount } { likeCount < 2 ? 'like' : 'likes' }</Text> }
        { commentCount && commentCount > 0 &&
        <>
          <View>
            <Text style={ {
              fontWeight: '600',
              marginVertical: 5,
            } }>{ user.username } <Text style={ {
              fontWeight: '600'
            } }>
            </Text>{ postText }</Text>
          </View>
          <TouchableOpacity
            onPress={ () => {
            } }
            style={ styles.btnViewCmt }>
            <Text style={ {
              color: '#666',
            } }>
              View all { commentCount } comments
            </Text>
          </TouchableOpacity>
        </>
        }

        <TouchableOpacity
          onPress={ () => {

          } }
          activeOpacity={ 1 }
          style={ styles.commentInputWrapper }>
          <View style={ {flexDirection: 'row', alignItems: 'center'} }>
            <Image source={ {uri: user.pictureUrl as string} }
                   style={ styles.commentAvatar }/>
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
  },
})
