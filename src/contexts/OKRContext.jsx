import { createContext, useContext, useState, useCallback } from 'react'
import { ALL_OKRS } from '../data/okrData'

const STORAGE_KEY = 'exd-okr-data'

function buildInitialState() {
  const krStatus = {}
  const krProgress = {}
  const krMilestones = {}
  const evidence = {}

  for (const okr of ALL_OKRS) {
    for (const kr of okr.krs) {
      krStatus[kr.id] = kr.initialStatus
      if (kr.type === 'quantitative') {
        const prog = { current: kr.current }
        if (kr.secondaryMetric) prog.secondaryCurrent = kr.secondaryMetric.current
        krProgress[kr.id] = prog
      }
      if (kr.type === 'binary') {
        krMilestones[kr.id] = [...(kr.initialMilestones || kr.milestones.map(() => false))]
      }
      evidence[kr.id] = [...(kr.initialEvidence || [])]
    }
  }

  return { krStatus, krProgress, krMilestones, evidence }
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // storage full or unavailable
  }
}

const OKRContext = createContext(null)

export function OKRProvider({ children }) {
  const [data, setData] = useState(() => {
    const stored = loadFromStorage()
    if (stored) return stored
    const initial = buildInitialState()
    saveToStorage(initial)
    return initial
  })

  const update = useCallback(updater => {
    setData(prev => {
      const next = updater(prev)
      saveToStorage(next)
      return next
    })
  }, [])

  const setKRStatus = useCallback(
    (krId, status) => {
      update(prev => ({ ...prev, krStatus: { ...prev.krStatus, [krId]: status } }))
    },
    [update]
  )

  const setKRProgress = useCallback(
    (krId, current) => {
      update(prev => ({
        ...prev,
        krProgress: {
          ...prev.krProgress,
          [krId]: { ...(prev.krProgress[krId] || {}), current },
        },
      }))
    },
    [update]
  )

  const setKRSecondaryProgress = useCallback(
    (krId, secondaryCurrent) => {
      update(prev => ({
        ...prev,
        krProgress: {
          ...prev.krProgress,
          [krId]: { ...(prev.krProgress[krId] || {}), secondaryCurrent },
        },
      }))
    },
    [update]
  )

  const toggleMilestone = useCallback(
    (krId, index) => {
      update(prev => {
        const milestones = [...(prev.krMilestones[krId] || [])]
        milestones[index] = !milestones[index]
        return { ...prev, krMilestones: { ...prev.krMilestones, [krId]: milestones } }
      })
    },
    [update]
  )

  const addEvidence = useCallback(
    (krId, entry) => {
      update(prev => {
        const existing = prev.evidence[krId] || []
        return { ...prev, evidence: { ...prev.evidence, [krId]: [entry, ...existing] } }
      })
    },
    [update]
  )

  return (
    <OKRContext.Provider
      value={{ data, setKRStatus, setKRProgress, setKRSecondaryProgress, toggleMilestone, addEvidence }}
    >
      {children}
    </OKRContext.Provider>
  )
}

export function useOKR() {
  return useContext(OKRContext)
}
