import { StackScreenProps } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { RootStackParamList } from '../../types'
import { tableOrderStyles } from './styles/orderInfo.styles'
import currencyFormatter from 'currency-formatter'
import { combineLatest } from 'rxjs'
import withObservableStream from '../streams'
import { createOrder } from '../streams/orders'
import fetchCategory$ from '../streams/categories'
import { CategoryModel } from '../models'
import { orderActions } from '../screens/TabTwoScreen'

interface Props extends CategoryModel{
  id: string,
  _key: string,
}

interface TableOrderModel {
  categories: Array<Props>,
  createOrder: Function,
  navigation: StackScreenProps<RootStackParamList, 'NotFound'>
}

const OrderInfo = ({orders}) => {
  let price = orders.reduce((accumulator, current) => accumulator + current.price, 0);

  return (
    <View style={tableOrderStyles.priceWrapper}>
      <Text style={tableOrderStyles.title}>Number of Orders:  {orders.length}</Text>
      <Text style={tableOrderStyles.title}>Total Price: {currencyFormatter.format(price, { locale: 'VN' })}</Text>
    </View>
  );
}

export default OrderInfo
