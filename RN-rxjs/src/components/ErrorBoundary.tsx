import React, { Component } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { errorStyles } from './styles/errorBoundary.styles'
import { logout } from '../services'

export default class ErrorBoundary extends Component {
  state = {
    error: false,
  }

  static getDerivedStateFromError(error) {
    return { error: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error
  }

  handleBackToSignIn = async () => {
    await logout()
  }

  render() {
    if (this.state.error) {
      return (
        <SafeAreaView style={errorStyles.safeAreaView}>
          <View style={errorStyles.container}>
            <Text style={errorStyles.text}>
              <MaterialIcons name="error-outline" size={35} color="black" />
            </Text>
            <Text style={errorStyles.title}>Oops, Something Went Wrong</Text>
            <Text style={errorStyles.description}>
              The app ran into a problem and could not continue. We apologise
              for any inconvenience this has caused! Press the button below to
              restart the app and sign back in. Please contact us if this issue
              persists.
            </Text>
            <View style={errorStyles.btnWrapper}>
              <TouchableOpacity
                style={errorStyles.btn}
                onPress={() => this.handleBackToSignIn()}
              >
                <Text>Back to Sign In Screen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )
    }

    return this.props.children
  }
}
