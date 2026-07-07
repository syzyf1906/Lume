import React from 'react'

export default function App() {
  return (
    <div className="flex h-screen w-screen bg-slate-950 text-white">
      <aside className="w-1/5 h-screen border-r border-white/10 p-6 bg-white/5 backdrop-blur-xl flex flex-col gap-6">
        <div className="text-xl font-bold">LUME</div>
        <div className="space-y-2">
          {['Dashboard', 'Files', 'Settings'].map((item) => (
            <div
              key={item}
              className="rounded-xl p-3 hover:bg-white/10 transition-all cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      </aside>
      <main className="w-4/5 h-screen p-8 bg-slate-950/30 backdrop-blur-xl">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_0_50px_rgba(0,0,0,0.3)] h-full">
          <h1 className="text-5xl font-black tracking-tighter">Midnight Glass</h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            A modern glassmorphism interface with a sidebar layout and soft translucent surfaces.
          </p>
        </div>
      </main>
    </div>
  )
}
