import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { screenHeight, screenWidth, statusBarHeight } from 'constants/demens'
import { Text, View } from 'components/Themed'

export default function ForgotPasswordScreen() {
  const [username, setUsername] = useState<string>('')
  return (
    <SafeAreaView style={ styles.container }>
      <View style={ styles.centerContainer }>
        <View>
          <Text style={ {
            fontSize: 24,
            textAlign: 'center'
          } }>Find Your Account</Text>
          <Text style={ {
            marginVertical: 20,
            color: '#666',
            textAlign: 'center'
          } }>Enter your Instagram username or the email or phone number linked to account.</Text>
        </View>
        <View style={ styles.formWrapper }>
          <View style={ styles.inputWrapper }>
            <TextInput
              value={ username }
              onChangeText={ setUsername }
              autoFocus
              placeholder='Username, email or phone'
              autoCapitalize='none'
              style={ styles.input } />
          </View>
        </View>
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight - statusBarHeight - 44 - 50
  },
  inputWrapper: {
    width: '100%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(242,242,242)',
    borderColor: '#ddd',
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 5
  },
  formWrapper: {
    width: screenWidth * 0.9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15
  }
})
