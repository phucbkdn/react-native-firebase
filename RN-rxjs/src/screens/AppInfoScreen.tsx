import React, { FC, useEffect } from 'react'
import { View, Text } from 'react-native'

const AppInfo: FC = () => {
  useEffect(() => {
    throw new Error('Testing error boundary!!')
  }, [])
  return (
    <View>
      <Text>App Info</Text>
    </View>
  )
}

export default AppInfo
