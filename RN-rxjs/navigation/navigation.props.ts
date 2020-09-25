import { StackNavigationProp } from '@react-navigation/stack'
export type RootParamList = {
  primaryStack: undefined
  recipe: undefined
  recipes: undefined
}

export type NavigationType = {
  /**
   * recipe id
   */
  TableOrder: {
    id: string
  },
  recipes: {
    name: string
  }
}

type ProfileScreenNavigationProp = StackNavigationProp<RootParamList, 'Home'>

export type NavigationProps = {
  navigation: ProfileScreenNavigationProp
}
