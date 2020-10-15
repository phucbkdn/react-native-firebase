import firebase from 'firebase/app'
import { combineLatest, of } from 'rxjs'
import { mergeMap, map, filter } from 'rxjs/operators'

// Optionally import the services that you want to use
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import { collectionData } from 'rxfire/firestore'
import { authState } from 'rxfire/auth'

// Initialize Firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyBqEZbrQK2U4U5LGSXC-sBAOd_BJTPTFlU',
  authDomain: 'products-management-db74a.firebaseapp.com',
  databaseURL: 'https://products-management-db74a.firebaseio.com',
  projectId: 'products-management-db74a',
  storageBucket: 'products-management-db74a.appspot.com',
  messagingSenderId: '252959242991',
  appId: '1:252959242991:web:648745a45f86b5efb5f91a',
}

const firebaseApp = firebase.apps[0] || firebase.initializeApp(firebaseConfig)

export const lazyMessages = (collectionName: string, query: string) => {
  const fireStore$ = of(firebaseApp.firestore())
  const user$ = authState(firebaseApp.auth()).pipe(filter((user) => !!user))
  return combineLatest([fireStore$, user$]).pipe(
    mergeMap(([storeData, user]) => {
      const ref = storeData
        .collection(collectionName)
        .where('thread', 'in', [
          `${user.email}-${query}`,
          `${query}-${user.email}`,
        ])
        .orderBy('created', 'asc')
      return collectionData(ref, 'id')
    })
  )
}

export const addMessage = (collectionName: string, data: any) => {
  const user$ = authState(firebaseApp.auth()).pipe(filter((user) => !!user))
  const fireStore$ = of(firebaseApp.firestore())
  return combineLatest(fireStore$, user$).pipe(
    map(([storeData, user]) => {
      const dataUpdate = {
        ...data,
        user: user.email,
        thread: `${user.email}-${data.sendTo}`,
      }

      return storeData.collection(collectionName).add(dataUpdate)
    })
  )
}

export default firebaseApp
