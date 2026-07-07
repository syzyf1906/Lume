import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { db } from '../services/firebase'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'

export const UpdatesWidget = () => {
  const [updates, setUpdates] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      console.log('Sprawdzam kolekcję: updates')
      try {
        const q = query(collection(db, 'updates'), orderBy('timestamp', 'desc'), limit(5))
        const snapshot = await getDocs(q)
        console.log('updates query size:', snapshot.size, 'path:', 'updates')
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log('Firebase updates:', data)
        setUpdates(data)
      } catch (e) {
        console.error('Błąd pobierania updates:', e)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="glass-panel p-4 rounded-[28px] border border-white/[0.08] bg-white/5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <h2 className="text-lg font-bold text-white">Activity Log</h2>
      {updates.length === 0 ? (
        <p className="mt-4 text-sm text-white/40">Brak nowych wpisów.</p>
      ) : (
        updates.map((u, index) => {
          const timestamp = u.timestamp?.toDate?.() ?? u.timestamp
          const time = new Date(timestamp).getTime()
          const isNew = Date.now() - time < 24 * 60 * 60 * 1000
          return (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="py-3 border-b border-white/10 text-white/80 last:border-b-0 hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {isNew && <span className="status-live" />}
                  <span>{u.title}</span>
                </div>
                <span className="text-xs text-white/40">{new Date(timestamp).toLocaleDateString()}</span>
              </div>
            </motion.div>
          )
        })
      )}
    </div>
  )
}
