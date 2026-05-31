import { useAuth } from '@/hooks/useAuth'

export default function FlagsPage() {
  const { user } = useAuth()
  return (
    <div className="fade-in">
      <div className="page-header">
        <span className="page-title">FlagsPage</span>
      </div>
      <div className="page-content">
        <div className="empty">
          <div className="empty-icon">◎</div>
          <div className="empty-title">FlagsPage</div>
          <div className="empty-sub">Signed in as {user?.email}</div>
        </div>
      </div>
    </div>
  )
}
