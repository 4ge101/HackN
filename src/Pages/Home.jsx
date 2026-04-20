import { useStories } from "../hooks/useStories";
import StoryList from "../components/StoryList";

export default function Home({ feed }) {
  const { stories, loading, error, hasMore, loadMore } = useStories(feed);

  console.log("stories:", stories.length, "loading:", loading, "error:", error);

  if (error) {
    return (
      <div style={{ padding: 20, color: "red", fontFamily: "monospace" }}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 860,
        margin: "0 auto",
        background: "#000000",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <StoryList
        stories={stories}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </div>
  );
}
