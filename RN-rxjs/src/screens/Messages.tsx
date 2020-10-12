// Libs
import { StackScreenProps } from '@react-navigation/stack'
import React, { useState, useEffect, useRef } from 'react'
import { Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native'
import moment from 'moment'
import { FontAwesome } from '@expo/vector-icons';
import { connect } from '../state/RXState'
import {  counterActions } from '../reducers/categories'
import firebaseApp from '../services'
import { list } from 'rxfire/database'
import { map, filter } from 'rxjs/operators'
import { authState } from 'rxfire/auth'
import { useRoute } from '@react-navigation/native'

// Helpers
import { CategoryModel } from '../models'
import { color } from '../themes'
import { messagesStyles } from './styles/Messages.styles'
import { RootStackParamList } from '../types'
import { User, MessageType } from '../models'

// Components
import { Screen } from '../components/screen/screen'
import Message from '../components/Message'
import Users from './Users';

interface TableOrderModel {
  categories: Array<CategoryModel>,
  navigation: StackScreenProps<RootStackParamList, 'NotFound'>,
  increment: Function,
  decrement: Function,
  discountChange: Function,
  discount: number,
}

const Messages = ({}: TableOrderModel) => {
  const { params } = useRoute()
  const [messages, setMessages] = useState<MessageType[]>([])
  const [message, setMessage] = useState<string>('')
  const [user, setUser] = useState<User>({
    uid: '',
    email: ''
  })

  const flatList = useRef<React.RefObject<FlatList<never>>>()

  useEffect(() => {
    const ref = firebaseApp.database().ref('messages')
    list(ref)
    .pipe(
      map(changes => changes.map(c => {
        return { id: c.snapshot.key, ...c.snapshot.val() }
      }))
    )
    .subscribe((list: MessageType[]) => {
      setMessages(list)
    })

    const auth = firebaseApp.auth()
    const loggedIn$ = authState(auth).pipe(filter(user => !!user));
    loggedIn$.subscribe(user => { setUser(user) });

  }, [])

  const handleChangeText = (value: string) => {
    setMessage(value)
  }

  const sendMessage = () => {
    const ref = firebaseApp.database().ref('messages')
    const data = {
      message,
      created: moment().format('DD-MM-YYYY'),
      time: moment().format('hh:mm'),
      user: user.email
    }
    ref.push(data);
    setMessage('')
  }

  return (
    <View style={messagesStyles.container}>
      <Screen
        style={messagesStyles.screen}
        preset="fixed"
        backgroundColor={color.transparent}
      >
      <Text style={messagesStyles.title}>{params.name}</Text>
      <FlatList
        ref={flatList}
        onContentSizeChange={() => flatList.current.scrollToEnd({animated: true})}
        onLayout={() => flatList.current.scrollToEnd({animated: true})}
        data={messages}
        renderItem={({ item }) =>
        (<Message isPrimary={item.user === user.email} key={item.id} message={item.message} time={item.time} />)}
        keyExtractor={item => item.id}
      />
        <View style={messagesStyles.textWrapper}>
            <TextInput
              style={messagesStyles.input}
              onChangeText={handleChangeText}
              keyboardType="ascii-capable"
              value={message}
            />
            <TouchableOpacity onPress={sendMessage}>
              <FontAwesome size={30} style={{ marginBottom: -3 }} name="send" />
            </TouchableOpacity>
          </View>
        </Screen>
    </View>
  );
}

export default connect(({ counter = {} }) => ({ categories: counter ? counter.categories : [], discount: counter.discount }), counterActions)(Messages)
