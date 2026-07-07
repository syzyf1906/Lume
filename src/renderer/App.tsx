import React from 'react'

export default function App() {
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
              className="text-left px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 font-medium"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <main className="w-4/5 h-screen p-6">
        <div className="m-6 p-10 rounded-[32px] border border-white/5 bg-gradient-to-br from-white/5 to-transparent shadow-[0_0_80px_rgba(0,0,0,0.5)] h-full backdrop-blur-2xl">
          <h1 className="text-5xl font-black tracking-tighter">Midnight Glass</h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            A premium glassmorphism dashboard with depth, softness, and refined color tones.
          </p>
        </div>
      </main>
    </div>
  )
}
