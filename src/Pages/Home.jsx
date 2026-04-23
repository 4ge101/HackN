import { useStories } from "../hooks/useStories";
import { useSearch } from "../hooks/useSearch";
import { useKeyboardNav } from "../hooks/useKeyboardNav";
import { useBookmarks } from "../hooks/useBookmarks";
import StoryList from "../components/StoryList";

export default function Home({ feed, theme }) {
  const { stories, loading, error, hasMore, loadMore } = useStories(feed);
  const { query, setQuery, filtered } = useSearch(stories);
  const bookmarks = useBookmarks();

  useKeyboardNav(filtered, bookmarks.toggle);

  if (error) {
    return (
      <div style={{ padding: 20, color: "red", fontFamily: "Poppins" }}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        background: theme === "dark" ? "#000" : "#fff",
        minHeight: "100vh",
        color: theme === "dark" ? "#fff" : "#111",
      }}
    >
      {query && (
        <div
          style={{
            padding: "10px 20px",
            fontFamily: "Poppins",
            fontSize: 13,
            color: theme === "dark" ? "#555" : "#999",
            borderBottom: `1px solid ${theme === "dark" ? "#1a1a1a" : "#efefef"}`,
          }}
        >
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "
          {query}"
        </div>
      )}

      <StoryList
        stories={filtered}
        loading={loading}
        hasMore={hasMore && !query}
        onLoadMore={loadMore}
        theme={theme}
      />
    </div>
  );
}
