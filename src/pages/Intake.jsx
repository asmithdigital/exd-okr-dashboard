import { Info } from 'lucide-react'
import { intakeTickets } from '../data/mockData'

const pathways = ['Discovery', 'Delivery', 'Self-serve']

const pathwayConfig = {
  Discovery: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    badge: 'bg-indigo-100 text-indigo-700',
    header: 'bg-indigo-600',
    dot: 'bg-indigo-500',
  },
  Delivery: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    header: 'bg-amber-500',
    dot: 'bg-amber-500',
    headerStyle: { backgroundColor: '#C4964A' },
  },
  'Self-serve': {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
    header: 'bg-emerald-600',
    dot: 'bg-emerald-500',
  },
}

const statusConfig = {
  Active: 'bg-emerald-100 text-emerald-700',
  Planning: 'bg-slate-100 text-slate-600',
  'In review': 'bg-blue-100 text-blue-700',
  Blocked: 'bg-red-100 text-red-700',
}

const priorityConfig = {
  High: 'text-red-600 font-semibold',
  Medium: 'text-amber-600',
  Low: 'text-slate-400',
}

function TicketCard({ ticket }) {
  const cfg = pathwayConfig[ticket.pathway]
  return (
    <div className={`rounded-lg border ${cfg.border} ${cfg.bg} p-4 space-y-3`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-slate-800 leading-snug">{ticket.title}</p>
        <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${priorityConfig[ticket.priority]}`}>
          {ticket.priority}
        </span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Squad</span>
          <span className="text-xs font-medium text-slate-700">{ticket.squad}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Started</span>
          <span className="text-xs font-medium text-slate-700">{ticket.weekStarted}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Status</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[ticket.status]}`}>
            {ticket.status}
          </span>
        </div>
      </div>
      <div className="pt-1 border-t border-white/60">
        <p className="text-xs text-slate-400 font-mono">{ticket.id}</p>
      </div>
    </div>
  )
}

export default function Intake() {
  const byPathway = pathways.reduce((acc, p) => {
    acc[p] = intakeTickets.filter(t => t.pathway === p)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Studio Intake</h2>
        <p className="text-slate-500 mt-1">Work in progress by pathway · May 2025</p>
      </div>

      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4">
        <Info size={16} className="text-blue-600 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-800">
          In a live system this view would be populated from Jira tickets tagged by the EXD team. Each ticket
          is tagged with one pathway label: <strong>discovery</strong>, <strong>delivery</strong>,{' '}
          <strong>self-serve</strong>, or <strong>research</strong>. The dashboard reads tag counts automatically —
          no separate intake form required.
        </p>
      </div>

      {/* summary strip */}
      <div className="grid grid-cols-3 gap-4">
        {pathways.map(p => {
          const cfg = pathwayConfig[p]
          const count = byPathway[p].length
          return (
            <div key={p} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-center gap-4">
              <div className={`w-3 self-stretch rounded-full ${cfg.dot}`} style={cfg.headerStyle} />
              <div>
                <p className="text-2xl font-bold text-slate-800">{count}</p>
                <p className="text-sm text-slate-500">{p}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* kanban board */}
      <div className="grid grid-cols-3 gap-5">
        {pathways.map(p => {
          const cfg = pathwayConfig[p]
          const tickets = byPathway[p]
          return (
            <div key={p} className="flex flex-col gap-3">
              <div
                className={`rounded-lg px-4 py-3 flex items-center justify-between ${p === 'Delivery' ? '' : cfg.header}`}
                style={p === 'Delivery' ? { backgroundColor: '#C4964A' } : {}}
              >
                <h3 className="text-white font-semibold text-sm">{p}</h3>
                <span className="text-white/80 text-sm font-medium">{tickets.length}</span>
              </div>
              <div className="space-y-3">
                {tickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
