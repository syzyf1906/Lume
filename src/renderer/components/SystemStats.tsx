import { AnimatePresence, motion } from 'framer-motion'
import { Cpu, Database, HardDrive } from 'lucide-react'

interface StatsProps {
  stats: {
    cpu: string
    ram: string
    disk: string
    platform?: string
  }
  refreshing?: boolean
}

export default function SystemStats({ stats, refreshing }: StatsProps) {
  return (
    <motion.div className="grid grid-cols-3 gap-6" initial="hidden" animate="visible" variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.15
        }
      }
    }}>
      {[
        { title: 'CPU Usage', value: stats.cpu, icon: Cpu, accent: 'from-blue-500' },
        { title: 'Memory', value: stats.ram, icon: Database, accent: 'from-purple-500' },
        { title: 'Disk', value: stats.disk, icon: HardDrive, accent: 'from-cyan-500' }
      ].map((item) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.title}
            className="glass-panel p-6 rounded-2xl hover:-translate-y-0.5 hover:scale-[1.02] cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{item.title}</h3>
              <div className="relative p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Icon size={16} />
                {refreshing && (
                  <motion.span className="absolute inset-0 rounded-full border border-blue-400/30" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }} />
                )}
              </div>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold text-white">{item.value}</span>
              {item.title !== 'Disk' && <span className="text-blue-500 text-xs font-medium mb-1">OPTIMAL</span>}
            </div>
            {item.title === 'Disk' && (
              <div className="h-1 w-full bg-white/10 mt-4 rounded-full overflow-hidden">
                <motion.div className={`h-full bg-gradient-to-r ${item.accent} to-transparent`} style={{ width: '50%' }} animate={{ width: '60%' }} transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }} />
              </div>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
