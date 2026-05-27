import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOKR } from '../contexts/OKRContext'
import { OKR_DATA, ALL_OKRS } from '../data/okrData'
import { STATUS_COLORS, getOKRStatus } from '../utils/status'

function StatusDot({ status, size = 10 }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: STATUS_COLORS[status] || '#6B7280',
        flexShrink: 0,
      }}
    />
  )
}

function krOneLiner(kr, data) {
  if (kr.type === 'quantitative') {
    const current = data.krProgress[kr.id]?.current ?? kr.current
    const isPercent = kr.unit.startsWith('%')
    if (isPercent) return `${current}% of ${kr.target}% target`
    return `${current} / ${kr.target} ${kr.unit}`
  }
  const milestones = data.krMilestones[kr.id] || kr.initialMilestones || []
  const checked = milestones.filter(Boolean).length
  return `${checked} of ${kr.milestones.length} milestones`
}

export default function Dashboard() {
  const [selectedFY, setSelectedFY] = useState('fy2627')
  const { data } = useOKR()
  const navigate = useNavigate()

  const okrs = OKR_DATA[selectedFY] || []

  const recentActivity = Object.entries(data.evidence)
    .flatMap(([krId, entries]) =>
      (entries || []).map(e => ({ ...e, krId }))
    )
    .filter(e => e.date && e.note)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .map(entry => {
      for (const okr of ALL_OKRS) {
        for (const kr of okr.krs) {
          if (kr.id === entry.krId) {
            return { ...entry, okrTitle: okr.title, okrNumber: okr.number, krNumber: kr.number, okrId: okr.id, fy: okr.fy }
          }
        }
      }
      return entry
    })

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">OKR Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">EXD — Experience Design · RAA</p>
        </div>
        <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          {[['fy2627', 'FY26–27'], ['fy2728', 'FY27–28']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedFY(key)}
              className="px-4 py-2 rounded-md text-sm font-medium transition-all"
              style={{
                backgroundColor: selectedFY === key ? '#0F1729' : 'transparent',
                color: selectedFY === key ? 'white' : '#94a3b8',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {selectedFY === 'fy2728' && (
        <div
          className="mb-6 px-4 py-3 rounded-lg text-sm border"
          style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a', color: '#92400e' }}
        >
          FY27–28 OKRs are the planned outcomes once FY26–27 foundations are in place. Status tracking begins in FY27.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {okrs.map(okr => {
          const okrStatus = getOKRStatus(okr, data.krStatus)
          return (
            <button
              key={okr.id}
              onClick={() => navigate(`/okr/${okr.id}`)}
              className="text-left bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  OKR {okr.number}
                </span>
                <StatusDot status={okrStatus} size={10} />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-4">
                {okr.title}
              </h3>
              <div className="space-y-1.5">
                {okr.krs.map(kr => {
                  const krStatus = data.krStatus[kr.id] || kr.initialStatus
                  return (
                    <div key={kr.id} className="flex items-start gap-2">
                      <StatusDot status={krStatus} size={7} />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-slate-400 mr-1.5">
                          {kr.number}
                        </span>
                        <span className="text-xs text-slate-500">{krOneLiner(kr, data)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  View detail →
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <div>
        <h2 className="text-base font-semibold text-slate-900 mb-4">Recent activity</h2>
        {recentActivity.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
            <p className="text-slate-400 text-sm">
              No progress has been logged yet. Open any OKR to start tracking.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentActivity.map((entry, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-lg px-5 py-4 flex gap-4 items-start"
              >
                <div className="text-xs text-slate-400 whitespace-nowrap pt-0.5 w-24 shrink-0">
                  {entry.date}
                </div>
                <div className="flex-1 min-w-0">
                  {entry.fy && (
                    <div className="text-xs text-slate-400 mb-1">
                      {entry.fy} · OKR {entry.okrNumber} · KR {entry.krNumber}
                    </div>
                  )}
                  <p className="text-sm text-slate-700">{entry.note}</p>
                </div>
                {entry.okrId && (
                  <button
                    onClick={() => navigate(`/okr/${entry.okrId}`)}
                    className="text-xs text-slate-400 hover:text-slate-600 whitespace-nowrap shrink-0"
                  >
                    View →
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
