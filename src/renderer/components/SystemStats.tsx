import { Cpu, Database, HardDrive } from 'lucide-react'

interface StatsProps {
  stats: {
    cpu: string
    ram: string
    disk: string
    platform?: string
  }
}

export default function SystemStats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {[
        { title: 'CPU Usage', value: stats.cpu, icon: Cpu, accent: 'from-blue-500' },
        { title: 'Memory', value: stats.ram, icon: Database, accent: 'from-purple-500' },
        { title: 'Disk', value: stats.disk, icon: HardDrive, accent: 'from-cyan-500' }
      ].map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.title}
            className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/[0.08] hover:border-white/20 transition-all cursor-default shadow-[0_10px_30px_rgba(0,0,0,0.25)] glow-effect shadow-inner"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{item.title}</h3>
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Icon size={16} />
              </div>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold text-white">{item.value}</span>
              {item.title !== 'Disk' && <span className="text-blue-500 text-xs font-medium mb-1">OPTIMAL</span>}
            </div>
            {item.title === 'Disk' && <div className="h-1 w-full bg-white/10 mt-4 rounded-full overflow-hidden"><div className={`h-full bg-gradient-to-r ${item.accent} to-transparent w-1/2`} /></div>}
          </div>
        )
      })}
    </div>
  )
}
