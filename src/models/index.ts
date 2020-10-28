export type TableModel = {
  name: string
  active: Boolean
  _key: string
}

export type CategoryModel = {
  name: string
  price: number
  count: number
  id: string
  _key?: string
}

export type OrderType = {
  id: string
  price: number
  _key: string
  created: string
  time: string
}

export type UserState = 'online' | 'offline'

export interface User {
  id: string
  email: string
  last_changed: string
  state: UserState
}

export interface MessageType {
  id: string
  message: string
  time: string
  user: string
}

export type RootStackParamList = {
  primaryStack: undefined
  Root: undefined
  NotFound: undefined
  TableOrder: undefined
  BottomTabNavigator: undefined
  Messages: undefined
  Login: undefined
}

export type BottomTabParamList = {
  TabOne: undefined
  TabTwo: undefined
}

export type TabOneParamList = {
  TabOneScreen: undefined
}

export type TabTwoParamList = {
  TabTwoScreen: undefined
}
