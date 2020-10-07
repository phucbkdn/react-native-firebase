import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyBqEZbrQK2U4U5LGSXC-sBAOd_BJTPTFlU',
	authDomain: 'products-management-db74a.firebaseapp.com',
	databaseURL: 'https://products-management-db74a.firebaseio.com',
	projectId: 'products-management-db74a',
	storageBucket: 'products-management-db74a.appspot.com',
	messagingSenderId: '252959242991',
	appId: '1:252959242991:web:648745a45f86b5efb5f91a'

};

const firebaseApp = firebase.apps[0] || firebase.initializeApp(firebaseConfig);

/**
 * Auth provider
 */
export const loginAuth = (userName: string, password: string) => {
  firebase.auth().signInWithEmailAndPassword(userName, password).then(result => {
    console.log(result)
  })
}

export default firebaseApp
