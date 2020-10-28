import { combineLatest, of } from 'rxjs'
import { mergeMap, map, filter, switchMap } from 'rxjs/operators'
import { extname } from 'path'
import { collectionData } from 'rxfire/firestore'
import { authState, user, idToken } from 'rxfire/auth'
import { fromTask, getDownloadURL } from 'rxfire/storage'
import firebaseApp, { db, auth } from './firebaseAccess'

if (location.hostname === 'localhost') {
  db.settings({
    host: 'localhost:8080',
    ssl: false,
  })
}

export const lazyMessages = (collectionName: string, query: string) => {
  const user$ = authState(auth).pipe(filter((user) => !!user))
  return user(auth).pipe(
    switchMap((user) => {
      const ref = db
        .collection(collectionName)
        // .where('thread', 'in', [
        //   `${user.email}-${query}`,
        //   `${query}-${user.email}`,
        // ])
        .orderBy('created', 'asc')
      return collectionData(ref, 'id')
    })
  )
}

export const addMessage = (collectionName: string, data: any) => {
  const user$ = authState(auth).pipe(filter((user) => !!user))
  const fireStore$ = of(db)

  return user$.pipe(
    switchMap((user) => {
      const dataUpdate = {
        ...data,
        user: user.email,
        thread: `${user.email}-${data.sendTo}`,
      }

      return db.collection(collectionName).add(dataUpdate)
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
