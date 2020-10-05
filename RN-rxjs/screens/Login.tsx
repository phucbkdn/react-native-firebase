import React,  { FC, useState } from 'react'
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
import { loginAuth } from '../services'

const resizeMode: ImageResizeMode = 'stretch'

const Login = () => {
  const [authForm, setAuthForm] =  useState({})

  const handleChange = (key: string, value: string) => {
    setAuthForm({
      ...authForm,
      [key]: value,
    })
  }

  const loginGoogle = () => {
    loginAuth(authForm.userName, authForm.password)
  }

  console.log(authForm)
  return (
    <View style={loginStyles.container}>
      <Screen
        style={loginStyles.screen}
        preset="scroll"
        unsafe
      >
        <ImageBackground resizeMode={resizeMode} source={images["bg-image"]} style={loginStyles.bgImage}>
          <Image resizeMode={resizeMode} source={images.logo} style={loginStyles.logo}/>
          <TextInput
            onChangeText={value => handleChange('userName', value)}
            placeholderTextColor='white'
            placeholder="User Name"
            style={loginStyles.input}
          />
          <TextInput
            onChangeText={value => handleChange('password', value)}
            placeholderTextColor='white'
            placeholder="Password"
            style={loginStyles.input}
            secureTextEntry
          />
          <TouchableOpacity style={loginStyles.button} onPress={loginGoogle}>
            <Text style={loginStyles.title}>Login</Text>
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
