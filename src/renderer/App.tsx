import { useState, useEffect } from 'react'
import { Cpu, Database, HardDrive } from 'lucide-react'

export default function App() {
  const [view, setView] = useState('Dashboard')
  const [stats, setStats] = useState<{ cpu: string; ram: string }>({ cpu: '—', ram: '—' })

  useEffect(() => {
    let mounted = true

    const fetchStats = async () => {
      try {
        const res = await (window as any).electron.invoke('get-stats')
        if (mounted && res) setStats(res)
      } catch (e) {
        // ignore
      }
    }

    fetchStats()
    const id = setInterval(fetchStats, 2000)
    return () => {
      mounted = false
      clearInterval(id)
    }
  }, [])

  return (
    <div className="relative flex h-screen w-screen bg-[#050505] text-white overflow-hidden animate-in fade-in zoom-in duration-700">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.1),_transparent_20%)]" />
      <aside className="w-64 h-screen border-r border-white/[0.05] bg-[#0a0a0a] p-8 flex flex-col gap-8 glow-effect">
        <h2 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          LUME
        </h2>
        <nav className="flex flex-col gap-3">
          {['Dashboard', 'Files', 'Settings'].map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`text-left px-4 py-3 rounded-xl border transition-all duration-300 font-medium ${view === item ? 'bg-blue-500/10 text-white border-blue-500/20' : 'border-transparent text-white/50 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5'}`}
            >
              <span className="flex items-center gap-3">
                <span>{item}</span>
                {item === 'Dashboard' && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
              </span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="w-4/5 h-screen p-6">
        <div className="m-6 p-10 rounded-[32px] border border-white/5 bg-[#0f0f0f] shadow-[0_10px_30px_rgba(0,0,0,0.5)] h-full backdrop-blur-2xl glow-effect">
          {view === 'Dashboard' ? (
            <>
            <div className="grid grid-cols-3 gap-6">
              {[
                { title: 'CPU Usage', val: stats.cpu, color: 'from-blue-500', Icon: Cpu },
                { title: 'Memory', val: stats.ram, color: 'from-purple-500', Icon: Database },
                { title: 'Disk', val: '89%', color: 'from-cyan-500', Icon: HardDrive, pulse: true }
              ].map((card: any) => (
                <div
                  key={card.title}
                  className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer group shadow-[0_10px_30px_rgba(0,0,0,0.25)] glow-effect shadow-inner"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{card.title}</h3>
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <card.Icon size={16} />
                    </div>
                  </div>
                  {/* Demo filler for CPU and Memory */}
                  {card.title === 'CPU Usage' || card.title === 'Memory' ? (
                    <div className="flex items-end gap-2 mt-2">
                      <span className="text-3xl font-bold text-white">{card.title === 'CPU Usage' ? (stats.cpu !== '—' ? stats.cpu : '14%') : (stats.ram !== '—' ? stats.ram : '4.2 GB')}</span>
                      <span className="text-blue-500 text-xs font-medium mb-1">OPTIMAL</span>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold mt-2 tracking-tight text-white">{card.val}</p>
                  )}

                  {/* Progress for non-demo (Disk) */}
                  {!(card.title === 'CPU Usage' || card.title === 'Memory') && (
                    <div className="h-1 w-full bg-white/10 mt-4 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${card.color} to-transparent ${card.pulse ? 'animate-pulse' : ''} w-1/2`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-white/20 text-xs font-bold tracking-widest uppercase mb-4">Quick Actions</h2>
              <div className="flex gap-4">
                {['Clear Cache', 'System Scan', 'Optimize RAM'].map((action) => (
                  <button key={action} className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-blue-500/10 hover:border-blue-500/50 transition-all text-white/70 hover:text-white font-medium text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
                    {action}
                  </button>
                ))}
              </div>
            </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 w-full max-w-2xl">
              {[
                { name: 'Documents', size: '2.4 GB', type: 'Folder' },
                { name: 'Photos', size: '1.8 GB', type: 'Folder' },
                { name: 'project_lume.zip', size: '450 MB', type: 'Archive' }
              ].map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-4 bg-[#0f0f0f] border border-white/10 rounded-xl hover:bg-blue-500/5 transition-all cursor-pointer glow-effect"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300">📄</div>
                    <div>
                      <h4 className="text-white font-medium tracking-tight">{file.name}</h4>
                      <p className="text-white/40 text-xs">{file.type}</p>
                    </div>
                  </div>
                  <span className="text-white text-sm">{file.size}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
