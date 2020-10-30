import React, { useEffect, useState } from 'react'
import { authState } from 'rxfire/auth'
import moment from 'moment'
import firebaseApp, { auth } from '../services/firebaseAccess'
import { User } from '../models'

export const authStateChange = (
  callback: React.Dispatch<React.SetStateAction<User | null>>
) => {
  const [waitAuthCheck, setWaitAuthCheck] = useState<boolean>(true)
  useEffect(() => {
    const sub = authState(auth).subscribe((user: any) => {
      setWaitAuthCheck(false)
      callback(user)

      if (!!user) {
        const userRef = firebaseApp.database().ref('users/' + user.uid)
        firebaseApp
          .database()
          .ref('.info/connected')
          .on('value', (snapshot) => {
            if (snapshot.val() === false) {
              userRef.set({
                state: 'online',
                last_changed: moment().format(),
                email: user.email,
              })
              return
            }

            userRef
              .onDisconnect()
              .set({
                state: 'offline',
                last_changed: moment().format(),
                email: user.email,
              })
              .then(() => {
                userRef.set({
                  state: 'online',
                  last_changed: moment().format(),
                  email: user.email,
                })
              })
          })
      }
    })
    return () => sub.unsubscribe()
  }, [])
  return [waitAuthCheck]
}
