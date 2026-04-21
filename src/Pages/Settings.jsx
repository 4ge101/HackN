import { useState, useEffect } from 'react'
import { useBookmarks, useFavourites } from '../hooks/useBookmarks'

const PRESET_COLORS = [
  '#ff8500', '#e63946', '#2196f3', '#4caf50',
  '#9c27b0', '#00bcd4', '#ff4081', '#ffeb3b',
  '#ff5722', '#607d8b',
]

function useAccentColor() {
  const [color, setColorState] = useState(() => {
    return localStorage.getItem('hn_accent') || '#ff8500'
  })

  function setColor(newColor) {
    setColorState(newColor)
    localStorage.setItem('hn_accent', newColor)
    // Updates the CSS variable globally — every component using
    // var(--primary-color) will instantly reflect the new accent.
    document.documentElement.style.setProperty('--primary-color', newColor)
  }

  // Sync on mount in case another tab changed it
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', color)
  }, [])

  return { color, setColor }
}

export default function Settings({ theme, onThemeToggle }) {
  const bookmarks  = useBookmarks()
  const favourites = useFavourites()
  const { color, setColor } = useAccentColor()
  const isDark = theme === 'dark'
  const bg     = isDark ? '#000' : '#fff'
  const border = isDark ? '#1a1a1a' : '#efefef'
  const cardBg = isDark ? '#0a0a0a' : '#f9f9f9'
  const text   = isDark ? '#fff' : '#111'
  const muted  = isDark ? '#555' : '#999'

  function exportData() {
    const data = { bookmarks: bookmarks.items, favourites: favourites.items, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'hn-data.json'; a.click()
    URL.revokeObjectURL(url)
  }

  const Section = ({ title, children }) => (
    <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 10, marginBottom: 16, overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${border}`, fontFamily: 'Poppins', fontSize: 11, fontWeight: 600, color: muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{title}</div>
      {children}
    </div>
  )

  const Row = ({ label, desc, action, noBorder }) => (
    <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: noBorder ? 'none' : `1px solid ${border}` }}>
      <div>
        <p style={{ fontFamily: 'Poppins', fontSize: 14, color: text, marginBottom: 2 }}>{label}</p>
        {desc && <p style={{ fontFamily: 'Poppins', fontSize: 12, color: muted }}>{desc}</p>}
      </div>
      {action}
    </div>
  )

  return (
    <div style={{ flex: 1, background: bg, minHeight: '100vh', padding: '28px 32px', maxWidth: 640, overflowY: 'auto' }}>
      {/* Title uses CSS var — updates instantly when color changes */}
      <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 22, color: 'var(--primary-color)', marginBottom: 24 }}>Settings</h2>

      <Section title="Appearance">
        <Row
          label="Theme"
          desc={isDark ? 'Currently dark mode' : 'Currently light mode'}
          action={
            <button onClick={onThemeToggle} style={{ background: 'var(--primary-color)', border: 'none', borderRadius: 6, padding: '8px 18px', color: 'white', fontFamily: 'Poppins', fontSize: 13, cursor: 'pointer' }}>
              {isDark ? '☀ Light' : '☾ Dark'}
            </button>
          }
        />

        <div style={{ padding: '20px 20px' }}>
          <p style={{ fontFamily: 'Poppins', fontSize: 14, color: text, marginBottom: 4 }}>Accent color</p>
          <p style={{ fontFamily: 'Poppins', fontSize: 12, color: muted, marginBottom: 16 }}>Changes the highlight color across the entire app</p>

          {/* Preset swatches */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {PRESET_COLORS.map(c => (
              <button key={c} onClick={() => setColor(c)} title={c} style={{ width: 34, height: 34, borderRadius: '50%', background: c, border: color === c ? `3px solid ${isDark ? '#fff' : '#000'}` : '3px solid transparent', cursor: 'pointer', transition: 'transform 0.15s', transform: color === c ? 'scale(1.25)' : 'scale(1)', outline: 'none', flexShrink: 0 }} />
            ))}
          </div>

          {/* Color wheel */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', background: isDark ? '#111' : '#f0f0f0', borderRadius: 10, border: `1px solid ${border}` }}>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, background: 'none' }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Poppins', fontSize: 13, color: text, marginBottom: 6 }}>Pick any color</p>
              <input
                type="text"
                value={color.toUpperCase()}
                onChange={e => { if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setColor(e.target.value) }}
                style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 13, color: text, background: isDark ? '#1a1a1a' : '#e8e8e8', border: `1px solid ${border}`, borderRadius: 6, padding: '6px 10px', width: 100, outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end', flexShrink: 0 }}>
              <span style={{ fontFamily: 'Poppins', fontSize: 13, color: 'var(--primary-color)', fontWeight: 600 }}>▲ 342 points</span>
              <span style={{ background: 'var(--primary-color)', color: 'white', fontFamily: 'Poppins', fontSize: 11, padding: '3px 12px', borderRadius: 20, fontWeight: 600 }}>preview</span>
              <span style={{ fontFamily: 'Poppins', fontSize: 11, color: 'var(--primary-color)' }}>username</span>
            </div>
          </div>

          {color !== '#ff8500' && (
            <button onClick={() => setColor('#ff8500')} style={{ marginTop: 12, background: 'none', border: `1px solid ${border}`, borderRadius: 6, padding: '6px 14px', color: muted, fontFamily: 'Poppins', fontSize: 12, cursor: 'pointer' }}>
              ↺ Reset to default orange
            </button>
          )}
        </div>
      </Section>

      <Section title="Data">
        <Row label="Bookmarks" desc={`${bookmarks.items.length} saved stories`} action={<button onClick={() => { if (window.confirm('Clear all bookmarks?')) bookmarks.items.forEach(s => bookmarks.remove(s.id)) }} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, padding: '7px 14px', color: muted, fontFamily: 'Poppins', fontSize: 12, cursor: 'pointer' }}>clear</button>} />
        <Row label="Favourites" desc={`${favourites.items.length} starred stories`} action={<button onClick={() => { if (window.confirm('Clear all favourites?')) favourites.items.forEach(s => favourites.remove(s.id)) }} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, padding: '7px 14px', color: muted, fontFamily: 'Poppins', fontSize: 12, cursor: 'pointer' }}>clear</button>} />
        <div style={{ padding: '16px 20px' }}>
          <button onClick={exportData} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, padding: '8px 18px', color: 'var(--primary-color)', fontFamily: 'Poppins', fontSize: 13, cursor: 'pointer' }}>↓ Export all data as JSON</button>
        </div>
      </Section>

      <Section title="Keyboard shortcuts">
        {[['j','Next story'],['k','Previous story'],['o','Open story link'],['c','Open comments'],['b','Bookmark selected story']].map(([key, desc], i, arr) => (
          <Row key={key} label={desc} noBorder={i === arr.length - 1} action={<kbd style={{ background: isDark ? '#1a1a1a' : '#eee', border: `1px solid ${border}`, borderRadius: 4, padding: '3px 10px', fontFamily: 'Roboto Mono, monospace', fontSize: 13, color: text }}>{key}</kbd>} />
        ))}
      </Section>
    </div>
  )
}