import React, { useEffect, useState, FC, useRef } from 'react'
import { authState } from 'rxfire/auth'
import Indicator from '../components/IndicatorBackdrop'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { NavigationType } from '../navigation/navigation.props'
import firebaseApp from './index'
import moment from 'moment'

const Auth: FC = ({ children }) => {
  const [waitAuthCheck, setWaitAuthCheck] = useState<boolean>(true)
  const navigation = useNavigation<NavigationProp<NavigationType>>()

  useEffect(() => {
    const auth = firebaseApp.auth()
    authState(auth).subscribe(user => {
      setWaitAuthCheck(false)
      if (!!user) {
        const userRef = firebaseApp.database().ref('users/' + user.uid)
        const isOfflineForDatabase = {
          state: 'offline',
          last_changed: moment().format(),
          email: user.email
        };

        const isOnlineForDatabase = {
          state: 'online',
          last_changed: moment().format(),
          email: user.email
        };
        firebaseApp.database().ref('.info/connected').on('value', snapshot => {
          if(snapshot.val() === false) {
            userRef.set(isOnlineForDatabase)
            return
          }

          userRef.onDisconnect().set(isOfflineForDatabase).then(() => {
            userRef.set(isOnlineForDatabase)
          })
        })
        navigation.navigate('primaryStack', {
          name: 'name'
        })
      }
    })
  }, [])

  return waitAuthCheck ? <Indicator /> : <>{children}</>;
}

export default Auth
