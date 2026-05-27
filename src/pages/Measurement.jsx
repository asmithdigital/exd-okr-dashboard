const TIERS = [
  {
    number: 1,
    name: 'Relationship',
    metrics: 'NPS · Trust · Advocacy',
    cadence: 'Biannual review',
    color: '#8B5CF6',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    description:
      "High-level sentiment metrics that tell us whether members feel good about RAA overall. They move slowly and are influenced by many factors beyond digital experience. We track them to understand the macro trend but don't use them to measure individual design decisions.",
  },
  {
    number: 2,
    name: 'Journey',
    metrics: 'CES · Conversion · Completion',
    cadence: 'Quarterly review',
    color: '#3B82F6',
    bg: '#eff6ff',
    border: '#bfdbfe',
    description:
      'Measures whether specific journeys work well end-to-end. Journey-specific CES and NPS, quote completion rates, payment success rates. This is where UX benchmarking lives — task success rates measured through regular benchmarking studies tell us whether our designs are actually improving the experience over time.',
  },
  {
    number: 3,
    name: 'Interaction',
    metrics: 'Drop-off · Error rate · Task completion · Session data',
    cadence: 'Monthly review',
    color: '#10B981',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    description:
      "Granular behavioural data from analytics that tells us what's happening at each step of a journey. Where are people dropping off? Where are errors occurring? This is the data that feeds into monthly insight synthesis and directly informs what we prioritise.",
  },
]

const DATA_SOURCES = [
  {
    source: 'Jira',
    powers:
      'Work classification by pathway type (discovery/delivery/self-serve), discovery intake tracking, problem statement documentation',
  },
  {
    source: 'UX Benchmarking (UserTesting/Askable)',
    powers: 'Task success rates, usability metrics, quarterly benchmarking scores',
  },
  {
    source: 'Qualtrics',
    powers: 'NPS, CES, member satisfaction surveys',
  },
  {
    source: 'Analytics platform',
    powers: 'Conversion rates, drop-off rates, payment success, session data',
  },
  {
    source: 'Figma API',
    powers: 'Component coverage, design system adoption, inconsistency tracking',
  },
  {
    source: 'Manual',
    powers:
      'Retro outcomes, playbook sign-off, meeting cadence, qualitative evidence',
  },
]

export default function Measurement() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">How We Measure</h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          The measurement approach for EXD OKRs — what we track, how we track it, and what
          connects where.
        </p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Measurement tiers</h2>
        <div className="space-y-3">
          {TIERS.map(tier => (
            <div
              key={tier.number}
              className="rounded-xl border p-6"
              style={{ backgroundColor: tier.bg, borderColor: tier.border }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ backgroundColor: tier.color }}
                  >
                    {tier.number}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{tier.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{tier.metrics}</p>
                  </div>
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap shrink-0"
                  style={{ backgroundColor: 'white', color: tier.color, border: `1px solid ${tier.border}` }}
                >
                  {tier.cadence}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{tier.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-slate-900 mb-4">
          How OKR progress is tracked
        </h2>
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
          <p className="text-sm text-slate-600 leading-relaxed">
            FY26–27 OKRs are primarily tracked through manual evidence logging because the systems
            are being established. Status is updated by the EXD team as milestones are reached.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            In FY27–28, more KRs will be trackable through automated data sources — Jira tags for
            work classification, analytics for conversion metrics, Figma API for design system
            coverage.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section>
        <h2 className="text-base font-semibold text-slate-900 mb-4">
          What connects where (future state)
        </h2>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Data source
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Powers
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DATA_SOURCES.map(({ source, powers }) => (
                <tr key={source} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-700 whitespace-nowrap align-top">
                    {source}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 leading-relaxed">{powers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
          <p className="text-xs text-amber-700 leading-relaxed">
            This dashboard currently uses manual data entry. The decision log and measurement
            framework describe what would need to be in place to automate each data source.
          </p>
        </div>
      </section>
    </div>
  )
}
