import { collection, getDocs, getFirestore } from 'firebase/firestore'

const db = getFirestore()

export async function fetchShaders(): Promise<any[]> {
  const snapshot = await getDocs(collection(db, 'shaders'))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export default fetchShaders
