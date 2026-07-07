interface ToastProps {
  message: string
  actionLabel?: string
  onAction?: () => void
}

export default function Toast({ message, actionLabel, onAction }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 rounded-3xl border border-white/10 bg-[#111827]/90 px-5 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <span className="text-sm text-white/80">{message}</span>
      {actionLabel && onAction && (
        <button onClick={onAction} className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-blue-400">
          {actionLabel}
        </button>
      )}
    </div>
  )
}
