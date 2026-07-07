import { useState } from 'react'

export default function App() {
  const [view, setView] = useState('Dashboard')

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-white">
      <aside className="w-64 h-screen border-r border-white/5 bg-black/20 backdrop-blur-3xl p-8 flex flex-col gap-8">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          LUME
        </h2>
        <nav className="flex flex-col gap-3">
          {['Dashboard', 'Files', 'Settings'].map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${view === item ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <main className="w-4/5 h-screen p-6">
        <div className="m-6 p-10 rounded-[32px] border border-white/5 bg-gradient-to-br from-white/5 to-transparent shadow-[0_0_80px_rgba(0,0,0,0.5)] h-full backdrop-blur-2xl">
          {view === 'Dashboard' ? (
            <div className="grid grid-cols-3 gap-6">
              {[
                { title: 'CPU Usage', val: '12%', color: 'from-blue-500' },
                { title: 'Memory', val: '4.2 GB', color: 'from-purple-500' },
                { title: 'Disk', val: '89%', color: 'from-cyan-500' }
              ].map((card) => (
                <div
                  key={card.title}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                >
                  <h3 className="text-white/40 text-sm font-semibold">{card.title}</h3>
                  <p className="text-3xl font-bold mt-2">{card.val}</p>
                  <div className="h-1 w-full bg-white/10 mt-4 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${card.color} to-transparent w-1/2`}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white/50 text-center mt-20">Tu pojawi się lista plików (w budowie...)</div>
          )}
        </div>
      </main>
    </div>
  )
}
