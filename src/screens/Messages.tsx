// Libs
import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, TextInput, FlatList } from 'react-native';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
import { lazyMessages, addMessage } from '../services';
import firebaseApp from '../services/firebaseAccess';
import { filter } from 'rxjs/operators';
import { authState } from 'rxfire/auth';
import { useRoute } from '@react-navigation/native';

// Helpers
import { color } from '../themes';
import { messagesStyles } from './styles/Messages.styles';
import { User, MessageType } from '../models';

// Components
import { Screen } from '../components/screen/screen';
import Message from '../components/Message';
import { View, useThemeColor } from '../components/Themed';
import { ProfileScreenRouteProp } from '../navigation';

const Messages = () => {
  const { params } = useRoute<ProfileScreenRouteProp>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState<string>('');
  const [user, setUser] = useState<User | undefined>();

  const flatList = useRef() as React.RefObject<FlatList<MessageType>>;

  useEffect(() => {
    const sub = lazyMessages('messages', params.name).subscribe(
      (list: MessageType[]) => {
        setMessages(list);
      }
    );

    const auth = firebaseApp.auth();
    const loggedIn$ = authState(auth).pipe(filter((user) => !!user));
    loggedIn$.subscribe((userData) => {
      setUser(userData);
    });

    return () => sub.unsubscribe();
  }, []);

  const handleChangeText = (value: string) => {
    setMessage(value);
  };

  const sendMessage = () => {
    const data = {
      message,
      created: moment().toISOString(),
      time: moment().format('hh:mm'),
      sendTo: params.name,
    };
    setMessage('');
    addMessage('messages', data).subscribe();
  };

  const renderItem = ({ item }) => (
    <Message
      isPrimary={item.user === user?.email}
      message={item.message}
      time={item.time}
      key={item.id}
    />
  );

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
            flatList.current?.scrollToEnd({ animated: true })
          }
          onLayout={() => flatList.current?.scrollToEnd()}
          data={messages}
          initialNumToRender={16}
          renderItem={renderItem}
        />
        <View style={messagesStyles.textWrapper}>
          <TextInput
            style={messagesStyles.input}
            onChangeText={handleChangeText}
            keyboardType="ascii-capable"
            value={message}
          />
          <TouchableOpacity onPress={sendMessage} disabled={!message}>
            <FontAwesome
              size={30}
              style={{ marginBottom: -3 }}
              name="send"
              color={useThemeColor({}, 'text')}
            />
          </TouchableOpacity>
        </View>
      </Screen>
    </View>
  );
};

export default Messages;
