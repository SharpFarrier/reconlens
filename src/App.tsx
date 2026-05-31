import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/hooks/useAuth'
import Layout from '@/components/layout/Layout'
import LoginPage from '@/components/pages/LoginPage'
import UploadPage from '@/components/pages/UploadPage'
import ReconPage from '@/components/pages/ReconPage'
import MasterPage from '@/components/pages/MasterPage'
import OrdersPage from '@/components/pages/OrdersPage'
import AccuracyPage from '@/components/pages/AccuracyPage'
import FlagsPage from '@/components/pages/FlagsPage'
import RefundsPage from '@/components/pages/RefundsPage'
import InboxPage from '@/components/pages/InboxPage'
import DelayedPage from '@/components/pages/DelayedPage'
import PricingPage from '@/components/pages/PricingPage'
import DiscountsPage from '@/components/pages/DiscountsPage'
import RateCardPage from '@/components/pages/RateCardPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <div className="spinner" style={{ width: '20px', height: '20px' }} />
    </div>
  )
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/recon" replace />} />
          <Route path="upload"    element={<UploadPage />} />
          <Route path="recon"     element={<ReconPage />} />
          <Route path="master"    element={<MasterPage />} />
          <Route path="orders"    element={<OrdersPage />} />
          <Route path="delayed"   element={<DelayedPage />} />
          <Route path="accuracy"  element={<AccuracyPage />} />
          <Route path="refunds"   element={<RefundsPage />} />
          <Route path="flags"     element={<FlagsPage />} />
          <Route path="inbox"     element={<InboxPage />} />
          <Route path="ratecard"  element={<RateCardPage />} />
          <Route path="pricing"   element={<PricingPage />} />
          <Route path="discounts" element={<DiscountsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/recon" replace />} />
      </Routes>
    </AuthProvider>
  )
}
