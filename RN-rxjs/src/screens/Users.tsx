import React, { FC, useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import firebaseApp from '../services'
import { messagesStyles } from './styles/Messages.styles'
import { Screen } from '../components/screen/screen'
import { color } from '../themes'
import { User } from '../components/User'
import usersStore from '../store/users'
import { User as UserType } from '../models'

const Users: FC = () => {
  const [users, setUsers] = useState<UserType[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    const sub = usersStore.getStore().subscribe((it) => {
      setUsers(it.users)
    })
    usersStore.init()

    return () => sub.unsubscribe()
  }, [])

  const handleLogout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        console.log('Sign-out successful.')
        navigation.navigate('Root')
      })
      .catch((err) => {
        Alert.alert('Error', err.message)
      })
  }

  return (
    <View style={messagesStyles.container}>
      <Screen
        style={messagesStyles.screen}
        preset="fixed"
        backgroundColor={color.transparent}
      >
        <Text style={messagesStyles.title}>Chat App</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <User
              active={item.state === 'online'}
              id={item.id}
              name={item.email}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </Screen>
    </View>
  )
}

export default Users
