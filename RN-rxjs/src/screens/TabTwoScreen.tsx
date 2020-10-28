import React from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import { map } from 'rxjs/operators'
import { Text } from '../components/Themed'
import withObservableStream from '../streams'
import fetchOrder$ from '../streams/orders'
import { tabTwoScreenStyles } from './styles/TabTwoScreen.styles'
import { Order } from '../components/Order'
import { OrderType } from '../models'
import OrderInfo from '../components/OrderInfo'

type TabTwoScreenProps = {
  orders: Array<OrderType>
  name: string
}

const TabTwoScreen = ({ orders, name }: TabTwoScreenProps) => {
  const renderItem = ({ item }) => <Order order={item} />

  return (
    <SafeAreaView style={tabTwoScreenStyles.container}>
      <Text style={tabTwoScreenStyles.title}>{name}</Text>
      <OrderInfo orders={orders} />
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item._key}
      />
    </SafeAreaView>
  )
}

// Defined actions for order subject
export const orderActions = {}

export default withObservableStream(
  fetchOrder$.pipe(
    map((orders) => ({
      orders,
    }))
  ),
  orderActions,
  {
    orders: [],
  }
)(TabTwoScreen)
