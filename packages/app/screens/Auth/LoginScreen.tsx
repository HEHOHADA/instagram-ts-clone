import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

import {
  ILoginMutation,
  ILoginMutationVariables,
  IMeQuery,
  LoginDocument,
  MeDocument
} from '@instagram/common'

import { Text } from '@components/Themed'
import { ICON_SIZE } from '@constants/icons'
import { useMutation } from '@apollo/client'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@constants/demens'
import { setToken } from '../../lib/token'

export default function LoginScreen() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [hidePassword, setHidePassword] = useState(true)
  const [login] = useMutation<ILoginMutation, ILoginMutationVariables>(LoginDocument)
  const {navigate} = useNavigation()
  const submitLoginHandler = useCallback(async (data) => {
    try {
      const response = await login({
        variables: {
          data
        }, update: (cache, {data}) => {
          if (!data || !data.login) {
            return
          }
          cache.writeQuery<IMeQuery>({
            query: MeDocument,
            data: {
              me: data.login.user
            }
          })
        }

      })
      if (response && response.data) {
        setToken(response.data.login.accessToken)
        navigate('Root', {screen: 'TabHomeScreen'})
      }
    } catch (e) {
      console.log(e)
    }
  }, [])
  return (
    <SafeAreaView style={ styles.container }>
      <View style={ styles.centerContainer }>
        <View>
          <Image
            resizeMode="contain"
            style={ {
              height: 64,
              overflow: 'hidden'
            } }
            source={ require('../../assets/images/logo.png') }/>
        </View>
        <View style={ styles.form }>
          <View style={ styles.textInputWrapper }>
            <TextInput autoCapitalize="none" value={ username } onChangeText={ setUsername }
                       placeholder="Username, email or phone number"
                       style={ styles.input }/>
          </View>
          <View style={ styles.textInputWrapper }>
            <TextInput autoCapitalize="none"
                       secureTextEntry={ hidePassword }
                       value={ password } onChangeText={ setPassword }
                       placeholder="Password"
                       style={ styles.input }/>
            <TouchableOpacity
              style={ styles.hidePasswordIcon }
              onPress={ () => setHidePassword(prevState => !prevState) }
            >
              { hidePassword ? (
                <FontAwesome5 name="eye" size={ ICON_SIZE.small }
                              color="#333"/>
              ) : (
                <FontAwesome5 name="eye-slash" color="#318bfb"
                              size={ ICON_SIZE.small }/>
              )
              }
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={ () => submitLoginHandler({password, email: username}) }
            activeOpacity={ 0.6 } style={ {
            ...styles.btnLogin
          } }>
            <Text style={ {
              fontSize: 16,
              color: '#fff',
              fontWeight: '500'
            } }>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.otherOptionsWrapper }>
          <TouchableOpacity
            onPress={ () => navigate('TabForgotPassword') }
            style={ styles.forgot }
            activeOpacity={ 1 }>
            <Text style={ {
              textAlign: 'center',
              fontSize: 12,
              fontWeight: '600'
            } }>
              <Text style={ {
                fontWeight: '500',
                color: '#333'
              } }>Did your forget your login information?
              </Text> Get helping to login.</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={ () => {
        } }
        activeOpacity={ 1 }
        style={ styles.register }>
        <Text style={ {
          textAlign: 'center',
          fontSize: 12,
          fontWeight: '600'
        } }>
          <Text style={ {
            fontWeight: '500',
            color: '#333'
          } }>Don't have account?
          </Text> Register now.</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  centerContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    width: SCREEN_WIDTH * 0.9,
  },
  textInputWrapper: {
    position: 'relative',
    width: '100%',
    height: 44,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 7.5
  },
  hidePasswordIcon: {
    position: 'absolute',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    right: 5,
    top: (44 - 30) / 2
  },
  btnLogin: {
    marginTop: 7.5,
    width: '100%',
    height: 44,
    borderRadius: 5,
    backgroundColor: '#318bfb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15
  },
  forgot: {
    width: SCREEN_WIDTH * 0.8,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  otherOptionsWrapper: {
    width: SCREEN_WIDTH * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  register: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1
  }
})
