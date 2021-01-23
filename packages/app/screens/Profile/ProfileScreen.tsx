import * as React from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Text, View } from '@components/Themed'
import { AppImage } from '@ui/AppImage'
import { TabBarIcon } from '@ui/AppIcon'
import { AccountGallery } from '@components/profile/AccountGallery'
import { useQuery } from '@apollo/client'
import {
  GetUserInfoDocument,
  IGetUserInfoQuery,
  IViewUserPhotoQuery,
  ViewUserPhotoDocument
} from '@instagram/common'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TabProfileParamList } from '@type/navigation'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@constants/demens'
import { ExtraInfo } from '@components/profile/ExtraInfo'


export default function ProfileScreen() {
  const {params} = useRoute<RouteProp<TabProfileParamList, 'TabProfileScreen'>>()
  const {
    data: userData,loading
  } = useQuery<IGetUserInfoQuery>(GetUserInfoDocument, {variables: {username: (params.queryUserName as string)}})
  const {data: dataPhoto,loading:photoLoading} = useQuery<IViewUserPhotoQuery>(ViewUserPhotoDocument, {variables: {username: (params.queryUserName as string)}})
  return (
    <SafeAreaView style={ styles.container }>
      <TouchableOpacity
        activeOpacity={ 1 }
        onPress={ () => {
        } }>
        <View>
          { loading ? <ActivityIndicator/> :
            <View style={ styles.infoWrapper }>
              <TouchableOpacity style={ styles.avatarWrapper }>
                <AppImage uri={ userData?.getUserInfo.pictureUrl as string }
                          style={ styles.mainAvatar }
                />
              </TouchableOpacity>
              <View style={ styles.extraInfoWrapper }>
                <ExtraInfo info={ userData?.getUserInfo.photoCount } textInfo={ 'Posts' }/>
                <ExtraInfo info={ userData?.getUserInfo.followerCount } textInfo={ 'Followers' }/>
                <ExtraInfo info={ userData?.getUserInfo.followingCount } textInfo={ 'Following' }/>
              </View>
            </View>
          }
          <View style={ styles.bioWrapper }>
            <Text style={ {
              fontWeight: '500',
            } }>{ userData?.getUserInfo.fullName }</Text>
          </View>
          { userData?.getUserInfo.isCurrentUser &&
          <TouchableOpacity
            onPress={ () => {
            } }
            activeOpacity={ 0.6 }
            style={ styles.btnEditProfile }>
            <Text style={ {
              fontWeight: '500'
            } }>Edit Profile</Text>
          </TouchableOpacity> }
        </View>
        <View style={ styles.galleryContainer }>
          <View style={ styles.galleryTabWrapper }>
            <TouchableOpacity
              activeOpacity={ 0.8 }
              onPress={ () => {
              } }
              style={ styles.galleryTab }>
              <TabBarIcon name="grid" size={ 24 } color="#333"/>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={ 0.8 }
              onPress={ () => {
              } }
              style={ styles.galleryTab }>
              <TabBarIcon name="tooltip-image-outline" size={ 24 } color="#333"/>
            </TouchableOpacity>
          </View>
          { photoLoading ? <ActivityIndicator/> :
            <ScrollView
              onScrollEndDrag={ () => {
              } }
              bounces={ false }
              horizontal
              showsHorizontalScrollIndicator={ false }
            >
              <TouchableOpacity
                style={ {
                  marginTop: 5,
                  flexDirection: 'row'
                } }
                activeOpacity={ 1 }
              >
                <AccountGallery
                  photos={ dataPhoto?.viewUserPhoto as [] }
                />
              </TouchableOpacity>
            </ScrollView>
          }
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f8fc',
    width: '100%',
    height: SCREEN_HEIGHT
  },
  mainAvatar: {
    height: 80,
    width: 80,
    borderRadius: 80
  },
  extraInfoWrapper: {
    flexDirection: 'row',
    width: SCREEN_WIDTH - 30 - 80,
    justifyContent: 'space-evenly'
  },
  avatarWrapper: {
    position: 'relative'
  },
  infoWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  galleryTab: {
    width: SCREEN_WIDTH * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44
  },
  galleryContainer: {
    width: '100%'
  },
  galleryTabWrapper: {
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
    borderTopColor: '#ddd',
    borderTopWidth: 0.5
  },
  bioWrapper: {
    paddingHorizontal: 15,
    marginVertical: 10
  },
  btnEditProfile: {
    marginVertical: 10,
    width: SCREEN_WIDTH - 30,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 3,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
