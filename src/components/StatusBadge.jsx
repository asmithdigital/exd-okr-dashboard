const config = {
  green: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    dot: 'bg-emerald-500',
    label: 'On Track',
  },
  amber: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    dot: 'bg-amber-500',
    label: 'At Risk',
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    dot: 'bg-red-500',
    label: 'Off Track',
  },
  'in-progress': {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    dot: 'bg-amber-400',
    label: 'In Progress',
  },
  live: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    dot: 'bg-emerald-500',
    label: 'Live',
  },
  'not-started': {
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    dot: 'bg-slate-400',
    label: 'Not Started',
  },
}

export default function StatusBadge({ status, label, size = 'sm' }) {
  const c = config[status] || config.amber
  const displayLabel = label || c.label
  const textSize = size === 'lg' ? 'text-sm' : 'text-xs'
  const padding = size === 'lg' ? 'px-3 py-1.5' : 'px-2 py-1'

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${c.bg} ${c.text} ${textSize} ${padding}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {displayLabel}
    </span>
  )
}
