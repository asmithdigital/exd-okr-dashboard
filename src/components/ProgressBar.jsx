export default function ProgressBar({ value, max = 100, status }) {
  const pct = Math.min(100, Math.round((value / max) * 100))

  const colorMap = {
    green: 'bg-emerald-500',
    amber: 'bg-amber-400',
    red: 'bg-red-500',
  }
  const color = colorMap[status] || 'bg-amber-400'

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-slate-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-slate-700 w-10 text-right">{pct}%</span>
    </div>
  )
}
