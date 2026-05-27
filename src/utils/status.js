export const STATUS_OPTIONS = [
  'Not Started',
  'In Progress',
  'On Track',
  'At Risk',
  'Achieved',
  'Blocked',
]

export const STATUS_COLORS = {
  'Not Started': '#6B7280',
  'In Progress': '#6366F1',
  'On Track': '#C4964A',
  'At Risk': '#F59E0B',
  'Achieved': '#10B981',
  'Blocked': '#EF4444',
}

const STATUS_PRIORITY = ['Blocked', 'At Risk', 'Not Started', 'In Progress', 'On Track', 'Achieved']

export function getOKRStatus(okr, krStatus) {
  const statuses = okr.krs.map(kr => krStatus[kr.id] || kr.initialStatus)
  let worstIdx = STATUS_PRIORITY.length - 1
  for (const s of statuses) {
    const idx = STATUS_PRIORITY.indexOf(s)
    if (idx !== -1 && idx < worstIdx) worstIdx = idx
  }
  return STATUS_PRIORITY[worstIdx]
}
