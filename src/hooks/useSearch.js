import { useState, useMemo } from "react";

export function useSearch(stories) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return stories;
    const q = query.toLowerCase();
    return stories.filter(
      (s) =>
        s.title?.toLowerCase().includes(q) ||
        s.by?.toLowerCase().includes(q) ||
        s.url?.toLowerCase().includes(q),
    );
  }, [stories, query]);

  return { query, setQuery, filtered };
}
