import { useState } from 'react';
import { LayoutDashboard, Folder, Settings } from 'lucide-react';

// Komponenty widoków
const DashboardGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
    <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all shadow-2xl">
      <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">CPU Usage</h3>
      <p className="text-3xl font-bold">14%</p>
    </div>
    <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all shadow-2xl">
      <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">Memory</h3>
      <p className="text-3xl font-bold">4.2 GB</p>
    </div>
  </div>
);

const FilesList = () => <div className="text-white/50">Files View (W budowie)</div>;
const SettingsPanel = () => <div className="text-white/50">Settings View (W budowie)</div>;

export default function App() {
  const [view, setView] = useState('Dashboard');

  const renderContent = () => {
    switch (view) {
      case 'Dashboard': return <DashboardGrid />;
      case 'Files': return <FilesList />;
      case 'Settings': return <SettingsPanel />;
      default: return <DashboardGrid />;
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      <aside className="w-64 border-r border-white/5 p-8 flex flex-col gap-8">
        <h1 className="text-xl font-bold tracking-tighter">LUME</h1>
        <nav className="flex flex-col gap-2">
          {['Dashboard', 'Files', 'Settings'].map((item) => (
            <button 
              key={item}
              onClick={() => setView(item)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${view === item ? 'bg-white/5 text-blue-400' : 'text-white/40 hover:text-white'}`}
            >
              {item === 'Dashboard' && <LayoutDashboard size={18} />}
              {item === 'Files' && <Folder size={18} />}
              {item === 'Settings' && <Settings size={18} />}
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">{renderContent()}</main>
    </div>
  );
}
