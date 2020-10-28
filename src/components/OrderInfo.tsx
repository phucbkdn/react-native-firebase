import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { tableOrderStyles } from './styles/orderInfo.styles'
import currencyFormatter from 'currency-formatter'
import { OrderType } from '../models'

interface Props {
  orders: OrderType[]
}

const OrderInfo: FC<Props> = ({ orders }) => {
  let price = orders.reduce(
    (accumulator, current) => accumulator + current.price,
    0
  )

  return (
    <View style={tableOrderStyles.priceWrapper}>
      <Text style={tableOrderStyles.title}>
        Number of Orders: {orders.length}
      </Text>
      <Text style={tableOrderStyles.title}>
        Total Price: {currencyFormatter.format(price, { locale: 'VN' })}
      </Text>
    </View>
  )
}

export default OrderInfo
