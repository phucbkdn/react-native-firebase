import React, { useContext } from 'react'
import { Text as DefaultText, View as DefaultView } from 'react-native'

import Colors from '../constants/Colors'
import { AuthUserContext } from '../provider'

export const useThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) => {
  const { theme } = useContext(AuthUserContext)
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']

export const Text = (props: TextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export const View = (props: ViewProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}
