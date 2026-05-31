import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const NAV = [
  { group: 'Setup', items: [
    { to: '/upload', label: 'Upload & Process', icon: '↑' },
  ]},
  { group: 'Reports', items: [
    { to: '/master',   label: 'Master Dashboard',  icon: '▦' },
    { to: '/orders',   label: 'Orders & Shipments', icon: '≡' },
    { to: '/recon',    label: 'Reconciliation',     icon: '✓' },
    { to: '/inbox',    label: 'Settlement Inbox',   icon: '✉' },
  ]},
  { group: 'Investigate', items: [
    { to: '/delayed',  label: 'Not Paid',          icon: '⏱' },
    { to: '/accuracy', label: 'Payment Accuracy',  icon: '⚖' },
    { to: '/refunds',  label: 'Refunds',           icon: '↩' },
    { to: '/flags',    label: 'All Flags',         icon: '⚑' },
  ]},
  { group: 'Settings', items: [
    { to: '/ratecard',  label: 'Rate Card',        icon: '§' },
    { to: '/pricing',   label: 'Pricing Master',   icon: '₹' },
    { to: '/discounts', label: 'Discount Events',  icon: '%' },
  ]},
]

export default function Layout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <nav className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-mark">R</div>
          <span className="sidebar-logo-text">ReconLens</span>
          <span className="sidebar-logo-version">v3</span>
        </div>

        {/* Nav */}
        <div className="sidebar-nav">
          {NAV.map(({ group, items }) => (
            <div key={group}>
              <div className="sidebar-section">{group}</div>
              {items.map(({ to, label, icon }) => (
                <NavLink
                  key={to} to={to}
                  className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
                >
                  <span style={{ fontSize: '12px', width: '16px', textAlign: 'center', flexShrink: 0 }}>{icon}</span>
                  {label}
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user">{user?.email}</div>
          <button className="btn btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
