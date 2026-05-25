import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import OKRList from './pages/OKRList'
import OKRDetail from './pages/OKRDetail'
import Intake from './pages/Intake'
import Measurement from './pages/Measurement'
import Connections from './pages/Connections'

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/okrs" element={<OKRList />} />
          <Route path="/okrs/:id" element={<OKRDetail />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/measurement" element={<Measurement />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
