// Libs
import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity, View, TextInput, FlatList } from 'react-native'
import moment from 'moment'
import { FontAwesome } from '@expo/vector-icons'
import firebaseApp, { lazyMessages, addMessage } from '../services'
import { filter } from 'rxjs/operators'
import { authState } from 'rxfire/auth'
import { useRoute } from '@react-navigation/native'

// Helpers
import { color } from '../themes'
import { messagesStyles } from './styles/Messages.styles'
import { User, MessageType } from '../models'

// Components
import { Screen } from '../components/screen/screen'
import Message from '../components/Message'

const Messages = () => {
  const { params } = useRoute()
  const [messages, setMessages] = useState<MessageType[]>([])
  const [message, setMessage] = useState<string>('')
  const [user, setUser] = useState<User>({ uid: '', email: '' })

  const flatList = useRef<React.RefObject<FlatList<never>>>()

  // useEffect(() => {
  //   const ref = firebaseApp.database().ref('messages')
  //   list(ref)
  //   .pipe(
  //     map(changes => changes.map(c => {
  //       return { id: c.snapshot.key, ...c.snapshot.val() }
  //     }))
  //   )
  //   .subscribe((list: MessageType[]) => {
  //     setMessages(list)
  //   })

  //   const auth = firebaseApp.auth()
  //   const loggedIn$ = authState(auth).pipe(filter(user => !!user));
  //   loggedIn$.subscribe(user => { setUser(user) });

  // }, [])

  useEffect(() => {
    const sub = lazyMessages('messages', params.name).subscribe(
      (list: MessageType[]) => {
        setMessages(list)
      }
    )

    const auth = firebaseApp.auth()
    const loggedIn$ = authState(auth).pipe(filter((user) => !!user))
    loggedIn$.subscribe((userData) => {
      setUser(userData)
    })

    return () => sub.unsubscribe()
  }, [])

  const handleChangeText = (value: string) => {
    setMessage(value)
  }

  const sendMessage = () => {
    const data = {
      message,
      created: moment().toISOString(),
      time: moment().format('hh:mm'),
      sendTo: params.name,
    }
    setMessage('')
    addMessage('messages', data).subscribe()
  }

  return (
    <View style={messagesStyles.container}>
      <Screen
        style={messagesStyles.screen}
        preset="fixed"
        backgroundColor={color.transparent}
      >
        <FlatList
          ref={flatList}
          onContentSizeChange={() =>
            flatList.current.scrollToEnd({ animated: true })
          }
          onLayout={() => flatList.current.scrollToEnd({ animated: true })}
          data={messages}
          renderItem={({ item }) => (
            <Message
              isPrimary={item.user === user.email}
              key={item.id}
              message={item.message}
              time={item.time}
            />
          )}
          keyExtractor={(item) => item.id}
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
  )
}

export default Messages
