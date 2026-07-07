import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, signInAnonymously } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA90aWItXOYsh8wwOODDEoxSQiGjWNqSD4",
  authDomain: "lume-169f7.firebaseapp.com",
  projectId: "lume-169f7",
  storageBucket: "lume-169f7.firebasestorage.app",
  messagingSenderId: "300420489311",
  appId: "1:300420489311:web:1aa74d170fe840cd78fbea",
  measurementId: "G-7J9Y6EDE5P"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

export const initAuth = async () => {
  try {
    await signInAnonymously(auth)
    console.log('Firebase Auth: Success')
  } catch (error) {
    console.error('Firebase Auth: Error', error)
  }
}
