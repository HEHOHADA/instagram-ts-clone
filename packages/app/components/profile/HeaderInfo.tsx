import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppImage } from '../ui/AppImage'
import { useNavigate } from '../../hooks/useNavigate'
import { screenWidth } from '../../constants/demens'
import { ExtraInfo } from './ExtraInfo'
import { IUser } from '../../geterated'

const HeaderInfo: FC<Partial<IUser>> = ({
  id,
  photoCount = 0, pictureUrl,
  followingCount = 0, followerCount = 0
}) => {

  const { navigateFollower } = useNavigate()
  return (
    <View style={ styles.infoWrapper }>
      <TouchableOpacity style={ styles.avatarWrapper }>
        <AppImage uri={ pictureUrl }
                  style={ styles.mainAvatar }
        />
      </TouchableOpacity>
      <View style={ styles.extraInfoWrapper }>
        <ExtraInfo info={ photoCount } textInfo={ 'Posts' } />
        <ExtraInfo
          onOpen={ () => navigateFollower(id as string, 'subscriptions') }
          info={ followerCount }
          textInfo={ 'Followers' } />
        <ExtraInfo
          onOpen={ () => navigateFollower(id as string, 'subscribers') }
          info={ followingCount }
          textInfo={ 'Following' } />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  infoWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  avatarWrapper: {
    position: 'relative'
  },
  mainAvatar: {
    height: 80,
    width: 80,
    borderRadius: 80
  },
  extraInfoWrapper: {
    flexDirection: 'row',
    width: screenWidth - 30 - 80,
    justifyContent: 'space-evenly'
  }
})

export default React.memo(HeaderInfo)
