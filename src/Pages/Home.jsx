import { useStories } from "../hooks/useStories";
import StoryList from "../components/StoryList";
import Sidebar from "../components/Sidebar";

export default function Home({ feed }) {
  const { stories, loading, error, hasMore, loadMore } = useStories(feed);

  if (error) {
    return (
      <div style={{ padding: 20, color: "red", fontFamily: "monospace" }}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000' }}>
      <Sidebar />
      <div style={{
        flex: 1,
        maxWidth: 860,
        color: '#fff',
        minHeight: '100vh',
      }}>
        <StoryList
          stories={stories}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </div>
    </div>
  );
}