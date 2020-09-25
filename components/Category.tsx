import React, { FC, memo } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageResizeMode,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { categoryStyles } from './styles/category.styles'
import { NavigationType } from '../navigation'
import categoriesStore from '../streams/categories'

const resizeMode: ImageResizeMode = 'contain'

interface Props {
  name: string,
  price: number,
  count: number,
  id: string,
}

export const Category: FC<Props> = memo(({ name, price, count, id }: Props) => {
  const navigation = useNavigation<NavigationProp<NavigationType>>()
  const navigateRecipeScreen = () => {
    navigation.navigate('TableOrder', {
      id: name
    })
  }

  return (
    <View style={categoryStyles.wrapper}>
      <Text style={categoryStyles.textStyle}>{`${name} (${price})`}</Text>
      <TouchableOpacity
        onPress={() => categoriesStore.decr(id)}
        disabled={count <= 0}
        style={categoryStyles.button}
      >
        <Text>-</Text>
      </TouchableOpacity>
      <Text style={categoryStyles.count}>{count}</Text>
      <TouchableOpacity
        onPress={() => categoriesStore.incr(id)}
        style={categoryStyles.button}
      >
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  )
})

Category.defaultProps = {
  name: '',
  price: 0,
  count: 0,
}
