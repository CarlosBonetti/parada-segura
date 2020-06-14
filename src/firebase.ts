import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'

export const app = firebase.initializeApp({
  apiKey: 'AIzaSyAH5v9tlsdmyWngvCTegauuGin1C-C62AA',
  authDomain: 'hackaton-ccr-280214.firebaseapp.com',
  databaseURL: 'https://hackaton-ccr-280214.firebaseio.com',
  projectId: 'hackaton-ccr-280214',
  storageBucket: 'hackaton-ccr-280214.appspot.com',
  messagingSenderId: '752724604577',
  appId: '1:752724604577:web:8afbcca5b15116e8b762e0',
  measurementId: 'G-6JS5GHTS8C',
})

export const db = app.firestore()
