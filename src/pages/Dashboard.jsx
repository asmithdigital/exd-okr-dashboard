import { Link } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { ArrowRight, TrendingUp, AlertTriangle, XCircle, CheckCircle } from 'lucide-react'
import { okrs, throughputData, measurementTiers } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'

const statusSummary = {
  green: okrs.flatMap(o => o.keyResults).filter(k => k.status === 'green').length,
  amber: okrs.flatMap(o => o.keyResults).filter(k => k.status === 'amber').length,
  red: okrs.flatMap(o => o.keyResults).filter(k => k.status === 'red').length,
}
const totalKRs = statusSummary.green + statusSummary.amber + statusSummary.red

const CHART_COLORS = {
  discovery: '#6366f1',
  delivery: '#C4964A',
  selfServe: '#10b981',
  research: '#64748b',
}

function OKRSummaryCard({ okr }) {
  const krCounts = { green: 0, amber: 0, red: 0 }
  okr.keyResults.forEach(kr => { krCounts[kr.status] = (krCounts[kr.status] || 0) + 1 })

  const statusBorderMap = { green: '#10b981', amber: '#F59E0B', red: '#ef4444' }
  const borderColor = statusBorderMap[okr.overallStatus] || '#F59E0B'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4" style={{ borderLeftWidth: 4, borderLeftColor: borderColor }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">{okr.quarter}</p>
          <h3 className="text-slate-800 font-semibold text-base leading-snug">{okr.title}</h3>
        </div>
        <StatusBadge status={okr.overallStatus} size="sm" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {okr.keyResults.map((kr, i) => (
          <div key={kr.id} className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">KR{i + 1}</p>
            <StatusBadge status={kr.status} size="sm" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          {krCounts.green > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full" />{krCounts.green} on track</span>}
          {krCounts.amber > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-400 rounded-full" />{krCounts.amber} at risk</span>}
          {krCounts.red > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full" />{krCounts.red} off track</span>}
        </div>
        <Link
          to={`/okrs/${okr.id}`}
          className="flex items-center gap-1 text-xs font-medium hover:underline"
          style={{ color: '#C4964A' }}
        >
          View detail <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center justify-between gap-4">
          <span className="text-slate-500 capitalize">{p.name}</span>
          <span className="font-medium" style={{ color: p.color }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const meterTotalKRs = totalKRs

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Studio Health Overview</h2>
        <p className="text-slate-500 mt-1">Q2 2025 · Data as at 25 May 2025 · <span className="text-amber-600 font-medium">Mock data — not live</span></p>
      </div>

      {/* KR health summary strip */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
            <CheckCircle className="text-emerald-600" size={24} />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-800">{statusSummary.green}</p>
            <p className="text-sm text-slate-500">On Track</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
            <AlertTriangle className="text-amber-500" size={24} />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-800">{statusSummary.amber}</p>
            <p className="text-sm text-slate-500">At Risk</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
            <XCircle className="text-red-500" size={24} />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-800">{statusSummary.red}</p>
            <p className="text-sm text-slate-500">Off Track</p>
          </div>
        </div>
      </div>

      {/* OKR summary cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">OKR Status</h3>
          <Link to="/okrs" className="text-sm font-medium hover:underline" style={{ color: '#C4964A' }}>
            View all OKRs →
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {okrs.map(okr => <OKRSummaryCard key={okr.id} okr={okr} />)}
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Throughput chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <TrendingUp size={18} style={{ color: '#C4964A' }} />
                Studio Throughput
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Work items by type · last 12 weeks</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={throughputData} barSize={6} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="discovery" name="Discovery" fill={CHART_COLORS.discovery} radius={[2, 2, 0, 0]} />
              <Bar dataKey="delivery" name="Delivery" fill={CHART_COLORS.delivery} radius={[2, 2, 0, 0]} />
              <Bar dataKey="selfServe" name="Self-serve" fill={CHART_COLORS.selfServe} radius={[2, 2, 0, 0]} />
              <Bar dataKey="research" name="Research" fill={CHART_COLORS.research} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Measurement status panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-base font-semibold text-slate-800 mb-4">Measurement Status</h3>
          <div className="space-y-4">
            {measurementTiers.map(tier => {
              const live = tier.metrics.filter(m => m.status === 'live').length
              const total = tier.metrics.length
              const statusColorMap = { 'Operational': 'text-emerald-600', 'Partially operational': 'text-amber-600', 'Establishing': 'text-red-500' }
              return (
                <div key={tier.tier} className="border border-slate-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Tier {tier.tier}</p>
                      <p className="text-sm font-semibold text-slate-800">{tier.name}</p>
                    </div>
                    <span className={`text-xs font-medium ${statusColorMap[tier.status]}`}>{tier.status}</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {tier.metrics.map(m => (
                      <div
                        key={m.name}
                        title={m.name}
                        className={`h-2 flex-1 rounded-full ${
                          m.status === 'live' ? 'bg-emerald-500' :
                          m.status === 'in-progress' ? 'bg-amber-400' :
                          'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{live}/{total} metrics live · {tier.reviewCadence}</p>
                </div>
              )
            })}
          </div>
          <Link to="/measurement" className="mt-4 block text-xs font-medium hover:underline" style={{ color: '#C4964A' }}>
            View full framework →
          </Link>
        </div>
      </div>
    </div>
  )
}
