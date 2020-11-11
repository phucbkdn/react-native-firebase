import React, { useState, FC, createContext } from 'react'
import { ColorSchemeName } from 'react-native'
import { User } from '../models'

export const AuthUserContext = createContext<{
  user: User | null
  theme: NonNullable<ColorSchemeName>
  setTheme: React.Dispatch<React.SetStateAction<NonNullable<ColorSchemeName>>>
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}>({
  user: null,
  theme: 'light',
  setTheme: () => {},
  setUser: () => {},
})

export const LocaleContext = createContext<{
  locale: string | undefined
}>({
  locale: 'VN',
})

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [theme, setTheme] = useState<NonNullable<ColorSchemeName>>('light')

  return (
    <AuthUserContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AuthUserContext.Provider>
  )
}
