import { motion } from 'framer-motion'

interface TopOfWeekWidgetProps {
  mods: Array<{ id: string; name?: string; title?: string; description?: string; downloads?: number }>
}

export default function TopOfWeekWidget({ mods }: TopOfWeekWidgetProps) {
  return (
    <motion.div className="glass-panel top-widget-pulse p-6 space-y-5" animate={{ opacity: [0.96, 0.88, 0.96] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-white/40">Top of the Week</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Najlepsze dodatki</h2>
        <div className="gradient-underline mt-3" />
        <p className="mt-4 text-sm text-white/50">Wybrane przez społeczność premium shadery i mody.</p>
      </div>

      <div className="grid gap-4">
        {mods.length > 0 ? mods.map((mod, index) => (
          <motion.div
            key={mod.id}
            className="rounded-3xl border border-white/[0.08] bg-[#11131a] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:border-blue-500/30"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            whileHover={{ y: -4, scale: 1.01 }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{mod.name || mod.title}</p>
                <p className="text-xs text-white/40 mt-1">{mod.description || 'Stylowy mod z kolekcji premium.'}</p>
              </div>
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200">#{index + 1}</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-white/50 text-xs">
              <span>{mod.downloads ? `${mod.downloads} pobrań` : 'Brak statystyk'}</span>
              <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60">Premium</span>
            </div>
          </motion.div>
        )) : (
          <div className="rounded-3xl border border-white/[0.08] bg-[#11131a] p-6 text-sm text-white/40">Brak dostępnych modów w tej chwili. Sprawdź połączenie z Firebase albo spróbuj odświeżyć.</div>
        )}
      </div>
    </motion.div>
  )
}
