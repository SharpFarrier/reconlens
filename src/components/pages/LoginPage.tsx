import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const { signIn, user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) navigate('/recon', { replace: true })
  }, [user, loading, navigate])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexDirection: 'column', gap: '20px',
      background: 'var(--bg-primary)',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div style={{ width: '36px', height: '36px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: 'white' }}>R</div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.3px' }}>ReconLens</div>
          <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Settlement reconciliation</div>
        </div>
      </div>

      {/* Card */}
      <div style={{
        background: 'var(--bg-secondary)', border: '1px solid var(--border)',
        borderRadius: '12px', padding: '28px 32px', width: '340px',
        display: 'flex', flexDirection: 'column', gap: '16px',
      }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Sign in to continue</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Honey Touch operations team only</div>
        </div>

        <button onClick={signIn} className="btn btn-primary" style={{ justifyContent: 'center', padding: '10px', fontSize: '13px', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M15.5 8.16c0-.56-.05-1.1-.14-1.62H8v3.07h4.2a3.59 3.59 0 01-1.56 2.35v1.95h2.52C14.6 12.58 15.5 10.54 15.5 8.16z" fill="#4285F4"/>
            <path d="M8 16c2.11 0 3.88-.7 5.17-1.89l-2.52-1.95c-.7.47-1.59.74-2.65.74-2.04 0-3.77-1.38-4.39-3.23H1.02v2.01A7.99 7.99 0 008 16z" fill="#34A853"/>
            <path d="M3.61 9.67A4.8 4.8 0 013.36 8c0-.58.1-1.15.25-1.67V4.32H1.02A8 8 0 000 8c0 1.29.31 2.51.85 3.59l2.76-1.92z" fill="#FBBC05"/>
            <path d="M8 3.18c1.15 0 2.18.4 2.99 1.17l2.24-2.24A7.97 7.97 0 008 0 7.99 7.99 0 001.02 4.32l2.59 2.01C4.23 4.56 5.96 3.18 8 3.18z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
          Access restricted to authorized accounts
        </div>
      </div>
    </div>
  )
}
