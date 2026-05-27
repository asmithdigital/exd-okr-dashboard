const DECISION_POINTS = [
  {
    number: 1,
    title: 'Filter Gate',
    subtitle: 'Intake & Prioritisation',
    accent: '#0D9488',
    accentBg: '#f0fdfa',
    accentBorder: '#99f6e4',
    what: 'When work arrives and the team determines discovery is needed, but the squad or product decides to skip it.',
    scenario:
      "You're in sprint planning. A new feature request comes in. The BA says the problem is well understood, but when you ask what user research or data supports that, there's nothing. You suggest a short discovery activity — even just five user interviews or a review of existing research. The PM says there's no time, the feature ships this sprint. That's a Filter Gate decision. Document it.",
    capture: [
      'What the work is',
      'Who decided to skip discovery',
      'Why (timeline, assumed known problem, etc.)',
      'The trade-off',
      'Who raised the concern',
      'Date',
    ],
    where:
      'In the Jira ticket for that piece of work, as a comment or in a dedicated field.',
  },
  {
    number: 2,
    title: 'Delivery Handoff',
    subtitle: 'Design to Development',
    accent: '#D97706',
    accentBg: '#fffbeb',
    accentBorder: '#fde68a',
    what: 'When a designer produces an ideal design but features or elements are cut before development begins.',
    scenario:
      'The designer recommended a three-step progressive disclosure flow for a complex form. Product decided to ship as a single-page form to meet the sprint deadline. The designer documents what was recommended versus what will be built, and why.',
    capture: [
      'What the ideal design included',
      'What was cut',
      'Who decided',
      'Why',
      'Expected impact on user experience',
    ],
    where:
      'In the Figma file as an annotation, and in the Jira ticket as a comment referencing the Figma annotation.',
  },
  {
    number: 3,
    title: 'QA / Build vs Design',
    subtitle: 'Quality Assurance',
    accent: '#DC2626',
    accentBg: '#fef2f2',
    accentBorder: '#fecaca',
    what: "When the built product doesn't match the approved design, or when issues are found during QA but the decision is made to ship anyway.",
    scenario:
      'QA identifies that colour contrast on a key CTA fails WCAG AA. The designer flags it. The delivery lead says it ships as-is because the fix requires a design system update. The designer logs what the design specified versus what was built, and the expected impact.',
    capture: [
      'What the design specified',
      'What was built differently',
      'Who decided',
      'Why',
      'Expected impact',
      "Whether it's logged for future remediation",
    ],
    where: 'In the Jira ticket and in the QA notes.',
  },
]

export default function Decisions() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Decision Documentation Guide</h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          A reference for the team on what decision documentation is, why it matters, and how to
          do it.
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
        <p className="text-sm text-slate-600 leading-relaxed">
          When the team recommends an approach based on user research, design expertise, or UX
          best practice, and a different decision is made — that's not a failure. It's an
          organisational decision. But if we don't document it, we lose the ability to explain why
          something was built the way it was, and we lose the evidence we need to advocate for
          better outcomes next time.{' '}
          <span className="font-medium text-slate-900">
            Decision documentation is how we make trade-offs visible instead of absorbing them
            silently.
          </span>
        </p>
      </div>

      {/* Decision points */}
      <h2 className="text-base font-semibold text-slate-900 mb-4">Three decision points</h2>
      <div className="space-y-5 mb-8">
        {DECISION_POINTS.map(dp => (
          <div
            key={dp.number}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: dp.accentBorder, backgroundColor: dp.accentBg }}
          >
            {/* Header */}
            <div
              className="px-6 py-5"
              style={{ borderBottom: `1px solid ${dp.accentBorder}` }}
            >
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: dp.accent }}
                >
                  {dp.number}
                </span>
                <h3 className="font-bold text-slate-900">
                  <span style={{ color: dp.accent }}>Decision Point {dp.number}</span>
                  {' — '}
                  {dp.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 ml-10">{dp.subtitle}</p>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-sm font-medium text-slate-800 mb-4">{dp.what}</p>

              <blockquote
                className="border-l-2 pl-4 italic text-sm text-slate-600 mb-5 leading-relaxed"
                style={{ borderColor: dp.accent }}
              >
                "{dp.scenario}"
              </blockquote>

              <div className="space-y-4">
                <div>
                  <h4
                    className="text-xs font-semibold uppercase tracking-wide mb-2"
                    style={{ color: dp.accent }}
                  >
                    What to capture
                  </h4>
                  <ul className="space-y-1.5">
                    {dp.capture.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: dp.accent }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4
                    className="text-xs font-semibold uppercase tracking-wide mb-1.5"
                    style={{ color: dp.accent }}
                  >
                    Where to document it
                  </h4>
                  <p className="text-sm text-slate-600">{dp.where}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* OKR connection */}
      <div className="bg-slate-900 rounded-xl p-6 mb-5">
        <h2 className="text-base font-semibold text-white mb-3">Why this connects to OKRs</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          If our FY27–28 OKR says '90% of priority initiatives include documented research before
          delivery' and we can't hit that target, the decision log is the evidence that explains
          why. It shows exactly how many times discovery was recommended and declined, by whom, and
          what the trade-offs were. Without it, a missed OKR looks like our failure. With it, a
          missed OKR is a documented organisational constraint that we can take to leadership with
          evidence.
        </p>
      </div>

      {/* Getting started */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-3">Getting started</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          We don't need a separate tool for this. Start by documenting decisions where the work
          already lives — in Jira tickets and Figma files. If you're unsure whether something is
          worth documenting, ask:{' '}
          <span className="italic">
            if someone looked at this in six months and asked 'why was it built this way instead of
            the better way,' would there be an answer?
          </span>{' '}
          If not, document it.
        </p>
      </div>
    </div>
  )
}
