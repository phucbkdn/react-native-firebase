import React, { useState, FC, createContext } from 'react'
import { User } from '../models'

export const AuthUserContext = createContext<{
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}>({
  user: null,
  setUser: () => {},
})

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  )
}
