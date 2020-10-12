import { StackNavigationProp } from '@react-navigation/stack'
export type RootParamList = {
  primaryStack: undefined
  recipe: undefined
  recipes: undefined
  login: undefined
}

export type NavigationType = {
  /**
   * recipe id
   */
  TableOrder: {
    id: string
  }
  BottomTabNavigator: {}
  recipes: {
    name: string
  }
}

type ProfileScreenNavigationProp = StackNavigationProp<RootParamList, 'login'>

export type NavigationProps = {
  navigation: ProfileScreenNavigationProp
}
