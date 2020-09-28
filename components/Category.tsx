import React, { FC, memo } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  ImageResizeMode,
} from 'react-native'
import { categoryStyles } from './styles/category.styles'
import { CategoryModel } from '../models'

const resizeMode: ImageResizeMode = 'contain'

interface Props extends CategoryModel{
  id: string,
  incrValue: Function,
  decrValue: Function,
}

export const Category: FC<Props> = memo(({ name, price, count, id, incrValue, decrValue }: Props) => (
  <View style={categoryStyles.wrapper}>
    <Text style={categoryStyles.textStyle}>{`${name} (${price})`}</Text>
    <TouchableOpacity
      onPress={() => incrValue(id)}
      disabled={count <= 0}
      style={categoryStyles.button}
    >
      <Text>-</Text>
    </TouchableOpacity>
    <Text style={categoryStyles.count}>{count}</Text>
    <TouchableOpacity
      onPress={() => decrValue(id)}
      style={categoryStyles.button}
    >
      <Text>+</Text>
    </TouchableOpacity>
  </View>
))

Category.defaultProps = {
  name: '',
  price: 0,
  count: 0,
}
