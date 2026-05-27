export const OKR_DATA = {
  fy2627: [
    {
      id: 'fy2627-1',
      fy: 'FY26-27',
      number: 1,
      title: 'Stand up the EXD Studio as our default operating model',
      description:
        'Move from designers attached 1:1 to squads, to a shared studio where work is prioritised and delivered as a team.',
      krs: [
        {
          id: 'fy2627-1-1',
          number: '1.1',
          text: 'Studio ways-of-working playbook published, signed off by EXD leadership, and adopted by 100% of EXD roles by end of Q1',
          type: 'binary',
          milestones: [
            'Playbook drafted',
            'Reviewed by EXD leadership',
            'Signed off',
            'Adopted by 100% of EXD roles',
          ],
          targetDescription: 'All milestones complete by end Q1 FY27',
          howWeMeasure:
            "Manual. The playbook is a document — either it exists and is signed off, or it doesn't. Adoption is confirmed through team acknowledgment and observed practice.",
          dataSource: 'Manual entry',
          initialStatus: 'In Progress',
          initialMilestones: [true, true, false, false],
          initialEvidence: [
            {
              date: '2026-03-15',
              note: 'Ways of working playbook first draft completed and shared with EXD team for review.',
            },
            {
              date: '2026-05-20',
              note: "Playbook revised based on team feedback. Awaiting Luke's sign-off.",
            },
          ],
        },
        {
          id: 'fy2627-1-2',
          number: '1.2',
          text: '100% of new EXD work flows through a single shared backlog with EXD-led prioritisation by end of Q2, with squad liaison attendance at squad ceremonies tracked at ≥85%',
          type: 'quantitative',
          current: 60,
          target: 100,
          unit: '%',
          secondaryMetric: {
            label: 'Squad liaison attendance',
            current: 78,
            target: 85,
            unit: '%',
          },
          targetDescription:
            '100% of new EXD work through shared backlog, squad liaison attendance ≥85%',
          howWeMeasure:
            'Track whether new EXD work enters through the shared backlog vs. going directly to individual designers. Count is based on Jira tickets created in the EXD backlog vs. tickets assigned directly. Liaison attendance is tracked manually via a simple attendance log.',
          dataSource: 'Jira + manual attendance log',
          initialStatus: 'At Risk',
          initialEvidence: [
            {
              date: '2026-02-01',
              note: 'Shared backlog created in Jira. QTB and App squads onboarded. My Account still routing work directly to designer.',
            },
            {
              date: '2026-04-10',
              note: 'My Account now using shared backlog for new work. Legacy items still sitting outside. Liaison attendance averaging 78% — missed ceremonies mostly due to scheduling conflicts.',
            },
          ],
        },
        {
          id: 'fy2627-1-3',
          number: '1.3',
          text: 'Quarterly Studio retro completed each quarter, with at least two ways-of-working improvements shipped per quarter based on team feedback',
          type: 'binary',
          milestones: [
            'Q1 retro completed',
            'Q1 improvements shipped (≥2)',
            'Q2 retro completed',
            'Q2 improvements shipped (≥2)',
            'Q3 retro completed',
            'Q3 improvements shipped (≥2)',
            'Q4 retro completed',
            'Q4 improvements shipped (≥2)',
          ],
          targetDescription: 'All 8 milestones complete across 4 quarters',
          howWeMeasure:
            'Manual. Did the retro happen? What improvements were identified? Were at least two shipped? Evidence is the retro notes and the improvements themselves.',
          dataSource: 'Manual entry + retro notes',
          initialStatus: 'On Track',
          initialMilestones: [true, true, true, false, false, false, false, false],
          initialEvidence: [
            {
              date: '2025-10-15',
              note: 'Q1 retro held. Team identified need for clearer handoff process and better visibility of in-flight work. Two improvements shipped: handoff checklist template and weekly WIP board review.',
            },
            {
              date: '2026-01-20',
              note: 'Q2 retro held. Team flagged inconsistent documentation standards and desire for more structured critique in Studio sessions. Improvements in progress.',
            },
          ],
        },
      ],
    },
    {
      id: 'fy2627-2',
      fy: 'FY26-27',
      number: 2,
      title: 'Establish measurement framework',
      description:
        'Build the mechanisms that produce insight, and the practices that put it to use, so future EXD OKRs can be tracked with data.',
      krs: [
        {
          id: 'fy2627-2-1',
          number: '2.1',
          text: '3-tier measurement framework operating end-to-end by end of Q3 — named data owners and review cadences in place, journey-specific CES and NPS live for core journeys, and post-release defect logging baseline established',
          type: 'binary',
          milestones: [
            'Tier 1 data owners named',
            'Tier 2 data owners named',
            'Tier 3 data owners named',
            'Review cadences defined and scheduled',
            'Journey-specific CES live for core journeys',
            'Journey-specific NPS live for core journeys',
            'Post-release defect logging process defined',
            'Defect logging baseline established',
          ],
          targetDescription: 'Full 3-tier measurement framework operating by end of Q3',
          howWeMeasure:
            'Manual tracking of each component. Each milestone is either done or not. Evidence is the documentation, the scheduled cadences, and the live survey instruments.',
          dataSource: 'Manual entry + Qualtrics + defect log',
          initialStatus: 'In Progress',
          initialMilestones: [false, false, true, false, false, false, false, false],
          initialEvidence: [
            {
              date: '2026-01-10',
              note: '3-tier model documented and shared with EXD leadership. Tier definitions agreed.',
            },
            {
              date: '2026-03-25',
              note: 'Tier 3 data owners identified for QTB and App journeys. Monthly review cadence proposed but not yet scheduled.',
            },
          ],
        },
        {
          id: 'fy2627-2-2',
          number: '2.2',
          text: 'Discovery intake template and documented problem statements with linked evidence published for ≥75% of priority initiatives by end of FY',
          type: 'quantitative',
          current: 40,
          target: 75,
          unit: '%',
          targetDescription:
            '≥75% of priority initiatives have documented problem statements with linked evidence',
          howWeMeasure:
            'Count the number of priority initiatives that have a documented problem statement with linked evidence (research, data, or insight) versus the total number of priority initiatives. The intake template standardises what "documented" means.',
          dataSource: 'Jira + EXD intake template',
          initialStatus: 'At Risk',
          initialEvidence: [
            {
              date: '2026-02-15',
              note: 'Discovery intake template drafted. Shared with squad leads for feedback.',
            },
            {
              date: '2026-04-01',
              note: 'Template adopted by QTB squad. App squad partially using it. My Account not yet started. Currently at roughly 40% of priority initiatives with documented problem statements.',
            },
          ],
        },
        {
          id: 'fy2627-2-3',
          number: '2.3',
          text: 'Monthly Tier-3 insight synthesis session operating, with AI-assisted analysis of session, drop-off, and feedback data demonstrably influencing at least one roadmap decision per quarter',
          type: 'binary',
          milestones: [
            'First Tier-3 synthesis session held',
            'Monthly cadence established',
            'AI-assisted analysis piloted',
            'Q1 roadmap influence documented',
            'Q2 roadmap influence documented',
            'Q3 roadmap influence documented',
            'Q4 roadmap influence documented',
          ],
          targetDescription:
            'Monthly synthesis sessions established, influencing roadmap decisions each quarter',
          howWeMeasure:
            'Did the session happen each month? Was AI-assisted analysis used? Can we point to at least one roadmap decision per quarter that was influenced by the synthesis? Evidence is meeting notes and the specific roadmap decision.',
          dataSource: 'Manual entry + meeting notes',
          initialStatus: 'Not Started',
          initialMilestones: [false, false, false, false, false, false, false],
          initialEvidence: [
            {
              date: '2026-05-15',
              note: 'Tier 3 synthesis concept documented. Waiting on analytics access and data owner assignments before scheduling first session.',
            },
          ],
        },
      ],
    },
    {
      id: 'fy2627-3',
      fy: 'FY26-27',
      number: 3,
      title:
        "Establish the Design System as RAA's single source of truth, with AI augmentation piloted on top",
      description:
        'Make the system the place product, design, and engineering go for answers — and trial Claude-augmented pathways on the highest-friction work.',
      krs: [
        {
          id: 'fy2627-3-1',
          number: '3.1',
          text: 'Design System v1 published as a single source of truth covering core journeys, with component coverage baseline measured and AI-assisted documentation live for ≥50% of components by end of Q4',
          type: 'quantitative',
          current: 25,
          target: 50,
          unit: '% components with AI-assisted docs',
          targetDescription: 'AI-assisted documentation live for ≥50% of components',
          howWeMeasure:
            'Component count in Figma/ZeroHeight. AI-assisted documentation means Claude-generated or Claude-augmented usage guidelines, implementation notes, and accessibility annotations. Coverage = components with AI docs / total components.',
          dataSource: 'Figma API (planned) + ZeroHeight + manual count',
          initialStatus: 'In Progress',
          initialEvidence: [
            {
              date: '2026-02-01',
              note: 'Design system audit started. Cataloguing all existing components across products.',
            },
            {
              date: '2026-04-15',
              note: 'Component inventory complete. 120 components identified. 30 have documentation in current state. AI documentation pilot started on first 10 components.',
            },
          ],
        },
        {
          id: 'fy2627-3-2',
          number: '3.2',
          text: 'Cross-product inconsistency audit completed across four focus journeys; top 10 inconsistencies identified, scored, and added to product discovery backlogs',
          type: 'binary',
          milestones: [
            'Journey 1 audited',
            'Journey 2 audited',
            'Journey 3 audited',
            'Journey 4 audited',
            'Top 10 inconsistencies identified and scored',
            'Inconsistencies added to product discovery backlogs',
          ],
          targetDescription:
            'All 4 journeys audited, top 10 inconsistencies scored and added to backlogs',
          howWeMeasure:
            'Manual. Each focus journey is audited for visual, interaction, and content inconsistencies across products. Inconsistencies are scored by severity and impact, then added as tickets in the relevant product backlog.',
          dataSource: 'Design system audit + Jira backlogs',
          initialStatus: 'In Progress',
          initialMilestones: [true, true, false, false, false, false],
          initialEvidence: [
            {
              date: '2026-03-01',
              note: 'First two focus journeys (Quote to Buy, Renewals) audit complete. 34 inconsistencies identified across those two journeys.',
            },
            {
              date: '2026-05-10',
              note: 'Third journey (My Account) audit in progress. Top 10 from first two journeys scored and prioritised. Backlog tickets being created.',
            },
          ],
        },
        {
          id: 'fy2627-3-3',
          number: '3.3',
          text: 'At least two of the six AI pathways piloted end-to-end, with adoption metrics and learnings documented and shared with EXD and Technology leadership',
          type: 'binary',
          milestones: [
            'AI pathways identified and scoped',
            'Pilot 1 started',
            'Pilot 1 completed',
            'Pilot 2 started',
            'Pilot 2 completed',
            'Adoption metrics documented',
            'Learnings shared with EXD and Tech leadership',
          ],
          targetDescription:
            'At least 2 of 6 AI pathways piloted end-to-end, with learnings documented and shared',
          howWeMeasure:
            'Manual. Each pilot is scoped, run, and assessed. Success = the pathway was run end-to-end, someone used it, and we documented what happened. Adoption metrics might be simple counts — how many times it was used, by whom, time saved.',
          dataSource: 'Manual entry + usage logs',
          initialStatus: 'In Progress',
          initialMilestones: [true, true, false, true, false, false, false],
          initialEvidence: [
            {
              date: '2026-01-15',
              note: 'Six AI pathways defined: Self-serve, Documentation, Delivery QA, Discovery synthesis, Content generation, Accessibility audit.',
            },
            {
              date: '2026-04-20',
              note: 'Self-serve pathway pilot running — using Claude for design system documentation generation. Documentation pathway started — AI-assisted component usage guidelines.',
            },
          ],
        },
      ],
    },
  ],
  fy2728: [
    {
      id: 'fy2728-1',
      fy: 'FY27-28',
      number: 1,
      title: 'Ensure teams solve real problems using evidence, not assumptions',
      description:
        'Now that the studio model and measurement framework are established, ensure that the work we do is grounded in real user evidence.',
      krs: [
        {
          id: 'fy2728-1-1',
          number: '1.1',
          text: 'Where discovery has been run, 90% of priority initiatives include documented research and/or insight before delivery',
          type: 'quantitative',
          current: 0,
          target: 90,
          unit: '%',
          targetDescription:
            '90% of priority initiatives (where discovery was run) include documented research/insight before delivery',
          howWeMeasure:
            'Count priority initiatives where discovery was run and documented research/insight exists in the ticket or linked Figma file, divided by total priority initiatives where discovery was run. Tracked via Jira labels — tickets tagged with pathway:discovery that also have linked evidence.',
          dataSource: 'Jira tags + EXD reporting',
          initialStatus: 'Not Started',
          initialEvidence: [],
        },
        {
          id: 'fy2728-1-2',
          number: '1.2',
          text: 'Establish documentation of validated problem statements and begin reporting problem definition across priority initiatives',
          type: 'binary',
          milestones: [
            'Problem statement template finalised',
            'Reporting mechanism defined',
            'First quarterly report produced',
            'Baseline established',
          ],
          targetDescription:
            'Validated problem statements documented and reporting mechanism in place',
          howWeMeasure:
            'Building on the FY26-27 intake template. By FY27-28, every priority initiative should have a validated problem statement. Reporting means we can pull a number: X of Y initiatives have documented problem statements.',
          dataSource: 'Jira + EXD reporting',
          initialStatus: 'Not Started',
          initialMilestones: [false, false, false, false],
          initialEvidence: [],
        },
        {
          id: 'fy2728-1-3',
          number: '1.3',
          text: 'Monthly insight synthesis (Tier 3 measurement) established and actively used to influence roadmap decisions across squads',
          type: 'binary',
          milestones: [
            'Monthly cadence confirmed and operating',
            'AI-assisted analysis integrated',
            'Documented roadmap influence (Q1)',
            'Documented roadmap influence (Q2)',
            'Documented roadmap influence (Q3)',
            'Documented roadmap influence (Q4)',
          ],
          targetDescription:
            'Monthly synthesis established, influencing roadmap decisions across all 4 quarters',
          howWeMeasure:
            'Continuation of FY26-27 KR 2.3. By FY27-28 this should be routine. Evidence is meeting notes and specific roadmap decisions that can be traced back to Tier 3 synthesis findings.',
          dataSource: 'Meeting notes + roadmap documentation',
          initialStatus: 'Not Started',
          initialMilestones: [false, false, false, false, false, false],
          initialEvidence: [],
        },
      ],
    },
    {
      id: 'fy2728-2',
      fy: 'FY27-28',
      number: 2,
      title: 'Improve Conversion Through End-to-End Experience Quality',
      description:
        'Ensure Experience Design teams directly improve revenue outcomes across high-impact digital initiatives.',
      krs: [
        {
          id: 'fy2728-2-1',
          number: '2.1',
          text: '75% of high-impact digital initiatives validated with users — preferably pre-delivery, but post-delivery when not possible',
          type: 'quantitative',
          current: 0,
          target: 75,
          unit: '%',
          targetDescription:
            '75% of high-impact initiatives validated with users before or after delivery',
          howWeMeasure:
            "Count high-impact initiatives where user validation occurred (usability testing, benchmarking, or user research) divided by total high-impact initiatives. 'High-impact' is defined during prioritisation. Validation can be pre-delivery (preferred) or post-delivery benchmarking.",
          dataSource: 'EXD reporting (Jira tags) + UserTesting/Askable records',
          initialStatus: 'Not Started',
          initialEvidence: [],
        },
        {
          id: 'fy2728-2-2',
          number: '2.2',
          text: '50%+ of insight-led initiatives demonstrate measurable uplift in conversion, drop-off, or completion rate',
          type: 'quantitative',
          current: 0,
          target: 50,
          unit: '%',
          targetDescription:
            '50%+ of insight-led initiatives show measurable uplift in conversion, drop-off, or completion rate',
          howWeMeasure:
            'Of initiatives where UX research or testing informed the design, how many showed measurable improvement in their target metric after release? Requires pre/post measurement — baseline metric before release, same metric after. This is the hardest KR to measure and relies on analytics access and a clear definition of "measurable uplift."',
          dataSource: 'Product analytics + EXD reporting',
          initialStatus: 'Not Started',
          initialEvidence: [],
        },
        {
          id: 'fy2728-2-3',
          number: '2.3',
          text: '15% increase in successful payment actions for new and existing members',
          type: 'quantitative',
          current: 0,
          target: 15,
          unit: '% increase',
          targetDescription:
            '15% increase in successful payment actions for new and existing members',
          howWeMeasure:
            "Payment success rate tracked via product analytics. Baseline established from FY26-27 data. This KR is influenced by many factors beyond UX — payment provider changes, pricing changes, product changes. EXD's contribution is tracked through the initiatives we validate (KR 2.1) that touch payment journeys.",
          dataSource: 'Product analytics',
          initialStatus: 'Not Started',
          initialEvidence: [],
        },
      ],
    },
    {
      id: 'fy2728-3',
      fy: 'FY27-28',
      number: 3,
      title: 'Deliver a Cohesive, Scalable Design System Across Products',
      description:
        'Improve experience consistency and design effectiveness through a shared system that reduces rework and accelerates delivery.',
      krs: [
        {
          id: 'fy2728-3-1',
          number: '3.1',
          text: 'Build a single source of truth design system to enable component usage reporting',
          type: 'binary',
          milestones: [
            'Design system v2 published',
            'Component usage reporting live',
            'Adoption dashboard operational',
          ],
          targetDescription: 'Design system v2 with component usage reporting operational',
          howWeMeasure:
            'Building on FY26-27 DS v1. By FY27-28 the system should be mature enough to report on which components are being used, where, and how consistently. This requires Figma API integration or manual tracking.',
          dataSource: 'Figma API + ZeroHeight + manual',
          initialStatus: 'Not Started',
          initialMilestones: [false, false, false],
          initialEvidence: [],
        },
        {
          id: 'fy2728-3-2',
          number: '3.2',
          text: 'Establish logging process for defects (functional, UX, or Content) flagged post-release and build a baseline',
          type: 'binary',
          milestones: [
            'Defect logging process defined',
            'Team trained on process',
            'Logging in practice for ≥2 quarters',
            'Baseline established from logged data',
          ],
          targetDescription:
            'Defect logging process established and baseline built from ≥2 quarters of data',
          howWeMeasure:
            'Building on FY26-27 defect logging baseline. By FY27-28 the process should be routine and producing enough data to establish a meaningful baseline — average defects per release, defects by type, time to remediation.',
          dataSource: 'Defect log (Jira) + manual',
          initialStatus: 'Not Started',
          initialMilestones: [false, false, false, false],
          initialEvidence: [],
        },
        {
          id: 'fy2728-3-3',
          number: '3.3',
          text: 'Audit 4 focus journeys, identify and prioritise top 20 cross-product inconsistencies, and add to relevant product discovery backlogs',
          type: 'binary',
          milestones: [
            'Journey 1 re-audited',
            'Journey 2 re-audited',
            'Journey 3 re-audited',
            'Journey 4 re-audited',
            'Top 20 inconsistencies identified',
            'All 20 added to product backlogs',
            'Tracking remediation progress',
          ],
          targetDescription:
            'All 4 journeys re-audited, top 20 inconsistencies identified and added to backlogs',
          howWeMeasure:
            "Continuation of FY26-27 inconsistency audit. By FY27-28 we're re-auditing to see what's been fixed, identifying new inconsistencies, and tracking whether product teams are actually remediating what we've identified.",
          dataSource: 'Design system audit + Jira backlogs',
          initialStatus: 'Not Started',
          initialMilestones: [false, false, false, false, false, false, false],
          initialEvidence: [],
        },
      ],
    },
  ],
}

export const ALL_OKRS = [...OKR_DATA.fy2627, ...OKR_DATA.fy2728]

export function getOKRById(id) {
  return ALL_OKRS.find(okr => okr.id === id) || null
}
