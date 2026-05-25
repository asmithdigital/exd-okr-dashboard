import { ArrowRight, Tag, Figma, BarChart2, Bot, CheckSquare } from 'lucide-react'

const connections = [
  {
    id: 'jira',
    icon: Tag,
    title: 'Jira API',
    color: '#2684FF',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    status: 'Needs team agreement',
    statusColor: 'bg-amber-100 text-amber-700',
    description: 'The UX team tags each Jira ticket with a pathway label. The dashboard queries the Jira API and aggregates tag counts automatically.',
    detail: 'No separate intake form or spreadsheet required. One label per ticket: discovery / delivery / self-serve / research. Label applied when EXD picks up the work.',
    what: [
      'Studio throughput chart (work by type per week)',
      'Kanban intake board (live tickets by pathway)',
      'KR1 & KR2 progress for OKR 1 (research documentation rate)',
      'KR1 progress for OKR 2 (user-validated initiatives)',
    ],
  },
  {
    id: 'figma',
    icon: Figma,
    title: 'Figma API',
    color: '#F24E1E',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    status: 'Access approval pending',
    statusColor: 'bg-amber-100 text-amber-700',
    description: 'Component count and coverage pulled automatically from the Figma design system file. Usage tracking shows which squads are using which components.',
    detail: 'Requires Figma organisation admin to grant API access token. Once live, component count updates in real time. No manual counting.',
    what: [
      'Design system component count (KR 1 of OKR 3)',
      'Component usage by squad (future)',
      'Design system coverage percentage',
    ],
  },
  {
    id: 'analytics',
    icon: BarChart2,
    title: 'Analytics Platform',
    color: '#7c3aed',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    status: 'Tier 3 blocker',
    statusColor: 'bg-red-100 text-red-700',
    description: 'Tier 3 interaction metrics piped in via API or scheduled CSV export from the product analytics platform.',
    detail: 'Drop-off rates, error rates, and task completion metrics published to the dashboard automatically. Requires platform team to set up data pipeline or export schedule.',
    what: [
      'Payment success rate (KR 3 of OKR 2)',
      'Tier 3 interaction metrics (monthly)',
      'Checkout conversion rate (Tier 2)',
    ],
  },
  {
    id: 'claude',
    icon: Bot,
    title: 'Claude AI',
    color: '#C4964A',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    status: 'Ready to prototype',
    statusColor: 'bg-emerald-100 text-emerald-700',
    description: 'Monthly synthesis prompt reads the dashboard data and produces a structured summary for the quarterly review. Reduces manual report writing to near zero.',
    detail: 'A structured prompt reads the current KR data, throughput numbers, and measurement tier status, then outputs a narrative suitable for the quarterly stakeholder review. Can be run by any team member.',
    what: [
      'Quarterly OKR summary narrative',
      'Risk callouts and blockers summary',
      'Recommended actions for next quarter',
      'Input to roadmap discussions',
    ],
  },
]

const prerequisite = {
  title: 'What needs to happen first',
  items: [
    {
      id: 1,
      text: 'Team agreement on Jira tagging convention',
      detail: 'One label per ticket: discovery / delivery / self-serve / research. Applied by the EXD designer when picking up work. This is the single most important agreement — everything downstream depends on it.',
      priority: 'Critical',
    },
    {
      id: 2,
      text: 'Figma API access approved by org admin',
      detail: 'Submit access request to Figma org admin. Likely a 1–2 week lead time.',
      priority: 'High',
    },
    {
      id: 3,
      text: 'Analytics platform data pipeline agreed with platform team',
      detail: 'Agree on whether to use API or CSV export. Identify who owns the pipeline. Tier 3 measurement is blocked until this is resolved.',
      priority: 'High',
    },
    {
      id: 4,
      text: 'Defect logging process agreed between QA and design',
      detail: 'Template exists. Need an owner and a shared Jira project or Confluence space to log post-release defects. Enables KR 2 of OKR 3.',
      priority: 'Medium',
    },
  ],
}

export default function Connections() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">How This Would Connect</h2>
        <p className="text-slate-500 mt-1">What a live version of this dashboard would plug into — and what needs to happen first</p>
      </div>

      {/* flow diagram strip */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-6 py-5">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {['Jira', 'Figma', 'Analytics'].map((src, i) => (
            <div key={src} className="flex items-center gap-3">
              <span className="bg-slate-100 text-slate-700 text-sm font-semibold px-4 py-2 rounded-lg">{src}</span>
              <ArrowRight size={16} className="text-slate-400" />
            </div>
          ))}
          <span className="text-sm font-bold px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#0F1729' }}>
            EXD Dashboard
          </span>
          <ArrowRight size={16} className="text-slate-400" />
          <span className="text-sm font-semibold px-4 py-2 rounded-lg bg-amber-100 text-amber-800">
            Claude synthesis
          </span>
          <ArrowRight size={16} className="text-slate-400" />
          <span className="bg-slate-100 text-slate-700 text-sm font-semibold px-4 py-2 rounded-lg">Quarterly review</span>
        </div>
      </div>

      {/* connection cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {connections.map(conn => {
          const Icon = conn.icon
          return (
            <div key={conn.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${conn.borderColor}`}>
              <div className={`px-5 py-4 border-b ${conn.borderColor} ${conn.bgColor}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white shadow-sm">
                      <Icon size={18} style={{ color: conn.color }} />
                    </div>
                    <h3 className="font-semibold text-slate-800">{conn.title}</h3>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${conn.statusColor}`}>
                    {conn.status}
                  </span>
                </div>
              </div>
              <div className="px-5 py-4 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">{conn.description}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{conn.detail}</p>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Powers</p>
                  <ul className="space-y-1">
                    {conn.what.map(w => (
                      <li key={w} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: conn.color }} />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* prerequisites */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">What needs to happen first</h3>
        <div className="space-y-3">
          {prerequisite.items.map(item => {
            const priorityConfig = {
              Critical: 'bg-red-100 text-red-700',
              High: 'bg-amber-100 text-amber-700',
              Medium: 'bg-slate-100 text-slate-600',
            }
            return (
              <div key={item.id} className="bg-white rounded-xl border border-slate-100 shadow-sm px-6 py-4 flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5"
                  style={{ backgroundColor: '#0F1729' }}
                >
                  {item.id}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <p className="font-semibold text-slate-800 text-sm">{item.text}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityConfig[item.priority]}`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Jira tagging callout */}
      <div className="rounded-xl overflow-hidden">
        <div className="px-6 py-4" style={{ backgroundColor: '#0F1729' }}>
          <div className="flex items-center gap-3">
            <Tag size={16} className="text-amber-400" />
            <h3 className="text-white font-semibold">The Jira tagging convention — in plain terms</h3>
          </div>
        </div>
        <div className="bg-slate-800 px-6 py-5 space-y-3">
          <p className="text-slate-300 text-sm leading-relaxed">
            When EXD picks up any piece of work, the designer tags the Jira ticket with one label. That's the entire
            process. The dashboard does the rest automatically.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {['discovery', 'delivery', 'self-serve', 'research'].map(label => (
              <div key={label} className="bg-slate-700 rounded-lg px-4 py-3 text-center">
                <p className="text-white font-mono text-sm font-semibold">{label}</p>
                <p className="text-slate-400 text-xs mt-1">
                  {label === 'discovery' && 'Research-led scoping'}
                  {label === 'delivery' && 'Design & build support'}
                  {label === 'self-serve' && 'Teams work with guidance'}
                  {label === 'research' && 'Standalone research'}
                </p>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-xs mt-2">
            One label per ticket. Applied by the EXD designer when they pick up the work. If the ticket changes
            pathway mid-flight, update the label.
          </p>
        </div>
      </div>
    </div>
  )
}
