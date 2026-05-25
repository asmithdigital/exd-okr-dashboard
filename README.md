# EXD OKR Dashboard

An internal metrics tracking tool for the Experience Design studio. Visualises OKR progress, studio throughput, and measurement framework status using mock data.

**Live demo:** https://asmithdigital.github.io/exd-okr-dashboard

---

## What this is

A React dashboard that gives the EXD studio and its stakeholders a single view of:

- **OKR health** — all three Q2 OKRs with KR-level status, progress, data sources, and evidence notes
- **Studio throughput** — work by pathway type (Discovery, Delivery, Self-serve, Research) over the last 12 weeks
- **Studio intake** — a kanban view of active work in progress, organised by pathway
- **Measurement framework** — the three-tier measurement model (Relationship / Journey / Interaction), showing which metrics are live, in progress, or not yet started
- **How it connects** — a plain-English explanation of what a live version would plug into and what needs to happen first

Currently running on **mock data**. All numbers are illustrative. The architecture is designed so that live data sources can be connected one at a time.

---

## What a live version would connect to

| Source | What it powers | Status |
|--------|---------------|--------|
| **Jira API** | Throughput chart, intake kanban, research documentation rate (OKR 1 KR1 & KR2), user validation rate (OKR 2 KR1) | Needs Jira admin setup |
| **Figma API** | Design system component count and coverage (OKR 3 KR1) | Access approval pending |
| **Analytics platform** | Payment success rate (OKR 2 KR3), Tier 3 interaction metrics | Needs data pipeline from platform team |
| **Claude AI** | Monthly synthesis — reads dashboard data and produces a narrative for quarterly review | Ready to prototype |

---

## What the team needs to agree on

### Jira tagging convention (most important)

Every piece of EXD work needs one label on its Jira ticket. The dashboard reads these labels via the Jira API — no separate intake form needed.

| Label | When to use |
|-------|------------|
| `discovery` | Research-led scoping work |
| `delivery` | Design and build support on a squad initiative |
| `self-serve` | Squads working with EXD guidance rather than direct involvement |
| `research` | Standalone research not attached to a specific initiative |

**Rules:**
- One label per ticket
- Applied by the EXD designer when they pick up the work
- If the work changes pathway, update the label
- Applied to the parent Jira epic or story — not sub-tasks

Without this convention in place, the throughput chart and intake kanban cannot be automated.

### Other agreements needed

1. **Figma API access** — request from the Figma org admin (1–2 week lead time)
2. **Analytics data pipeline** — agree with the platform team on API vs CSV export for Tier 3 metrics
3. **Defect logging ownership** — QA and design to agree on process and Jira project for post-release design defects (enables OKR 3 KR2)

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Dashboard home — OKR health summary, throughput chart, measurement status |
| `/okrs` | All OKRs with KR breakdown |
| `/okrs/1`, `/okrs/2`, `/okrs/3` | Individual OKR detail — full KR data, evidence notes |
| `/intake` | Studio intake kanban by pathway |
| `/measurement` | Three-tier measurement framework |
| `/connections` | How this would connect in a live system |

---

## Tech stack

- **React 19** with Vite
- **Tailwind CSS** for styling
- **Recharts** for charts
- **React Router** (hash-based for GitHub Pages compatibility)
- **Lucide React** for icons

---

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `vite build` then pushes the `dist/` folder to the `gh-pages` branch via `gh-pages`.

**First-time setup:**
1. Create a GitHub repository named `exd-okr-dashboard`
2. Push this code to `main`
3. In repository Settings → Pages, set source to `gh-pages` branch
4. Run `npm run deploy`

The `vite.config.js` base path and `package.json` homepage are already configured for `https://asmithdigital.github.io/exd-okr-dashboard`.

---

## Making it live — recommended order

1. Agree on the Jira tagging convention as a team
2. Set up Jira API connection (Jira admin creates API token, dashboard reads tag counts)
3. Request Figma API access
4. Agree analytics pipeline with platform team
5. Replace mock data in `src/data/mockData.js` with live API calls
6. Prototype the Claude monthly synthesis prompt

Each step is independent — you can go live with Jira integration before Figma or analytics are connected.
