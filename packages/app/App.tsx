import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ApolloProvider } from '@apollo/client'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import client from './lib/apollo'
import Navigation from './navigation'
import useColorScheme from '@hooks/useColorScheme'
import useCachedResources from '@hooks/useCachedResources'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <ApolloProvider client={ client }>
        <SafeAreaProvider>
          <Navigation colorScheme={ colorScheme }/>
          <StatusBar/>
        </SafeAreaProvider>
      </ApolloProvider>
    )
  }
}
