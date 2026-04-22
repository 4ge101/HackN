import { useState, useEffect, useRef } from 'react'
import { useNotes } from '../hooks/useNotes'
import { timeAgo } from '../utils/timeAgo'

export default function NoteModal({ story, theme, onClose }) {
  const { getNote, setNote, deleteNote } = useNotes()
  const existing = getNote(story.id)
  const [text, setText] = useState(existing?.text || '')
  const textareaRef = useRef()
  const isDark = theme === 'dark'

  useEffect(() => {
    textareaRef.current?.focus()
    // Close on Escape
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  function save() {
    setNote(story.id, text)
    onClose()
  }

  function remove() {
    deleteNote(story.id)
    onClose()
  }

  const bg      = isDark ? '#111' : '#fff'
  const border  = isDark ? '#2a2a2a' : '#e0e0e0'
  const text2   = isDark ? '#fff' : '#111'
  const muted   = isDark ? '#666' : '#999'
  const inputBg = isDark ? '#1a1a1a' : '#f5f5f5'

  return (
    // Backdrop
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      {/* Modal */}
      <div style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 12,
        width: '100%',
        maxWidth: 480,
        padding: 24,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <p style={{
              fontFamily: 'Poppins',
              fontSize: 13,
              fontWeight: 500,
              color: text2,
              lineHeight: 1.4,
              flex: 1,
            }}>
              {story.title}
            </p>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: muted, cursor: 'pointer', fontSize: 18, lineHeight: 1, flexShrink: 0 }}
            >
              ✕
            </button>
          </div>
          <p style={{ fontFamily: 'Poppins', fontSize: 11, color: muted, marginTop: 4 }}>
            {existing ? `Last edited ${timeAgo(existing.updatedAt / 1000)}` : 'Add a private note'}
          </p>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write your note here..."
          rows={5}
          style={{
            width: '100%',
            background: inputBg,
            border: `1px solid ${border}`,
            borderRadius: 8,
            padding: '12px 14px',
            fontFamily: 'Poppins',
            fontSize: 14,
            color: text2,
            resize: 'vertical',
            outline: 'none',
            lineHeight: 1.6,
            marginBottom: 16,
          }}
        />

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          {existing && (
            <button
              onClick={remove}
              style={{
                background: 'none',
                border: `1px solid ${border}`,
                borderRadius: 6,
                padding: '8px 16px',
                color: '#e63946',
                fontFamily: 'Poppins',
                fontSize: 13,
                cursor: 'pointer',
                marginRight: 'auto',
              }}
            >
              Delete note
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: `1px solid ${border}`,
              borderRadius: 6,
              padding: '8px 16px',
              color: muted,
              fontFamily: 'Poppins',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={save}
            style={{
              background: 'var(--primary-color, #ff8500)',
              border: 'none',
              borderRadius: 6,
              padding: '8px 20px',
              color: 'white',
              fontFamily: 'Poppins',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Save note
          </button>
        </div>
      </div>
    </div>
  )
}