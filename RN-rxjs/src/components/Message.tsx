import React, { FC, memo } from 'react'
import { Avatar } from 'react-native-elements'
import { View, Text } from './Themed'
import { messageStyles } from './styles/message.styles'

interface MessageType {
  message: string
  time: string
  isPrimary?: boolean
  photoURL?: string
}

const Message: FC<MessageType> = memo(
  ({ message, time, isPrimary, photoURL }: MessageType) => (
    <View
      style={[
        isPrimary
          ? messageStyles.primaryWrapper
          : messageStyles.secondaryWrapper,
      ]}
    >
      <Avatar
        rounded
        size="small"
        source={{
          uri: photoURL,
        }}
      />
      <View
        style={[
          messageStyles.wrapper,
          isPrimary ? messageStyles.primary : messageStyles.secondary,
        ]}
      >
        <Text style={messageStyles.textStyle}>{message}</Text>
        <Text style={messageStyles.time}>{time}</Text>
      </View>
    </View>
  )
)

Message.defaultProps = {
  isPrimary: false,
  photoURL:
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
}

export default Message
