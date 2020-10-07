import React, { FC, useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { list } from 'rxfire/database'
import { useNavigation } from '@react-navigation/native'
import { combineLatest } from 'rxjs'
import { map, filter } from 'rxjs/operators'
import { authState } from 'rxfire/auth'
import firebaseApp from '../services'
import { messagesStyles } from './styles/Messages.styles'
import { Screen } from '../components/screen/screen'
import { color } from '../themes'
import { User } from '../components/User'

const Users: FC = () => {
  const [users, setUsers] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    const ref = firebaseApp.database().ref('users')
    const auth = firebaseApp.auth()

    const user$ = authState(auth).pipe(filter(user => !!user))
    const users$ = list(ref)
    .pipe(
      map(changes => changes.map(c => {
        return { id: c.snapshot.key, ...c.snapshot.val() }
      }))
    )
    const subject = combineLatest(users$, user$)
    subject.subscribe(([items, item]) => {
      // Remove current user
      const result = items.filter(t => t.email !== item.email)
      setUsers(result)
    })
  }, [])

  const handleLogout = () => {
    firebaseApp.auth().signOut().then(() => {
      console.log('Sign-out successful.')
      navigation.navigate('Root')
    }).catch(err => {
      console.log(err)
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
          renderItem={({ item }) =>
          (<User active={item.state === 'online'} id={item.id} name={item.email} />)}
          keyExtractor={item => item.id}
        />
      </Screen>
    </View>
  )
}

export default Users
