import React, { FC, memo } from 'react'
import { View, Text } from 'react-native'
import { orderStyles } from './styles/order.styles'
import currencyFormatter from 'currency-formatter'
import { OrderType } from '../models'

interface Props {
  order: OrderType
}

export const Order: FC<Props> = memo(({ order }: Props) => (
  <View style={orderStyles.wrapper}>
    <View style={orderStyles.textWrapper}>
      <Text style={orderStyles.textStyle}>Created:</Text>
      <Text style={orderStyles.textValue}>
        {order.created} - {order.time}
      </Text>
    </View>
    <View style={orderStyles.textWrapper}>
      <Text style={orderStyles.textStyle}>Price:</Text>
      <Text style={orderStyles.textValue}>
        {currencyFormatter.format(order.price, { locale: 'VN' })}
      </Text>
    </View>
  </View>
))
