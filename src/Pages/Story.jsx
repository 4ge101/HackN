import { useParams, useNavigate } from 'react-router-dom'
import { useComments } from '../hooks/useComments'
import { timeAgo } from '../utils/timeAgo'
import { formatUrl } from '../utils/formatUrl'
import { sanitizeHtml } from '../utils/sanitizeHtml'
import CommentTree from '../components/CommentTree'

export default function Story({ theme }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { story, comments, loading, error } = useComments(id)
  const isDark = theme === 'dark'

  if (loading && !story) {
    return (
      <div style={{ flex: 1, background: isDark ? '#000' : '#fff', padding: 40, fontFamily: 'Poppins', color: isDark ? '#555' : '#999' }}>
        loading...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ flex: 1, background: isDark ? '#000' : '#fff', padding: 40, fontFamily: 'Poppins', color: 'red' }}>
        Error: {error.message}
      </div>
    )
  }

  if (!story) return null

  const domain = formatUrl(story.url)

  return (
    <div style={{ flex: 1, background: isDark ? '#000' : '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '24px 20px 60px' }}>

        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: 'var(--primary-color, #ff8500)', fontFamily: 'Poppins', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 20 }}
        >
          ← back
        </button>

        <h1 style={{ fontSize: 20, fontWeight: 600, color: isDark ? '#fff' : '#111', fontFamily: 'Poppins', lineHeight: 1.4, marginBottom: 6 }}>
          {story.url ? (
            <a href={story.url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              {story.title}
            </a>
          ) : story.title}
        </h1>

        {domain && (
          <p style={{ fontSize: 12, color: isDark ? '#555' : '#999', fontFamily: 'Poppins', marginBottom: 10 }}>
            {domain}
          </p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 13, color: isDark ? '#555' : '#999', fontFamily: 'Poppins', marginBottom: 20 }}>
          <span style={{ color: 'var(--primary-color, #ff8500)', fontWeight: 600 }}>▲ {story.score}</span>
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
          <span>{story.descendants ?? 0} comments</span>
        </div>

        {story.text && (
          <div
            style={{ fontSize: 14, color: isDark ? '#aaa' : '#444', lineHeight: 1.7, fontFamily: 'Poppins', marginBottom: 24, padding: 16, background: isDark ? '#0a0a0a' : '#f9f9f9', borderRadius: 8, border: `1px solid ${isDark ? '#1a1a1a' : '#efefef'}` }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(story.text) }}
          />
        )}

        <hr style={{ border: 'none', borderTop: `1px solid ${isDark ? '#1a1a1a' : '#efefef'}`, marginBottom: 24 }} />

        <CommentTree comments={comments} loading={loading} theme={theme} />
      </div>
    </div>
  )
}