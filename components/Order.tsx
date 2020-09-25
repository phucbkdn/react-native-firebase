import React, { FC, memo } from 'react'
import {
  View,
  Text,
} from 'react-native'
import { orderStyles } from './styles/order.styles'


interface Props {
  order: Object,
}

export const Order: FC<Props> = memo(({ order }: Props) => {
  const value = order
  delete value._key

  return (
    <View style={orderStyles.wrapper}>
      {Object.keys(order).map(item => (
        <View style={orderStyles.textWrapper}>
          <Text style={orderStyles.textStyle}>{item}:</Text>
          <Text style={orderStyles.textValue}>{order[item]}</Text>
        </View>
      ))}
    </View>
  )
})

Order.defaultProps = {
  order: {},
}
