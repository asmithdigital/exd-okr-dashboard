import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BarChart3, FileText } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard, end: true },
  { label: 'How We Measure', to: '/measurement', icon: BarChart3 },
  { label: 'Decision Documentation', to: '/decisions', icon: FileText },
]

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside
        className="fixed inset-y-0 left-0 flex flex-col z-20"
        style={{ width: 228, backgroundColor: '#0F1729' }}
      >
        <div className="px-5 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="text-white font-bold text-sm tracking-wide">EXD</div>
          <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            OKR Dashboard
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive ? 'font-medium' : 'hover:bg-white/5'
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? '#C4964A' : 'rgba(255,255,255,0.5)',
                backgroundColor: isActive ? 'rgba(196,150,74,0.12)' : undefined,
              })}
            >
              <Icon size={15} strokeWidth={isActive => (isActive ? 2 : 1.5)} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div
          className="px-5 py-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.25)', fontSize: 11 }}
        >
          RAA Experience Design
        </div>
      </aside>

      <main
        className="flex-1"
        style={{ marginLeft: 228, backgroundColor: '#f1f5f9', minHeight: '100vh' }}
      >
        <div className="max-w-5xl mx-auto px-8 py-10">{children}</div>
      </main>
    </div>
  )
}
