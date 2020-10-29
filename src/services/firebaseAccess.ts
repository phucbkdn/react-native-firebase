// import * as firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'

// TODO: move to env config
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

export const auth = firebase.auth()
export default firebaseApp

// Mock local host for firebase emulator
if (location.hostname === 'localhost') {
  firebase.firestore().settings({
    host: 'localhost:8080',
    ssl: false,
  })
}

export const db = firebase.firestore()
