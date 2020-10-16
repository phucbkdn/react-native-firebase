import React, { FC, useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ImageResizeMode,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Screen } from '../components/screen/screen'
import { loginStyles } from './styles/Login.styles'
import { images } from '../themes'
import firebase from '../services'
import Indicator from '../components/IndicatorBackdrop'

const resizeMode: ImageResizeMode = 'stretch'

interface AuthForm {
  userName: string
  password: string
}

const Login = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState<boolean>(false)
  const [authForm, setAuthForm] = useState<AuthForm>({
    userName: '',
    password: '',
  })

  const handleChange = (key: string, value: string) => {
    setAuthForm({
      ...authForm,
      [key]: value,
    })
  }

  const loginGoogle = () => {
    setLoading(true)
    firebase
      .auth()
      .signInWithEmailAndPassword(authForm.userName, authForm.password)
      .then(() => {
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        Alert.alert('Error', e.message)
      })
  }

  return (
    <View style={loginStyles.container}>
      {loading && <Indicator />}
      <Screen style={loginStyles.screen} preset="scroll" unsafe>
        <ImageBackground
          resizeMode={resizeMode}
          source={images['bg-image']}
          style={loginStyles.bgImage}
        >
          <Image
            resizeMode={resizeMode}
            source={images.logo}
            style={loginStyles.logo}
          />
          <TextInput
            onChangeText={(value) => handleChange('userName', value)}
            placeholderTextColor="white"
            placeholder="User Name"
            style={loginStyles.input}
            keyboardType="email-address"
          />
          <TextInput
            onChangeText={(value) => handleChange('password', value)}
            placeholderTextColor="white"
            placeholder="Password"
            style={loginStyles.input}
            secureTextEntry
          />
          <TouchableOpacity
            disabled={loading}
            style={loginStyles.button}
            onPress={loginGoogle}
          >
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
