import * as React from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from '@components/Themed'
import { AppImage } from '@ui/AppImage'


export default function ProfileScreen() {
  return (
    <SafeAreaView style={ styles.container }>
      <View style={ styles.headerContainer }>
        <View>
          <AppImage uri={ '' }/>
        </View>
        <View>
          <Text>number</Text>
          <Text>followers</Text>
        </View>
        <TouchableOpacity><View>
          <Text>number</Text>
          <Text>followers</Text>
        </View></TouchableOpacity>
        <TouchableOpacity><View>
          <Text>number</Text>
          <Text>followers</Text>
        </View></TouchableOpacity>
      </View>
      <View>
        <View>
          <Text>User Info</Text>
        </View>
      </View>

      <View style={ styles.userButtons }>
        <Text>buttons</Text>
      </View>

      <View style={ styles.contentContainer }>
        <Text>Photos</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {},
  userButtons: {},
  contentContainer: {}
})
