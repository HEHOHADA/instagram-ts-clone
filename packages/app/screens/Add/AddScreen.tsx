import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera'
import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Text, View } from '@components/Themed'


export default function AddScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>()
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean>()
  const camera = useRef<Camera | null>(null)
  const [image, setImage] = useState<string | null>(null)
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync()
      setHasCameraPermission(cameraStatus.status === 'granted')
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted')
    })()
  }, [])

  const takePicture = async () => {
    if (camera.current) {
      const data = await camera.current.takePictureAsync()
      setImage(data.uri)
    }
  }

  if (!hasCameraPermission) {
    return <View><Text>No</Text></View>
  }
  if (!hasGalleryPermission) {
    return <View><Text>No</Text></View>
  }
  return (
    <View style={ {flex: 1} }>
      <Camera
        style={ {flex: 1, width: '100%'} }
        ref={ (r) => {
          camera.current = r
        } }
      >
        <View
          style={ {
            flex: 1,
            width: '100%',
            backgroundColor: 'transparent',
            flexDirection: 'row'
          } }
        >
          <View
            style={ {
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              flex: 1,
              width: '100%',
              padding: 20,
              justifyContent: 'space-between'
            } }
          >
            <View
              style={ {
                alignSelf: 'center',
                flex: 1,
                alignItems: 'center'
              } }
            >
              <TouchableOpacity
                onPress={ takePicture }
                style={ {
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: '#fff'
                } }
              ><Text>TAKE</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Camera>
      {/*<Camera*/ }
      {/*  ref={ camera }*/ }
      {/*  style={ styles.fixedRatio }*/ }
      {/*  type={ Camera.Constants.Type.front }*/ }
      {/*  ratio={ '1:1' }/>*/ }

      {/*<Button*/ }
      {/*  title="Flip Image"*/ }
      {/*  onPress={ () => {*/ }

      {/*  } }>*/ }
      {/*</Button>*/ }
      {/*<Button title="Take Picture" onPress={ takePicture }/>*/ }
      {/*<Button title="Pick Image From Gallery" onPress={ () => {*/ }
      {/*} }/>*/ }
      {/*<Button title="Save" onPress={ () => {*/ }
      {/*} }/>*/ }
      {/*{ image && <AppImage uri={ image } style={ {flex: 1} }/> }*/ }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  }
})
