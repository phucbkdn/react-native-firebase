import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()
const MockedNavigator = ({ component, params = {} }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={component}
          initialParams={params}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MockedNavigator
