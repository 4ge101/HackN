import { useState, useEffect, useRef } from "react";
import { fetchStoriesPage } from "../services/hnApi";

export function useStories(feed, perPage = 30) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);

  useEffect(() => {
    pageRef.current = 0;
    setPage(0);
    setStories([]);
    setHasMore(true);
    setError(null);

    let cancelled = false;

    async function fetchPage() {
      setLoading(true);
      try {
        console.log("Fetching feed:", feed, "page: 0");
        const result = await fetchStoriesPage(feed, 0, perPage);
        console.log("Got result:", result);
        if (!cancelled) {
          setStories(result.items);
          setHasMore(perPage < result.total);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPage();
    return () => {
      cancelled = true;
    };
  }, [feed]);

  async function loadMore() {
    const next = pageRef.current + 1;
    pageRef.current = next;
    setPage(next);
    setLoading(true);
    try {
      const result = await fetchStoriesPage(feed, next, perPage);
      setStories((prev) => [...prev, ...result.items]);
      setHasMore((next + 1) * perPage < result.total);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { stories, loading, error, hasMore, loadMore };
}
