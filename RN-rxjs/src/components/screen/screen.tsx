import React, { FC, memo } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { ScreenProps } from './screen.props'
import { isNonScrolling, offsets, presets } from './screen.presets'

const isIos = Platform.OS === 'ios'

const ScreenWithoutScrolling: FC<ScreenProps> = (props: ScreenProps) => {
  const insets = useSafeArea()
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <StatusBar barStyle={props.statusBar || 'light-content'} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const ScreenWithScrolling: FC<ScreenProps> = memo((props: ScreenProps) => {
  const insets = useSafeArea()
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <StatusBar barStyle={props.statusBar || 'light-content'} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[preset.outer, backgroundStyle, insetStyle]}>
          <ScrollView
            style={[preset.outer, backgroundStyle]}
            contentContainerStyle={[preset.inner, style]}
          >
            {props.children}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
})

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export const Screen: FC<ScreenProps> = (props: ScreenProps) => {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
