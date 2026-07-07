import { useState, useEffect } from 'react'
import { initAuth } from './services/firebase'
import fetchMods from './services/modsService'
import fetchShaders from './services/shadersService'
import SystemStats from './components/SystemStats'
import TopOfWeekWidget from './components/TopOfWeekWidget'
import { UpdatesWidget } from './components/UpdatesWidget'
import ShaderModal from './components/ShaderModal'
import Toast from './components/Toast'

export default function App() {
  const [view, setView] = useState('Dashboard')
  const [stats, setStats] = useState<{ cpu: string; ram: string; disk: string; platform: string }>({ cpu: 'System Ready', ram: 'System Ready', disk: 'System Ready', platform: 'unknown' })
  const [topMods, setTopMods] = useState<any[]>([])
  const [shaders, setShaders] = useState<any[]>([])
  const [selectedShader, setSelectedShader] = useState<any>(null)
  const [toast, setToast] = useState<{ message: string; actionLabel?: string; onAction?: () => void } | null>(null)
  const [localBackups, setLocalBackups] = useState<any[]>([])
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    let mounted = true

    const handleStatsUpdate = (payload: any) => {
      if (!mounted || !payload) return
      setRefreshing(true)
      setStats(payload)
      setTimeout(() => setRefreshing(false), 500)
    }

    const fetchStats = async () => {
      if (!(window as any).electron?.invoke) return
      try {
        const res = await (window as any).electron.invoke('get-stats')
        if (mounted && res) {
          setStats(res)
        }
      } catch (e) {
        if (mounted) setStats({ cpu: 'System Ready', ram: 'System Ready', disk: 'System Ready', platform: 'unknown' })
      }
    }

    const fetchData = async () => {
      try {
        const mods = await fetchMods()
        if (mounted) {
          const sorted = mods.sort((a: any, b: any) => (b.downloads || b.popularity || 0) - (a.downloads || a.popularity || 0))
          setTopMods(sorted.slice(0, 3))
        }
      } catch (e) {
        // ignore
      }

      try {
        const shaderList = await fetchShaders()
        if (mounted) setShaders(shaderList)
      } catch (e) {
        // ignore
      }

      try {
        const backups = await (window as any).electron.invoke('mods:list-backups')
        if (mounted && backups.success) setLocalBackups(backups.backups)
      } catch (e) {
        // ignore
      }

    }

    fetchStats()
    fetchData()

    let removeListener: (() => void) | null = null
    if ((window as any).electron?.on) {
      removeListener = (window as any).electron.on('stats-update', handleStatsUpdate)
    }

    initAuth()

    return () => {
      mounted = false
      if (typeof removeListener === 'function') removeListener()
    }
  }, [])

  const handleDownload = async (url: string) => {
    if (!url) {
      setToast({ message: 'Brak URL do pobrania.' })
      return
    }
    setDownloadLoading(true)
    const result = await (window as any).electron.invoke('mods:install', url)
    setDownloadLoading(false)

    if (result.success) {
      setToast({
        message: 'Pobieranie zakończone. Mod został zainstalowany.',
        actionLabel: 'Zastosuj',
        onAction: () => {
          setToast(null)
          setLocalBackups((prev) => [...prev, { name: 'backup-applied', path: '', modified: new Date().toISOString() }])
        }
      })
    } else {
      setToast({ message: `Błąd pobierania: ${result.error}` })
    }
  }

  return (
    <div className="relative flex h-screen w-screen bg-[#050505] text-white overflow-hidden animate-in fade-in zoom-in duration-700">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.1),_transparent_20%)]" />
      <aside className="w-72 h-screen border-r border-white/[0.05] bg-[#0a0a0a] p-8 flex flex-col gap-8 glow-effect">
        <h2 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          LUME
        </h2>
        <nav className="flex flex-col gap-3">
          {['Dashboard', 'Shaders', 'Moje Mody', 'Settings'].map((item) => (
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
      <main className="w-4/5 h-screen p-6 overflow-y-auto">
        <div className="m-6 p-10 rounded-[32px] border border-white/5 bg-[#0f0f0f] shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-h-[calc(100vh-3rem)] backdrop-blur-2xl glow-effect">
          {view === 'Dashboard' && (
            <>
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Dashboard</h1>
                  <p className="text-white/40 mt-2">Monitoruj sprzęt, mody i najlepsze dodatki tygodnia.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                  Platforma: {stats.platform}
                </div>
              </div>

              <div className="dashboard-grid">
                <div className="dashboard-grid__stats space-y-6">
                  <SystemStats stats={stats} refreshing={refreshing} />
                </div>
                <div className="dashboard-grid__top self-start h-full rounded-[28px] border border-white/[0.08] bg-[#0f0f0f] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                  <TopOfWeekWidget mods={topMods} />
                </div>
                <div className="dashboard-grid__activity rounded-[28px] border border-white/[0.08] bg-[#0f0f0f] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                  <UpdatesWidget />
                </div>
              </div>
            </>
          )}

          {view === 'Shaders' && (
            <>
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Shaders</h1>
                  <p className="text-white/40 mt-2">Wybierz shader i zobacz podgląd oraz pobierz bezpośrednio w aplikacji.</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {shaders.length > 0 ? shaders.map((shader) => (
                  <div key={shader.id} className="rounded-3xl border border-white/[0.08] bg-[#0e0e14] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition hover:border-white/20">
                    <h3 className="text-xl font-semibold text-white">{shader.title || shader.name}</h3>
                    <p className="text-white/40 mt-3 text-sm leading-6">{shader.description || 'Shader description unavailable.'}</p>
                    <div className="mt-6 flex flex-col gap-3">
                      <button type="button" onClick={() => setSelectedShader(shader)} className="rounded-2xl bg-white/[0.05] border border-white/[0.08] px-4 py-3 text-sm text-white transition hover:bg-blue-500/10">Preview</button>
                      <button type="button" onClick={() => handleDownload(shader.downloadUrl)} disabled={downloadLoading} className="rounded-2xl bg-blue-500/80 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50">{downloadLoading ? 'Pobieranie...' : 'Download'}</button>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-3 rounded-3xl border border-white/[0.08] bg-[#0e0e14] p-10 text-center text-white/60">Brak shaderów do wyświetlenia.</div>
                )}
              </div>
            </>
          )}

          {view === 'Moje Mody' && (
            <>
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Moje Mody</h1>
                  <p className="text-white/40 mt-2">Lista lokalnych backupów modów i zainstalowanych katalogów.</p>
                </div>
              </div>
              <div className="space-y-4">
                {localBackups.length > 0 ? localBackups.map((backup) => (
                  <div key={backup.path || backup.name} className="rounded-3xl border border-white/[0.08] bg-[#0e0e14] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-white/40">Backup</p>
                        <p className="text-lg font-semibold text-white">{backup.name}</p>
                      </div>
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200">{backup.modified ? new Date(backup.modified).toLocaleDateString() : 'n/a'}</span>
                    </div>
                    <p className="mt-3 text-sm text-white/50">{backup.path}</p>
                  </div>
                )) : (
                  <div className="rounded-3xl border border-white/[0.08] bg-[#0e0f14] p-10 text-center text-white/60">Nie znaleziono lokalnych modów ani backupów.</div>
                )}
              </div>
            </>
          )}

          {view === 'Settings' && (
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-white/40 mt-4">Tutaj możesz później dodać ustawienia aplikacji.</p>
            </div>
          )}
        </div>
      </main>

      {selectedShader && (
        <ShaderModal
          open={Boolean(selectedShader)}
          shader={selectedShader}
          onClose={() => setSelectedShader(null)}
          onDownload={() => {
            if (selectedShader?.downloadUrl) {
              handleDownload(selectedShader.downloadUrl)
            }
          }}
        />
      )}

      {toast && <Toast message={toast.message} actionLabel={toast.actionLabel} onAction={toast.onAction} />}
    </div>
  )
}
