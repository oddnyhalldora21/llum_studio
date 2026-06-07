import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function ProfilePage() {
  const { user, fullName, signOut } = useAuthStore()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  const nameParts = fullName?.split(' ') ?? []
  const firstName = nameParts[0] ?? '—'
  const lastName = nameParts.slice(1).join(' ') || '—'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f0eb' }}>

      <div className="px-8 pt-24">
        <div className="border-t" style={{ borderColor: '#5c1a1a' }} />
      </div>

      <div className="flex">

        <div className="hidden md:block w-56 shrink-0 px-8 py-12">
          <p className="text-xs tracking-widest uppercase" style={{ color: '#5c1a1a' }}>Account</p>
        </div>

        <div className="flex-1 px-8 md:px-16 py-12">

          <div className="flex items-start justify-between mb-12">
            <p className="text-2xl md:text-3xl font-light leading-relaxed max-w-2xl" style={{ color: '#5c1a1a' }}>
              Hi, {fullName || user?.email}. Need help with an order or have questions about your account? Please email{' '}
              <a href="mailto:hello@llumstudio.com" className="underline hover:opacity-60 transition-opacity">
                hello@llumstudio.com
              </a>.
            </p>
            <button
              onClick={handleSignOut}
              className="shrink-0 ml-8 px-6 py-2 text-sm tracking-wide border transition-opacity hover:opacity-60"
              style={{ borderColor: '#5c1a1a', color: '#5c1a1a' }}
            >
              Sign Out
            </button>
          </div>

          <div className="border-t pt-8" style={{ borderColor: '#5c1a1a20' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#5c1a1a60' }}>First Name</p>
                <p className="text-base font-light" style={{ color: '#5c1a1a' }}>{firstName}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#5c1a1a60' }}>Last Name</p>
                <p className="text-base font-light" style={{ color: '#5c1a1a' }}>{lastName}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#5c1a1a60' }}>Email</p>
                <p className="text-base font-light" style={{ color: '#5c1a1a' }}>{user?.email}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfilePage