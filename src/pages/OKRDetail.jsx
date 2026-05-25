import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Database, FileText, TrendingUp } from 'lucide-react'
import { okrs } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'
import ProgressBar from '../components/ProgressBar'

export default function OKRDetail() {
  const { id } = useParams()
  const okr = okrs.find(o => o.id === parseInt(id))

  if (!okr) return <Navigate to="/okrs" replace />

  const prevOkr = okrs.find(o => o.id === okr.id - 1)
  const nextOkr = okrs.find(o => o.id === okr.id + 1)

  return (
    <div className="space-y-6">
      {/* breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/okrs" className="hover:text-slate-800 flex items-center gap-1">
          <ArrowLeft size={14} /> OKR Detail
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Objective {okr.id}</span>
      </div>

      {/* hero */}
      <div className="rounded-xl overflow-hidden shadow-sm">
        <div className="px-8 py-7" style={{ backgroundColor: '#0F1729' }}>
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Objective {okr.id} · {okr.quarter}</p>
              <h2 className="text-white font-bold text-2xl leading-snug max-w-2xl">{okr.title}</h2>
            </div>
            <StatusBadge status={okr.overallStatus} size="lg" />
          </div>

          <div className="flex gap-6 mt-6">
            {okr.keyResults.map((kr, i) => {
              const dotColor = { green: '#10b981', amber: '#F59E0B', red: '#ef4444' }[kr.status]
              return (
                <a key={kr.id} href={`#kr${i + 1}`} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }} />
                  KR{i + 1}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* KR cards */}
      <div className="space-y-5">
        {okr.keyResults.map((kr, i) => (
          <div id={`kr${i + 1}`} key={kr.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">KR{i + 1}</span>
                <h3 className="text-slate-800 font-semibold">{kr.description}</h3>
              </div>
              <StatusBadge status={kr.status} size="lg" />
            </div>

            <div className="px-6 py-5 grid grid-cols-3 gap-8">
              {/* Progress */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <TrendingUp size={12} /> Progress
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Current</span>
                    <span className="font-semibold text-slate-800">{kr.current}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Target</span>
                    <span className="font-semibold text-slate-800">{kr.target}</span>
                  </div>
                  {kr.currentRaw !== null && (
                    <div className="pt-2">
                      <ProgressBar value={kr.currentRaw} max={kr.targetRaw} status={kr.status} />
                    </div>
                  )}
                </div>
              </div>

              {/* Data source */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <Database size={12} /> Data Source
                </p>
                <p className="text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2">{kr.dataSource}</p>
              </div>

              {/* Evidence notes */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <FileText size={12} /> Evidence Notes
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">{kr.evidenceNotes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* prev / next nav */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div>
          {prevOkr ? (
            <Link
              to={`/okrs/${prevOkr.id}`}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft size={14} />
              <span>OKR {prevOkr.id}: {prevOkr.shortTitle}</span>
            </Link>
          ) : null}
        </div>
        <div>
          {nextOkr ? (
            <Link
              to={`/okrs/${nextOkr.id}`}
              className="flex items-center gap-2 text-sm font-medium hover:opacity-80"
              style={{ color: '#C4964A' }}
            >
              <span>OKR {nextOkr.id}: {nextOkr.shortTitle}</span>
              <span>→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}
