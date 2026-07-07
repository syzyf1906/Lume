import { collection, getDocs, getFirestore } from 'firebase/firestore'

const db = getFirestore()

export async function fetchMods(): Promise<any[]> {
  const modsSnapshot = await getDocs(collection(db, 'mods'))
  return modsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export default fetchMods
