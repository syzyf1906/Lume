import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'

export async function initAuth(): Promise<boolean> {
  try {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
    }

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    await signInAnonymously(auth)
    return true
  } catch (e) {
    return false
  }
}

export default initAuth
