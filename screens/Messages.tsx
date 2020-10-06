// Libs
import { StackScreenProps } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native'
import moment from 'moment'
import { FontAwesome } from '@expo/vector-icons';
import { connect } from '../state/RXState'
import {  counterActions } from '../reducers/categories'
import firebaseApp from '../services'
import { list } from 'rxfire/database'
import { map } from 'rxjs/operators'

// Helpers
import { CategoryModel } from '../models'
import { color } from '../themes'
import { messagesStyles } from './styles/Messages.styles'
import { RootStackParamList } from '../types'

// Components
import { Screen } from '../components/screen/screen'
import Message from '../components/Message'

interface TableOrderModel {
  categories: Array<CategoryModel>,
  navigation: StackScreenProps<RootStackParamList, 'NotFound'>,
  increment: Function,
  decrement: Function,
  discountChange: Function,
  discount: number,
}

const Messages = ({}: TableOrderModel) => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const ref = firebaseApp.database().ref('messages')
    list(ref)
    .pipe(
      map(changes => changes.map(c => {
        return { id: c.snapshot.key, event: c.event, ...c.snapshot.val(), count: 0 }
      }))
    )
    .subscribe(list => {
      setMessages(list)
    })
  }, [])

  const handleChangeText = (value: string) => {
    setMessage(value)
  }

  const sendMessage = () => {
    const ref = firebaseApp.database().ref('messages')
    const data = {
      message,
      created: moment().format('DD-MM-YYYY'),
      time: moment().format('hh:mm')
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
      <Text style={messagesStyles.title}>Chat App</Text>
      <FlatList

        data={messages}
        renderItem={({ item }) =>
        (<Message isPrimary={!!item.isPrimary} key={item.id} message={item.message} time={item.time} />)}
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
