import { useBookmarks } from '../hooks/useBookmarks'
import StoryItem from '../components/StoryItem'

export default function Saved({ theme }) {
  const bookmarks = useBookmarks()
  const isDark = theme === 'dark'

  return (
    <div style={{
      flex: 1,
      background: isDark ? '#000' : '#fff',
      minHeight: '100vh',
    }}>
      <div style={{
        padding: '20px 24px',
        borderBottom: `1px solid ${isDark ? '#1a1a1a' : '#efefef'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h2 style={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 20,
            color: '#ff8500',
            marginBottom: 2,
          }}>
            Bookmarks
          </h2>
          <p style={{ fontFamily: 'Poppins', fontSize: 13, color: isDark ? '#555' : '#999' }}>
            {bookmarks.items.length} saved {bookmarks.items.length === 1 ? 'story' : 'stories'}
          </p>
        </div>
        {bookmarks.items.length > 0 && (
          <button
            onClick={() => bookmarks.items.forEach(s => bookmarks.remove(s.id))}
            style={{
              background: 'none',
              border: `1px solid ${isDark ? '#2a2a2a' : '#e0e0e0'}`,
              borderRadius: 6,
              padding: '6px 14px',
              color: isDark ? '#555' : '#999',
              fontFamily: 'Poppins',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            clear all
          </button>
        )}
      </div>

      {bookmarks.items.length === 0 ? (
        <div style={{
          padding: 60,
          textAlign: 'center',
          fontFamily: 'Poppins',
          color: isDark ? '#333' : '#ccc',
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>♡</div>
          <p style={{ fontSize: 14 }}>No bookmarks yet</p>
          <p style={{ fontSize: 12, marginTop: 6 }}>Hover over a story and click ♡ to save it</p>
        </div>
      ) : (
        bookmarks.items.map((story, i) => (
          <StoryItem key={story.id} story={story} rank={i + 1} theme={theme} />
        ))
      )}
    </div>
  )
}