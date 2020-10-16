import firebase from 'firebase/app'
import { combineLatest, of } from 'rxjs'
import { mergeMap, map, filter } from 'rxjs/operators'
import { extname } from 'path'

// Optionally import the services that you want to use
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'

import { collectionData } from 'rxfire/firestore'
import { authState } from 'rxfire/auth'
import { fromTask, getDownloadURL } from 'rxfire/storage'

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

export const db = firebaseApp.firestore()

export const lazyMessages = (collectionName: string, query: string) => {
  const fireStore$ = of(db)
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
  const fireStore$ = of(db)
  return combineLatest([fireStore$, user$]).pipe(
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

export const saveExpoPushToken = (token: string | undefined) => {
  if (!token) {
    return
  }

  db.collection('private')
    .doc(firebaseApp.auth().currentUser?.uid)
    .withConverter(privateConverter)
    .get()
    .then((doc) => {
      if (!doc.exists || !doc.data()?.ExpoPushToken?.includes(token)) {
        db.collection('private')
          .doc(firebaseApp.auth().currentUser?.uid)
          .set({
            ExpoPushToken: [...(doc.data()?.ExpoPushToken || []), token],
          })
      }
    })
}

export const uploadAvatar = (
  file: Blob,
  fileName: string,
  cb: (User: firebase.User | null) => void
) => {
  const storageRef = firebaseApp
    .storage()
    .ref('avatar/' + firebaseApp.auth().currentUser?.uid + extname(fileName))

  const task = storageRef.put(file, { cacheControl: 'public,max-age=86400' })

  fromTask(task).subscribe((snap) => {
    getDownloadURL(snap.ref).subscribe((url) => {
      firebaseApp
        .auth()
        .currentUser?.updateProfile({
          photoURL: url,
        })
        .then(() => {
          if (firebaseApp.auth().currentUser) cb(firebaseApp.auth().currentUser)
        })
    })
  })
}

export const logout = () => firebaseApp.auth().signOut()

interface priv {
  ExpoPushToken: string[]
}

// Firestore data converter
const privateConverter = {
  toFirestore({ ExpoPushToken }: priv): firebase.firestore.DocumentData {
    return {
      ExpoPushToken,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): priv {
    const { ExpoPushToken } = snapshot.data(options)
    return {
      ExpoPushToken,
    }
  },
}

export default firebaseApp
