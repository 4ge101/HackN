import { useBookmarks, useFavourites } from '../hooks/useBookmarks'

export default function Settings({ theme, onThemeToggle }) {
  const bookmarks  = useBookmarks()
  const favourites = useFavourites()
  const isDark = theme === 'dark'

  const bg      = isDark ? '#000' : '#fff'
  const border  = isDark ? '#1a1a1a' : '#efefef'
  const cardBg  = isDark ? '#0a0a0a' : '#f9f9f9'
  const text    = isDark ? '#fff' : '#111'
  const muted   = isDark ? '#555' : '#999'

  function exportData() {
    const data = {
      bookmarks: bookmarks.items,
      favourites: favourites.items,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url
    a.download = 'hn-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const Section = ({ title, children }) => (
    <div style={{
      background: cardBg,
      border: `1px solid ${border}`,
      borderRadius: 10,
      marginBottom: 16,
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 20px',
        borderBottom: `1px solid ${border}`,
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: 600,
        color: muted,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        {title}
      </div>
      {children}
    </div>
  )

  const Row = ({ label, desc, action }) => (
    <div style={{
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${border}`,
    }}>
      <div>
        <p style={{ fontFamily: 'Poppins', fontSize: 14, color: text, marginBottom: 2 }}>{label}</p>
        {desc && <p style={{ fontFamily: 'Poppins', fontSize: 12, color: muted }}>{desc}</p>}
      </div>
      {action}
    </div>
  )

  return (
    <div style={{ flex: 1, background: bg, minHeight: '100vh', padding: '28px 32px', maxWidth: 640 }}>
      <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 22, color: '#ff8500', marginBottom: 24 }}>
        Settings
      </h2>

      <Section title="Appearance">
        <Row
          label="Theme"
          desc={isDark ? 'Currently using dark mode' : 'Currently using light mode'}
          action={
            <button
              onClick={onThemeToggle}
              style={{
                background: '#ff8500',
                border: 'none',
                borderRadius: 6,
                padding: '8px 16px',
                color: 'white',
                fontFamily: 'Poppins',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {isDark ? '☀ Light' : '☾ Dark'}
            </button>
          }
        />
      </Section>

      <Section title="Data">
        <Row
          label="Bookmarks"
          desc={`${bookmarks.items.length} saved stories`}
          action={
            <button
              onClick={() => { if (confirm('Clear all bookmarks?')) bookmarks.items.forEach(s => bookmarks.remove(s.id)) }}
              style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, padding: '7px 14px', color: muted, fontFamily: 'Poppins', fontSize: 12, cursor: 'pointer' }}
            >
              clear
            </button>
          }
        />
        <Row
          label="Favourites"
          desc={`${favourites.items.length} starred stories`}
          action={
            <button
              onClick={() => { if (confirm('Clear all favourites?')) favourites.items.forEach(s => favourites.remove(s.id)) }}
              style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, padding: '7px 14px', color: muted, fontFamily: 'Poppins', fontSize: 12, cursor: 'pointer' }}
            >
              clear
            </button>
          }
        />
        <div style={{ padding: '16px 20px' }}>
          <button
            onClick={exportData}
            style={{
              background: 'none',
              border: `1px solid ${border}`,
              borderRadius: 6,
              padding: '8px 18px',
              color: '#ff8500',
              fontFamily: 'Poppins',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            ↓ Export all data as JSON
          </button>
        </div>
      </Section>

      <Section title="Keyboard shortcuts">
        {[
          ['j', 'Next story'],
          ['k', 'Previous story'],
          ['o', 'Open story link'],
          ['c', 'Open comments'],
          ['b', 'Bookmark selected story'],
        ].map(([key, desc]) => (
          <Row
            key={key}
            label={desc}
            action={
              <kbd style={{
                background: isDark ? '#1a1a1a' : '#eee',
                border: `1px solid ${border}`,
                borderRadius: 4,
                padding: '3px 10px',
                fontFamily: 'Roboto Mono, monospace',
                fontSize: 13,
                color: text,
              }}>
                {key}
              </kbd>
            }
          />
        ))}
      </Section>
    </div>
  )
}