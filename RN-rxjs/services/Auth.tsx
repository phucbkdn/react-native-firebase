import React, { useEffect, useState, FC } from 'react'
import { authState } from 'rxfire/auth'
import Indicator from '../components/IndicatorBackdrop'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { NavigationType } from '../navigation/navigation.props'
import firebaseApp from './index'

const Auth: FC = ({ children }) => {
  const [waitAuthCheck, setWaitAuthCheck] = useState<boolean>(true)
  const navigation = useNavigation<NavigationProp<NavigationType>>()

  useEffect(() => {
    const auth = firebaseApp.auth()
    authState(auth).subscribe(user => {
      setWaitAuthCheck(false)
      if (!!user) {
          navigation.navigate('primaryStack', {
            name: 'name'
          })
      }
    })
  }, [])

  return waitAuthCheck ? <Indicator /> : <>{children}</>;
}

export default Auth
