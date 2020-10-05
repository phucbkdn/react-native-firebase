import React,  { FC } from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ImageResizeMode
} from 'react-native'
import { Screen } from '../components/screen/screen'
import { loginStyles } from './styles/Login.styles'
import { images } from '../themes'

const resizeMode: ImageResizeMode = 'stretch'

const Login = () => {

  return (
    <View style={loginStyles.container}>
      <Screen
        style={loginStyles.screen}
        preset="scroll"
        unsafe
      >
        <ImageBackground resizeMode={resizeMode} source={images["bg-image"]} style={loginStyles.bgImage}>
          <Image resizeMode={resizeMode} source={images.logo} style={loginStyles.logo}/>
          <TextInput placeholderTextColor='white' placeholder="User Name" style={loginStyles.input} />
          <TextInput placeholderTextColor='white' placeholder="Password" style={loginStyles.input} />
          <TouchableOpacity style={loginStyles.button}>
            <Text style={loginStyles.title}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={loginStyles.button}>
            <Text style={loginStyles.title}>Login with google</Text>
          </TouchableOpacity>
          <View style={loginStyles.linkWrapper}>
            <Text style={loginStyles.link}>Don’t have an account? Sign up</Text>
          </View>
        </ImageBackground>
      </Screen>
    </View>
  )
}

export default Login
