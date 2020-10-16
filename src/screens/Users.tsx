import React, { FC, useState, useEffect, useContext } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Avatar } from 'react-native-elements'
import { usersStyles } from './styles/Users.styles'
import { Screen } from '../components/screen/screen'
import { color } from '../themes'
import { User } from '../components/User'
import usersStore from '../store/users'
import { User as UserType } from '../models'
import { AuthUserContext } from '../provider'

const Users: FC = () => {
  const [users, setUsers] = useState<UserType[]>([])
  const { user } = useContext(AuthUserContext)

  useEffect(() => {
    const sub = usersStore.getStore().subscribe((it) => {
      setUsers(it.users)
    })
    usersStore.init()

    return () => sub.unsubscribe()
  }, [])

  return (
    <View style={usersStyles.container}>
      <Screen
        style={usersStyles.screen}
        preset="fixed"
        backgroundColor={color.transparent}
      >
        <View style={usersStyles.userRow}>
          <View style={usersStyles.userImage}>
            <Avatar
              rounded
              size="large"
              source={{
                uri:
                  user?.photoURL ??
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>{user?.displayName}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              {user?.email}
            </Text>
          </View>
        </View>
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
