import { measurementTiers } from '../data/mockData'

const metricStatusConfig = {
  live: {
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700',
    label: 'Live',
  },
  'in-progress': {
    dot: 'bg-amber-400',
    badge: 'bg-amber-100 text-amber-700',
    label: 'In progress',
  },
  'not-started': {
    dot: 'bg-slate-300',
    badge: 'bg-slate-100 text-slate-500',
    label: 'Not started',
  },
}

const tierStatusConfig = {
  Operational: { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  'Partially operational': { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  Establishing: { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
}

function MetricRow({ metric }) {
  const cfg = metricStatusConfig[metric.status]
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-3">
        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot}`} />
        <div>
          <p className="text-sm font-medium text-slate-800">{metric.name}</p>
          {metric.trend && (
            <p className="text-xs text-slate-400 mt-0.5">{metric.trend}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {metric.value && (
          <span className="text-sm font-semibold text-slate-700 bg-slate-50 px-3 py-1 rounded-full">
            {metric.value}
          </span>
        )}
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cfg.badge}`}>
          {cfg.label}
        </span>
      </div>
    </div>
  )
}

export default function Measurement() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Measurement Framework</h2>
        <p className="text-slate-500 mt-1">Three-tier model for Experience Design measurement</p>
      </div>

      {/* legend */}
      <div className="flex items-center gap-6 bg-white rounded-xl border border-slate-100 shadow-sm px-6 py-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Legend</p>
        <div className="flex items-center gap-5">
          {Object.entries(metricStatusConfig).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
              <span className="text-sm text-slate-600">{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* tier cards */}
      <div className="space-y-5">
        {measurementTiers.map(tier => {
          const scfg = tierStatusConfig[tier.status]
          const liveCount = tier.metrics.filter(m => m.status === 'live').length
          const inProgressCount = tier.metrics.filter(m => m.status === 'in-progress').length
          const totalCount = tier.metrics.length

          return (
            <div key={tier.tier} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              {/* header bar */}
              <div className="px-6 py-5 flex items-start justify-between" style={{ backgroundColor: '#0F1729' }}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tier {tier.tier}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${scfg.text} ${scfg.bg} ${scfg.border}`}>
                      {tier.status}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xl">{tier.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">{tier.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-white font-bold text-2xl">{liveCount}/{totalCount}</p>
                  <p className="text-slate-400 text-xs mt-0.5">metrics live</p>
                  <p className="text-slate-400 text-xs mt-2">Review: {tier.reviewCadence}</p>
                </div>
              </div>

              {/* progress bar */}
              <div className="h-1.5 flex">
                <div
                  className="bg-emerald-500 transition-all"
                  style={{ width: `${(liveCount / totalCount) * 100}%` }}
                />
                <div
                  className="bg-amber-400 transition-all"
                  style={{ width: `${(inProgressCount / totalCount) * 100}%` }}
                />
              </div>

              {/* metrics */}
              <div className="px-6 py-2">
                {tier.metrics.map(metric => <MetricRow key={metric.name} metric={metric} />)}
              </div>
            </div>
          )
        })}
      </div>

      {/* explainer */}
      <div className="bg-slate-800 rounded-xl p-6 text-slate-300 space-y-3">
        <h3 className="text-white font-semibold text-base">How this model works</h3>
        <p className="text-sm leading-relaxed">
          The three-tier model separates signal by time horizon and audience. Tier 1 (Relationship) tells us how
          customers feel about us overall — useful for executive reporting and biannual strategy reviews.
          Tier 2 (Journey) measures key flow performance — useful for squad-level quarterly OKR tracking.
          Tier 3 (Interaction) gives granular, real-time signal on specific UI moments — useful for the design
          team's monthly synthesis and rapid iteration decisions.
        </p>
        <p className="text-sm leading-relaxed">
          The goal is for all tiers to be operational by end of Q3. Tier 3 is the current focus area — data
          pipeline access is the primary blocker.
        </p>
      </div>
    </div>
  )
}
