import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Target, ClipboardList, BarChart3, Plug } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/okrs', label: 'OKR Detail', icon: Target },
  { to: '/intake', label: 'Studio Intake', icon: ClipboardList },
  { to: '/measurement', label: 'Measurement', icon: BarChart3 },
  { to: '/connections', label: 'How It Connects', icon: Plug },
]

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <header style={{ backgroundColor: '#0F1729' }} className="shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: '#C4964A' }}>
                <span className="text-white font-bold text-sm">EX</span>
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg leading-tight">EXD OKR Dashboard</h1>
                <p className="text-slate-400 text-xs">Experience Design Studio · Q2 2025</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                  style={active ? { backgroundColor: '#C4964A' } : {}}
                >
                  <Icon size={15} />
                  <span className="hidden md:inline">{label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {children}
      </main>

      <footer style={{ backgroundColor: '#0F1729' }} className="mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-slate-500 text-xs">
          <span>EXD OKR Dashboard · Internal use only</span>
          <span>Mock data — not live</span>
        </div>
      </footer>
    </div>
  )
}
