import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore'

const db = getFirestore()

export async function fetchUpdates(): Promise<Array<{ id: string; title: string; type: string; timestamp: Date | string }>> {
  const updatesRef = collection(db, 'updates')
  const updatesQuery = query(updatesRef, orderBy('timestamp', 'desc'), limit(5))
  const snapshot = await getDocs(updatesQuery)

  return snapshot.docs.map((doc) => {
    const data = doc.data() as { title?: string; type?: string; timestamp?: any }
    return {
      id: doc.id,
      title: data.title || 'Nowa aktualizacja',
      type: data.type || 'update',
      timestamp: data.timestamp ? data.timestamp.toDate?.() ?? new Date(data.timestamp) : new Date()
    }
  })
}
