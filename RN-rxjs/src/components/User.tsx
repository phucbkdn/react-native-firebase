import React, { FC, memo } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import { userStyles } from './styles/user.stylers'
import { NavigationType } from '../navigation'
import usersStore from '../store/users'

interface Props {
  name: string
  active: Boolean
  id: string
}

export const User: FC<Props> = memo(({ name, active, id }: Props) => {
  const navigation = useNavigation<NavigationProp<NavigationType>>()
  const navigateRecipeScreen = () => {
    usersStore.selectUser(name)
    navigation.navigate('Messages', {
      id: id,
      name: name,
    })
  }

  return (
    <View>
      <TouchableOpacity
        style={userStyles.wrapper}
        onPress={navigateRecipeScreen}
        key={id}
      >
        <FontAwesome
          size={30}
          style={{ marginBottom: -3, color: active ? 'green' : 'gray' }}
          name="user"
        />
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
