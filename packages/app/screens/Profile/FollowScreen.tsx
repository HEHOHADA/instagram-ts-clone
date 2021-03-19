import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TabProfileParams } from '@type/navigation'
import { InputIcon } from '@components/shared/InputIcon'

export default function FollowScreen() {
  const {params} = useRoute<RouteProp<TabProfileParams, 'FollowScreen'>>()
  const [search, setSearch] = useState('')
  console.log(params)
  return (
    <View style={ styles.container }>
      <InputIcon value={ search } onChangeText={ setSearch }/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
