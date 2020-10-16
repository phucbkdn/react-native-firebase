import { StackNavigationProp } from '@react-navigation/stack'
export type RootParamList = {
  primaryStack: undefined
  recipe: undefined
  recipes: undefined
  login: undefined
}

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

type ProfileScreenNavigationProp = StackNavigationProp<RootParamList, 'login'>

export type NavigationProps = {
  navigation: ProfileScreenNavigationProp
}
