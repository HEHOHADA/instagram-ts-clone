import React, { FC } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { HistoryPhoto } from './HistoryPhoto'
import Colors from 'constants/colors'
import { paddingH } from 'constants/demens'
import { VirtualizedView } from 'components/VirtualizeView'

type PropsType = {
  data: Array<any>
}

export const HistoryItems: FC<PropsType> = ({ data }) => {
  return (
    <VirtualizedView>
      <View style={ styles.historyWrapper }>
        <FlatList
          horizontal
          showsVerticalScrollIndicator={ false }
          keyExtractor={ post => post.id?.toString() || '' }
          data={ data }
          renderItem={ ({ item }) => (<HistoryPhoto { ...item } />) } />
      </View>
    </VirtualizedView>
  )
}

const styles = StyleSheet.create({
  historyWrapper: {
    borderBottomColor: Colors.light.borderColor,
    borderBottomWidth: 1,
    paddingHorizontal: paddingH
  }
})
