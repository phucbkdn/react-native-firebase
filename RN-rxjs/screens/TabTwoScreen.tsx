import React from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import { Text } from '../components/Themed'
import withObservableStream from '../streams'
import fetchOrder$ from '../streams/orders'
import { tabTwoScreenStyles } from './styles/TabTwoScreen.styles'
import { combineLatest } from 'rxjs'
import { Order } from '../components/Order'
import { OrderType } from '../models'

type TabTwoScreenProps = {
  orders: Array<OrderType>,
  name: string
}

const TabTwoScreen = ({ orders,  name}: TabTwoScreenProps) => {
  const renderItem = ({ item }) => (
    <Order order={item} />
  );

  return (
    <SafeAreaView style={tabTwoScreenStyles.container}>
      <Text style={tabTwoScreenStyles.title}>{name}</Text>
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item._key}
        />
    </SafeAreaView>
  );
}

// Defined actions for order subject
export const cartActions = {
};

export default withObservableStream(
  combineLatest(
    fetchOrder$,
    (orders) => ({
      orders,
    }),
  ),
  cartActions,
  {
    orders: []
  },
)(TabTwoScreen);
