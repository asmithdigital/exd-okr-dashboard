import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, Plus, Check, ArrowLeft } from 'lucide-react'
import { useOKR } from '../contexts/OKRContext'
import { getOKRById } from '../data/okrData'
import { STATUS_COLORS, STATUS_OPTIONS, getOKRStatus } from '../utils/status'

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || '#6B7280'
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: `${color}18`, color, border: `1px solid ${color}30` }}
    >
      <span
        style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: color, display: 'inline-block' }}
      />
      {status}
    </span>
  )
}

function ProgressBar({ current, target, unit, label }) {
  const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0
  const color =
    pct >= 100 ? '#10B981' : pct >= 75 ? '#C4964A' : pct >= 40 ? '#F59E0B' : '#EF4444'
  const displayUnit = unit.startsWith('%') ? '%' : unit
  return (
    <div>
      {label && <div className="text-xs text-slate-500 mb-1.5">{label}</div>}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full transition-all"
            style={{ width: `${pct}%`, backgroundColor: color }}
          />
        </div>
        <span className="text-xs text-slate-500 whitespace-nowrap tabular-nums">
          {current}
          {unit.startsWith('%') ? '%' : ''} / {target}
          {displayUnit}
        </span>
      </div>
    </div>
  )
}

function KRCard({ kr, data, setKRStatus, setKRProgress, setKRSecondaryProgress, toggleMilestone, addEvidence }) {
  const [expanded, setExpanded] = useState(true)
  const [addingEvidence, setAddingEvidence] = useState(false)
  const [evidenceDate, setEvidenceDate] = useState(new Date().toISOString().split('T')[0])
  const [evidenceNote, setEvidenceNote] = useState('')

  const status = data.krStatus[kr.id] || kr.initialStatus
  const milestones = data.krMilestones[kr.id] || kr.initialMilestones || []
  const progress = data.krProgress[kr.id] || { current: kr.current, secondaryCurrent: kr.secondaryMetric?.current }
  const evidence = data.evidence[kr.id] || []

  const handleAddEvidence = () => {
    if (!evidenceNote.trim()) return
    addEvidence(kr.id, { date: evidenceDate, note: evidenceNote.trim() })
    setEvidenceNote('')
    setEvidenceDate(new Date().toISOString().split('T')[0])
    setAddingEvidence(false)
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <button
        className="w-full flex items-start justify-between gap-3 px-6 py-5 hover:bg-slate-50 transition-colors text-left"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-start gap-3">
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: STATUS_COLORS[status] || '#6B7280',
              marginTop: 5,
              flexShrink: 0,
            }}
          />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
              KR {kr.number}
            </div>
            <div className="text-sm font-medium text-slate-900 leading-snug">{kr.text}</div>
          </div>
        </div>
        <div className="shrink-0 mt-1 text-slate-400">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 px-6 py-6 space-y-6">
          {/* Status */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 w-28 shrink-0">
              Status
            </span>
            <select
              value={status}
              onChange={e => setKRStatus(kr.id, e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 mr-3"
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <StatusBadge status={status} />
          </div>

          {/* Quantitative progress */}
          {kr.type === 'quantitative' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 w-28 shrink-0">
                  Progress
                </span>
                <div className="flex-1">
                  <ProgressBar
                    current={progress.current ?? kr.current}
                    target={kr.target}
                    unit={kr.unit}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 w-28 shrink-0">
                  Current value
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={progress.current ?? kr.current}
                    min={0}
                    onChange={e => setKRProgress(kr.id, Number(e.target.value))}
                    className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                  <span className="text-xs text-slate-400">
                    {kr.unit} · target: {kr.target}
                  </span>
                </div>
              </div>
              {kr.secondaryMetric && (
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 w-28 shrink-0">
                    {kr.secondaryMetric.label}
                  </span>
                  <div className="flex-1">
                    <ProgressBar
                      current={progress.secondaryCurrent ?? kr.secondaryMetric.current}
                      target={kr.secondaryMetric.target}
                      unit={kr.secondaryMetric.unit}
                    />
                  </div>
                  <input
                    type="number"
                    value={progress.secondaryCurrent ?? kr.secondaryMetric.current}
                    min={0}
                    onChange={e => setKRSecondaryProgress(kr.id, Number(e.target.value))}
                    className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm w-20 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>
              )}
            </div>
          )}

          {/* Binary milestones */}
          {kr.type === 'binary' && (
            <div className="flex items-start gap-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 w-28 shrink-0 pt-0.5">
                Milestones
              </span>
              <div className="flex-1 space-y-2">
                {kr.milestones.map((milestone, i) => (
                  <button
                    key={i}
                    onClick={() => toggleMilestone(kr.id, i)}
                    className="flex items-center gap-2.5 w-full text-left group"
                  >
                    <span
                      className="w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors"
                      style={{
                        backgroundColor: milestones[i] ? '#10B981' : 'white',
                        borderColor: milestones[i] ? '#10B981' : '#cbd5e1',
                      }}
                    >
                      {milestones[i] && <Check size={11} color="white" strokeWidth={3} />}
                    </span>
                    <span
                      className={`text-sm transition-colors ${
                        milestones[i]
                          ? 'text-slate-400 line-through'
                          : 'text-slate-700 group-hover:text-slate-900'
                      }`}
                    >
                      {milestone}
                    </span>
                  </button>
                ))}
                <div className="text-xs text-slate-400 mt-1">
                  {milestones.filter(Boolean).length} of {kr.milestones.length} complete
                </div>
              </div>
            </div>
          )}

          {/* Target */}
          <div className="flex items-start gap-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 w-28 shrink-0 pt-0.5">
              Target
            </span>
            <p className="text-sm text-slate-700">{kr.targetDescription}</p>
          </div>

          {/* How we measure */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
              How we measure this
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{kr.howWeMeasure}</p>
            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Data source
              </span>
              <span className="text-xs text-slate-500">{kr.dataSource}</span>
            </div>
          </div>

          {/* Evidence log */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Evidence log
              </span>
              {!addingEvidence && (
                <button
                  onClick={() => setAddingEvidence(true)}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 hover:border-slate-300 transition-colors bg-white"
                >
                  <Plus size={12} />
                  Add evidence
                </button>
              )}
            </div>

            {addingEvidence && (
              <div className="border border-slate-200 rounded-xl p-5 mb-4 bg-slate-50 space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-1.5">Date</label>
                  <input
                    type="date"
                    value={evidenceDate}
                    onChange={e => setEvidenceDate(e.target.value)}
                    className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-1.5">Note</label>
                  <textarea
                    value={evidenceNote}
                    onChange={e => setEvidenceNote(e.target.value)}
                    placeholder="What happened? What evidence do you have?"
                    rows={3}
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddEvidence}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#0F1729' }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setAddingEvidence(false)
                      setEvidenceNote('')
                    }}
                    className="px-4 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {evidence.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">No evidence logged yet.</p>
            ) : (
              <div className="space-y-2">
                {evidence.map((entry, i) => (
                  <div
                    key={i}
                    className="border border-slate-100 rounded-lg px-4 py-3 flex gap-4 items-start bg-white"
                  >
                    <span className="text-xs text-slate-400 whitespace-nowrap pt-0.5 w-24 shrink-0 tabular-nums">
                      {entry.date}
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed">{entry.note}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function OKRDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, setKRStatus, setKRProgress, setKRSecondaryProgress, toggleMilestone, addEvidence } = useOKR()

  const okr = getOKRById(id)

  if (!okr) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 mb-4">OKR not found.</p>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-slate-400 hover:text-slate-600"
        >
          ← Back to Dashboard
        </button>
      </div>
    )
  }

  const okrStatus = getOKRStatus(okr, data.krStatus)

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 mb-7 transition-colors"
      >
        <ArrowLeft size={14} />
        Dashboard
      </button>

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            OKR {okr.number}
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
            {okr.fy}
          </span>
          <StatusBadge status={okrStatus} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{okr.title}</h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">{okr.description}</p>
      </div>

      <div className="space-y-4">
        {okr.krs.map(kr => (
          <KRCard
            key={kr.id}
            kr={kr}
            data={data}
            setKRStatus={setKRStatus}
            setKRProgress={setKRProgress}
            setKRSecondaryProgress={setKRSecondaryProgress}
            toggleMilestone={toggleMilestone}
            addEvidence={addEvidence}
          />
        ))}
      </div>
    </div>
  )
}
