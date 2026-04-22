import { usePWA } from '../hooks/usePWA'

export default function PWABanner({ theme }) {
  const { canInstall, isOffline, swUpdated, promptInstall, reloadForUpdate } = usePWA()
  const isDark = theme === 'dark'

  if (!canInstall && !isOffline && !swUpdated) return null

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999, display: 'flex', flexDirection: 'column', gap: 10 }}>

      {/* Offline indicator */}
      {isOffline && (
        <div style={{
          background: isDark ? '#1a1a1a' : '#fff',
          border: '1px solid #e63946',
          borderRadius: 10,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          fontFamily: 'Poppins',
          maxWidth: 280,
        }}>
          <span style={{ fontSize: 18 }}>📡</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#e63946', marginBottom: 2 }}>You're offline</p>
            <p style={{ fontSize: 11, color: isDark ? '#666' : '#999' }}>Showing cached stories</p>
          </div>
        </div>
      )}

      {/* Update available */}
      {swUpdated && (
        <div style={{
          background: isDark ? '#1a1a1a' : '#fff',
          border: `1px solid var(--primary-color, #ff8500)`,
          borderRadius: 10,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          fontFamily: 'Poppins',
          maxWidth: 280,
        }}>
          <span style={{ fontSize: 18 }}>🔄</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: isDark ? '#fff' : '#111', marginBottom: 2 }}>Update available</p>
            <p style={{ fontSize: 11, color: isDark ? '#666' : '#999' }}>Reload to get the latest version</p>
          </div>
          <button
            onClick={reloadForUpdate}
            style={{
              background: 'var(--primary-color, #ff8500)',
              border: 'none',
              borderRadius: 6,
              padding: '6px 12px',
              color: 'white',
              fontFamily: 'Poppins',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            Reload
          </button>
        </div>
      )}

      {/* Install prompt */}
      {canInstall && (
        <div style={{
          background: isDark ? '#1a1a1a' : '#fff',
          border: `1px solid var(--primary-color, #ff8500)`,
          borderRadius: 10,
          padding: '14px 16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          fontFamily: 'Poppins',
          maxWidth: 280,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 36,
              height: 36,
              background: 'var(--primary-color, #ff8500)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 14,
              color: 'white',
              fontFamily: 'Poppins',
              flexShrink: 0,
            }}>
              HN
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: isDark ? '#fff' : '#111' }}>Install HN Client</p>
              <p style={{ fontSize: 11, color: isDark ? '#666' : '#999' }}>Add to home screen</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={promptInstall}
              style={{
                flex: 1,
                background: 'var(--primary-color, #ff8500)',
                border: 'none',
                borderRadius: 6,
                padding: '8px 0',
                color: 'white',
                fontFamily: 'Poppins',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Install
            </button>
          </div>
        </div>
      )}
    </div>
  )
}