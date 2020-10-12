import React, { FC, memo } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { userStyles } from './styles/user.stylers'
import { NavigationType } from '../navigation'
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  name: string,
  active: Boolean,
  id: string,
}

export const User: FC<Props> = memo(({ name, active, id }: Props) => {
  const navigation = useNavigation<NavigationProp<NavigationType>>()
  const navigateRecipeScreen = () => {
    navigation.navigate('Messages', {
      id: id,
      name: name,
    })
  }

  return (
    <View style={userStyles.wrapper}>
      <TouchableOpacity
        onPress={navigateRecipeScreen}
        key={id}
      >
        <FontAwesome size={30} style={{ marginBottom: -3, color: active ? 'green' : 'gray' }} name="user" />
        <Text style={userStyles.textStyle}>{name}</Text>
      </TouchableOpacity>
    </View>
  )
})

User.defaultProps = {
  name: '',
  active: false,
  id: '',
}