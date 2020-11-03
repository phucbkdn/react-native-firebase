import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../models'

export type NavigationType = {
  TableOrder: {
    id: string
  }
  BottomTabNavigator: {}
  recipes: {
    name: string
  }
  Messages: {
    id: string
    name: string
  }
}

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Messages'>
export type NavigationProps = {
  navigation: ProfileScreenNavigationProp
}
