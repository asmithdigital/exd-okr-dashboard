import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { OKRProvider } from './contexts/OKRContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import OKRDetail from './pages/OKRDetail'
import Measurement from './pages/Measurement'
import Decisions from './pages/Decisions'

export default function App() {
  return (
    <OKRProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/okr/:id" element={<OKRDetail />} />
            <Route path="/measurement" element={<Measurement />} />
            <Route path="/decisions" element={<Decisions />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </OKRProvider>
  )
}
