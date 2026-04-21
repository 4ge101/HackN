import { NavLink } from 'react-router-dom'
import { useBookmarks, useFavourites } from '../hooks/useBookmarks'

export default function Sidebar({ theme, onThemeToggle }) {
  const bookmarks  = useBookmarks()
  const favourites = useFavourites()

  const isDark = theme === 'dark'

  const NAV_ITEMS = [
    { to: '/',         label: 'Home',       icon: '⌂', badge: null },
    { to: '/new',      label: 'Trending',   icon: '↑', badge: null },
    { to: '/saved',    label: 'Bookmarks',  icon: '♡', badge: bookmarks.items.length },
    { to: '/favourites', label: 'Favourites', icon: '★', badge: favourites.items.length },
    { to: '/settings', label: 'Settings',   icon: '⚙', badge: null },
  ]

  return (
    <aside style={{
      width: 220,
      minHeight: '100vh',
      background: isDark ? '#0a0a0a' : '#f5f5f5',
      borderRight: `1px solid ${isDark ? '#1f1f1f' : '#e0e0e0'}`,
      padding: '24px 0',
      position: 'sticky',
      top: 0,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Nav links */}
      <div style={{ flex: 1 }}>
        {NAV_ITEMS.map(({ to, label, icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '13px 24px',
              color: isActive ? '#ff8500' : isDark ? '#888' : '#555',
              textDecoration: 'none',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              background: isActive
                ? 'rgba(255,133,0,0.08)'
                : 'transparent',
              borderLeft: isActive
                ? '3px solid #ff8500'
                : '3px solid transparent',
              transition: 'all 0.15s',
            })}
          >
            <span style={{ fontSize: 17, width: 20, textAlign: 'center' }}>
              {icon}
            </span>
            <span style={{ flex: 1 }}>{label}</span>
            {badge > 0 && (
              <span style={{
                background: '#ff8500',
                color: 'white',
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: 20,
                fontFamily: 'Poppins, sans-serif',
                minWidth: 20,
                textAlign: 'center',
              }}>
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Theme toggle at bottom */}
      <div style={{ padding: '16px 24px', borderTop: `1px solid ${isDark ? '#1f1f1f' : '#e0e0e0'}` }}>
        <button
          onClick={onThemeToggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'none',
            border: `1px solid ${isDark ? '#2a2a2a' : '#ddd'}`,
            borderRadius: 8,
            padding: '10px 16px',
            color: isDark ? '#888' : '#555',
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 13,
            width: '100%',
            transition: 'all 0.15s',
          }}
        >
          <span style={{ fontSize: 16 }}>{isDark ? '☀' : '☾'}</span>
          {isDark ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </aside>
  )
}