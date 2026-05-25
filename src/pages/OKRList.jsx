import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { okrs } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'
import ProgressBar from '../components/ProgressBar'

export default function OKRList() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">OKR Detail</h2>
        <p className="text-slate-500 mt-1">Q2 2025 · All objectives and key results</p>
      </div>

      <div className="space-y-6">
        {okrs.map(okr => (
          <div key={okr.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 flex items-start justify-between gap-4" style={{ backgroundColor: '#0F1729' }}>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Objective {okr.id}</p>
                <h3 className="text-white font-semibold text-lg">{okr.title}</h3>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <StatusBadge status={okr.overallStatus} size="lg" />
                <Link
                  to={`/okrs/${okr.id}`}
                  className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: '#C4964A', color: '#fff' }}
                >
                  Full detail <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="divide-y divide-slate-50">
              {okr.keyResults.map((kr, i) => (
                <div key={kr.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50">
                  <div className="col-span-1 text-xs font-bold text-slate-400">KR{i + 1}</div>
                  <div className="col-span-5">
                    <p className="text-sm text-slate-700">{kr.description}</p>
                    <p className="text-xs text-slate-400 mt-1">{kr.dataSource}</p>
                  </div>
                  <div className="col-span-2">
                    {kr.currentRaw !== null ? (
                      <ProgressBar value={kr.currentRaw} max={kr.targetRaw} status={kr.status} />
                    ) : (
                      <p className="text-sm text-slate-600 font-medium">{kr.current}</p>
                    )}
                  </div>
                  <div className="col-span-2 text-center">
                    <p className="text-xs text-slate-400">Target</p>
                    <p className="text-sm font-semibold text-slate-700">{kr.target}</p>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <StatusBadge status={kr.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
