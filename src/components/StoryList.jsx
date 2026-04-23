import { useEffect, useRef } from "react";
import StoryItem from "./StoryItem";

export default function StoryList({
  stories,
  loading,
  hasMore,
  onLoadMore,
  theme,
}) {
  const sentinelRef = useRef();

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  const isDark = theme === "dark";

  if (loading && stories.length === 0) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          fontFamily: "Poppins",
          color: "#ff8500",
        }}
      >
        loading...
      </div>
    );
  }

  if (!loading && stories.length === 0) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          fontFamily: "Poppins",
          color: isDark ? "#444" : "#bbb",
        }}
      >
        no stories found
      </div>
    );
  }

  return (
    <div>
      {stories.map((story, i) => (
        <StoryItem key={story.id} story={story} rank={i + 1} theme={theme} />
      ))}

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} style={{ padding: 20, textAlign: "center" }}>
        {loading && (
          <span
            style={{ fontFamily: "Poppins", fontSize: 13, color: "#ff8500" }}
          >
            loading more...
          </span>
        )}
        {!loading && !hasMore && (
          <span
            style={{
              fontFamily: "Poppins",
              fontSize: 12,
              color: isDark ? "#333" : "#ccc",
            }}
          >
            you've reached the end
          </span>
        )}
      </div>
    </div>
  );
}
