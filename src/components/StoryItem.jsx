import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { timeAgo } from '../utils/timeAgo'
import { formatUrl } from '../utils/formatUrl'
import { useBookmarks, useFavourites } from '../hooks/useBookmarks'

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef()

  useEffect(() => {
    if (!value) return
    const start = 0
    const end = value
    const duration = 800
    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(start + (end - start) * eased))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value])

  return <span>{display}</span>
}

export default function StoryItem({ story, rank, theme }) {
  const navigate    = useNavigate()
  const bookmarks   = useBookmarks()
  const favourites  = useFavourites()
  const [hovered, setHovered] = useState(false)

  if (!story) return null

  const domain     = formatUrl(story.url)
  const isDark     = theme === 'dark'
  const isBookmarked  = bookmarks.has(story.id)
  const isFavourited  = favourites.has(story.id)

  return (
    <div
      id={`story-${story.id}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '36px 1fr auto',
        gap: '0 10px',
        padding: '18px 20px',
        borderBottom: `1px solid ${isDark ? '#1a1a1a' : '#efefef'}`,
        background: hovered
          ? isDark ? '#0d0d0d' : '#fafafa'
          : 'transparent',
        transition: 'background 0.15s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        fontSize: 14,
        color: isDark ? '#444' : '#bbb',
        textAlign: 'right',
        paddingTop: 3,
        fontFamily: 'Roboto Mono, monospace',
      }}>
        {rank}.
      </div>

      <div>
        <div style={{ marginBottom: 6, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 6 }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer',
              color: isDark ? '#fff' : '#111',
              lineHeight: 1.4,
            }}
            onClick={() =>
              story.url
                ? window.open(story.url, '_blank', 'noreferrer')
                : navigate(`/item/${story.id}`)
            }
          >
            {story.title}
          </span>
          {domain && (
            <span style={{ fontSize: 11, color: isDark ? '#444' : '#bbb' }}>
              ({domain})
            </span>
          )}
        </div>

        <div style={{
          fontSize: 12,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          alignItems: 'center',
          color: isDark ? '#555' : '#999',
        }}>
          <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>
            ▲ <AnimatedNumber value={story.score ?? 0} />
          </span>
          <span>·</span>
          <span
            style={{ color: 'var(--primary-color)', cursor: 'pointer' }}
            onClick={() => navigate(`/user/${story.by}`)}
          >
            {story.by}
          </span>
          <span>·</span>
          <span>{timeAgo(story.time)}</span>
          <span>·</span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/item/${story.id}`)}
          >
            {story.descendants ?? 0} comments
          </span>
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.15s',
      }}>
        <button
          title="Bookmark (b)"
          onClick={() => bookmarks.toggle(story)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            color: isBookmarked ? 'var(--primary-color)' : isDark ? '#444' : '#ccc',  // ← was '#ff8500'
            padding: 4,
            lineHeight: 1,
            transition: 'color 0.15s, transform 0.1s',
            transform: isBookmarked ? 'scale(1.2)' : 'scale(1)',
          }}
        >
          {isBookmarked ? '♥' : '♡'}
        </button>

        <button
          title="Favourite"
          onClick={() => favourites.toggle(story)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            color: isFavourited ? 'var(--primary-color)' : isDark ? '#444' : '#ccc',  // ← was '#ff8500'
            padding: 4,
            lineHeight: 1,
            transition: 'color 0.15s, transform 0.1s',
            transform: isFavourited ? 'scale(1.2)' : 'scale(1)',
          }}
        >
          {isFavourited ? '★' : '☆'}
        </button>
      </div>
    </div>
  )
}