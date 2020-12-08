import React, { FC } from 'react'
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppImage } from '@ui/AppImage'
import { Text } from '@components/Themed'
import { AppHeaderIcon } from '@ui/AppHeaderIcon'
import { HeaderButtons } from 'react-navigation-header-buttons'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { SCREEN_WIDTH } from '@constants/demens'
import { TabBarIcon } from '@components/ui/AppIcon'
import { ICON_SIZE, ICONS } from '@constants/icons'

type PropsType = {
  posts: Array<any>
}

export const HomePost: FC<PropsType> = ({posts}) => {
  const {owner, ...post} = posts[0]
  return (
    <View style={ styles.wrapper }>
      <View style={ styles.header }>
        <View style={ styles.user }>
          <AppImage uri={ owner.uri }/>
          <View style={ styles.info }>
            <Text style={ {fontWeight: 'bold', fontSize: 16} }>{ owner.ownerName }</Text>
            <Text>{ owner.place }</Text>
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
              width: post.uri.width < post.uri.height ? post.uri.width * SCREEN_WIDTH / post.uri.height : SCREEN_WIDTH,
              height: post.uri.width > post.uri.height ? post.uri.height * SCREEN_WIDTH / post.uri.width : SCREEN_WIDTH
            } }
            source={ {uri: post.uri} }
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
              <TabBarIcon name={ ICONS.like } color={ 'black' }/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => {
            } }>
              <FontAwesome5 name={ ICONS.comment } size={ ICON_SIZE.big } color="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => {
            } }>
              <FontAwesome5 name={ ICONS.direct } size={ ICON_SIZE.big } color="black"/>
            </TouchableOpacity>
          </View>
        </View>
        { post.likeCount  && <Text style={ {
          fontWeight: 'bold',
          marginVertical: 5,
        } }>{ post.likeCount >= 1000 ?
          (Math.round(post.likeCount / 1000) + 'k')
          : post.likeCount } { post.likeCount < 2 ? 'like' : 'likes' }</Text> }
        { post.comments.length > 0 &&
        <>
          <View>
            <Text style={ {
              fontWeight: '600',
              marginVertical: 5,
            } }>dsadsa <Text style={ {
              fontWeight: '400'
            } }>dasdas
            </Text>dsadas</Text>
          </View>
          <TouchableOpacity
            onPress={ () => {
            } }
            style={ styles.btnViewCmt }>
            <Text style={ {
              color: '#666',
            } }>
              View all 8321 comments
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
            <Image source={ {uri: post.uri} }
                   style={ styles.commentAvatar }/>
            <Text style={ {
              color: '#666',
              marginHorizontal: 10
            } }>Add a comment...</Text>
          </View>
          <View style={ styles.commentIconsWrapper }>
            <TouchableOpacity onPress={ () => {

            } }>
              <Text style={ {
                fontSize: 10
              } }>❤</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => {

            } }>
              <Text style={ {
                fontSize: 10
              } }>🙌</Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
        <View style={ {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5
        } }>
          <Text style={ {
            fontSize: 12,
            color: '#666'
          } }>dasdsa</Text>
          <Text style={ {
            fontSize: 12,
            color: '#666'
          } }> • </Text>
        </View>
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
