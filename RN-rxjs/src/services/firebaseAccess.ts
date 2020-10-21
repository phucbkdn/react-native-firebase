import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'
import 'firebase/remote-config'

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
export const db = firebase.firestore()
export type Query = firebase.firestore.Query
export const auth = firebase.auth()
export const functions = firebase.functions()
export const storage = firebase.storage()
export const remoteConfig = firebase.remoteConfig()
export const serverNow = firebase.firestore.FieldValue.serverTimestamp()
export const clientNow = firebase.firestore.Timestamp.now()
export const StringFormat = firebase.storage.StringFormat
export default firebaseApp
