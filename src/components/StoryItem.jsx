import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { timeAgo } from '../utils/timeAgo';
import { formatUrl } from '../utils/formatUrl';
import { useBookmarks, useFavourites } from '../hooks/useBookmarks';
import { useNotes } from '../hooks/useNotes';
import NoteModal from './NoteModal';
import NoteIcon from '../assets/icons/note.svg';

function AnimatedNumber({ value }) {
  return <span>{value}</span>
}

export default function StoryItem({ story, rank, theme }) {
  const navigate   = useNavigate()
  const bookmarks  = useBookmarks()
  const favourites = useFavourites()
  const { hasNote } = useNotes()
  const [hovered, setHovered]     = useState(false)
  const [showNote, setShowNote]   = useState(false)

  if (!story) return null

  const domain       = formatUrl(story.url)
  const isDark       = theme === 'dark'
  const isBookmarked = bookmarks.has(story.id)
  const isFavourited = favourites.has(story.id)
  const hasNoteFlag  = hasNote(story.id)

  return (
    <>
      <div
        id={`story-${story.id}`}
        style={{
          display: 'grid',
          gridTemplateColumns: '36px 1fr auto',
          gap: '0 10px',
          padding: '18px 20px',
          borderBottom: `1px solid ${isDark ? '#1a1a1a' : '#efefef'}`,
          background: hovered ? (isDark ? '#0d0d0d' : '#fafafa') : 'transparent',
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
              style={{ fontSize: 16, fontWeight: 500, cursor: 'pointer', color: isDark ? '#fff' : '#111', lineHeight: 1.4 }}
              onClick={() =>
                story.url
                  ? window.open(story.url, '_blank', 'noreferrer')
                  : navigate(`/item/${story.id}`)
              }
            >
              {story.title}
            </span>
            {domain && (
              <span style={{ fontSize: 11, color: isDark ? '#444' : '#bbb' }}>({domain})</span>
            )}
            {hasNoteFlag && (
              <span
                onClick={() => setShowNote(true)}
                title="Has note"
                style={{
                  fontSize: 10,
                  background: 'var(--primary-color, #ff8500)',
                  color: 'white',
                  padding: '1px 7px',
                  borderRadius: 20,
                  cursor: 'pointer',
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                note
              </span>
            )}
          </div>

          <div style={{ fontSize: 12, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', color: isDark ? '#555' : '#999' }}>
            <span style={{ color: 'var(--primary-color, #ff8500)', fontWeight: 600 }}>
              ▲ <AnimatedNumber value={story.score ?? 0} />
            </span>
            <span>·</span>
            <span
              style={{ color: 'var(--primary-color, #ff8500)', cursor: 'pointer' }}
              onClick={() => navigate(`/user/${story.by}`)}
            >
              {story.by}
            </span>
            <span>·</span>
            <span>{timeAgo(story.time)}</span>
            <span>·</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/item/${story.id}`)}>
              {story.descendants ?? 0} comments
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hovered || hasNoteFlag || isBookmarked || isFavourited ? 1 : 0,
          transition: 'opacity 0.15s',
        }}>
          
          <button
            title="Add note"
            onClick={() => setShowNote(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
            }}
          >
            <img src={NoteIcon} alt="note icon" />
          </button>

          <button
            title="Bookmark (b)"
            onClick={() => bookmarks.toggle(story)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              transform: isBookmarked ? 'scale(1.2)' : 'scale(1)',
              transition: 'transform 0.1s',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24"
              fill={isBookmarked ? '#ff8500' : 'none'}
              stroke={isBookmarked ? '#ff8500' : (isDark ? '#444' : '#ccc')}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 22H6C4.89543 22 4 21.1046 4 20M4 20C4 18.8954 4.89543 18 6 18H18C19.1046 18 20 17.1046 20 16V2C20 3.10457 19.1046 4 18 4L10 4C7.17157 4 5.75736 4 4.87868 4.87868C4 5.75736 4 7.17157 4 10V20Z" />
              <path d="M9 4V12L12 9L15 12V4" />
              <path d="M18.5 18C18.5 18 17.5 18.7628 17.5 20C17.5 21.2372 18.5 22 18.5 22" />
            </svg>
          </button>

          <button
            title="Favourite"
            onClick={() => favourites.toggle(story)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              transform: isFavourited ? 'scale(1.2)' : 'scale(1)',
              transition: 'transform 0.1s',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24"
              fill={isFavourited ? '#ff8500' : 'none'}
              stroke={isFavourited ? '#ff8500' : (isDark ? '#444' : '#ccc')}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z" />
            </svg>
          </button>
        </div>
      </div>

      {showNote && (
        <NoteModal
          story={story}
          theme={theme}
          onClose={() => setShowNote(false)}
        />
      )}
    </>
  )
}