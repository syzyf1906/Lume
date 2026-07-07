interface ShaderModalProps {
  open: boolean
  shader: { id: string; title: string; description: string; images?: string[] }
  onClose: () => void
  onDownload: () => void
}

export default function ShaderModal({ open, shader, onClose, onDownload }: ShaderModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0b0b0f]/95 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-white">{shader.title}</h3>
            <p className="text-white/40 text-sm mt-2">{shader.description}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white rounded-full p-2">✕</button>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {shader.images?.map((src) => (
            <img key={src} src={src} alt={shader.title} className="h-24 w-full rounded-2xl object-cover border border-white/10" />
          ))}
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onDownload} className="rounded-xl bg-blue-500/10 border border-blue-500/30 px-5 py-3 text-sm text-blue-200 hover:bg-blue-500/15 transition">Download</button>
          <button onClick={onClose} className="rounded-xl bg-white/[0.03] border border-white/10 px-5 py-3 text-sm text-white/70 hover:text-white transition">Close</button>
        </div>
      </div>
    </div>
  )
}
