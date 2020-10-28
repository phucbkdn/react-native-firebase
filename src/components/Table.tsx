import React, { FC, memo } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { categoryStyles } from './styles/table.styles'
import { NavigationType } from '../navigation'

interface Props {
  name: string
  active: Boolean
  id: string
}

export const Table: FC<Props> = memo(({ name, active, id }: Props) => {
  const navigation = useNavigation<NavigationProp<NavigationType>>()
  const navigateRecipeScreen = () => {
    navigation.navigate('TableOrder', {
      id: id,
      name: name,
    })
  }

  return (
    <View style={categoryStyles.wrapper}>
      <TouchableOpacity
        onPress={navigateRecipeScreen}
        key={id}
        style={
          active
            ? { ...categoryStyles.button, ...categoryStyles.buttonActive }
            : categoryStyles.button
        }
      >
        <Text style={categoryStyles.textStyle}>{name}</Text>
      </TouchableOpacity>
    </View>
  )
})

Table.defaultProps = {
  name: '',
  active: false,
  id: '',
}
