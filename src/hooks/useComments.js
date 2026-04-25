import { useState, useEffect } from "react";
import { fetchItem, fetchItems } from "../services/hnApi";

async function buildCommentTree(ids, depth = 0, maxDepth = 4) {
  if (!ids || ids.length === 0 || depth > maxDepth) return [];
  const items = await fetchItems(ids.slice(0, 20));
  const valid = items.filter((i) => i && !i.deleted && !i.dead);
  return Promise.all(
    valid.map(async (item) => ({
      ...item,
      children: await buildCommentTree(item.kids, depth + 1, maxDepth),
    })),
  );
}

export function useComments(id) {
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const item = await fetchItem(id);
        if (!cancelled) setStory(item);
        const tree = await buildCommentTree(item.kids ?? []);
        if (!cancelled) setComments(tree);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { story, comments, loading, error };
}
