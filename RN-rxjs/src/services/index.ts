import firebase from 'firebase/app'
import { filter, switchMap } from 'rxjs/operators'
import { extname } from 'path'
import { collectionData } from 'rxfire/firestore'
import { authState, user } from 'rxfire/auth'
import { fromTask, getDownloadURL } from 'rxfire/storage'
import firebaseApp, { db, auth } from './firebaseAccess'

/**
 * Lazy Messages
 * @param collectionName {string}
 * @param query {string}
 */
export const lazyMessages = (collectionName: string, query: string) => {
  return user(auth).pipe(
    switchMap((user) => {
      const ref = db
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

/**
 * Add message function
 * @param collectionName {string}
 * @param data {Object} Message object
 */
export const addMessage = (collectionName: string, data: any) => {
  const user$ = authState(auth).pipe(filter((user) => !!user))
  return user(auth).pipe(
    switchMap((user) => {
      const dataUpdate = {
        ...data,
        user: user.email,
        photoURL: user.photoURL,
        thread: `${user.email}-${data.sendTo}`,
      }

      return db.collection(collectionName).add(dataUpdate)
    })
  )
}

/**
 * Save expo push token
 * @param token {string}
 */
export const saveExpoPushToken = (token: string | undefined) => {
  if (!token) {
    return
  }

  // Get current user
  const currentUser = auth.currentUser
  db.collection('private')
    .doc(currentUser?.uid)
    .withConverter(privateConverter)
    .get()
    .then((doc) => {
      if (!doc.exists || !doc.data()?.ExpoPushToken?.includes(token)) {
        db.collection('private')
          .doc(currentUser?.uid)
          .set({
            ExpoPushToken: [...(doc.data()?.ExpoPushToken || []), token],
          })
      }
    })
}

/**
 * Upload avatar and update user avatar
 * @param file {Blob}
 * @param fileName {string}
 * @param callback {Callback}
 */
export const uploadAvatar = (
  file: Blob,
  fileName: string,
  callback: (User: firebase.User | null) => void
) => {
  const currentUser = auth.currentUser
  const storageRef = firebaseApp
    .storage()
    .ref('avatar/' + currentUser?.uid + extname(fileName))

  const task = storageRef.put(file, { cacheControl: 'public,max-age=86400' })

  fromTask(task).subscribe((snap) => {
    getDownloadURL(snap.ref).subscribe((url) => {
      currentUser
        ?.updateProfile({
          photoURL: url,
        })
        .then(() => {
          if (currentUser) {
            callback(currentUser)
          }
        })
    })
  })
}

/**
 * Function logout
 */
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
