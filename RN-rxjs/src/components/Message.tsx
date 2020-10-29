import React, { FC, memo } from 'react'
import { View, Text } from 'react-native'
import { messageStyles } from './styles/message.styles'

interface MessageType {
  message: string
  time: string
  isPrimary?: boolean
}

const Message: FC<MessageType> = memo(
  ({ message, time, isPrimary }: MessageType) => (
    <View
      style={[
        isPrimary
          ? messageStyles.primaryWrapper
          : messageStyles.secondaryWrapper,
      ]}
    >
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
}

export default Message
