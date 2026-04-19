import StoryItem from './StoryItem'

export default function StoryList({ stories, loading, hasMore, onLoadMore }) {
  if (loading && stories.length === 0) {
    return <p style={{ padding: 20, fontFamily: 'monospace', color: '#999' }}>loading...</p>
  }

  return (
    <div>
      {stories.map((story, i) => (
        <StoryItem key={story.id} story={story} rank={i + 1} />
      ))}

      {loading && (
        <p style={{ padding: 16, textAlign: 'center', color: '#999', fontFamily: 'monospace' }}>
          loading more...
        </p>
      )}

      {!loading && hasMore && (
        <button
          onClick={onLoadMore}
          style={{
            display: 'block', width: '100%', padding: 14,
            fontSize: 13, color: '#FF6600', background: 'none',
            border: 'none', borderTop: '1px solid #e8e8e0',
            cursor: 'pointer', fontFamily: 'monospace',
          }}
        >
          more stories →
        </button>
      )}
    </div>
  )
}