import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { RootStackParamList } from '../models'
import { notFoundStyles } from './styles/NotFound.styles'

export default function NotFoundScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  return (
    <View style={notFoundStyles.container}>
      <Text style={notFoundStyles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace('Root')}
        style={notFoundStyles.link}
      >
        <Text style={notFoundStyles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  )
}
