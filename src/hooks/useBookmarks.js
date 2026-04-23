import { useState, useEffect } from "react";

function useLocalList(key) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, key]);

  function add(story) {
    setItems((prev) => {
      if (prev.find((s) => s.id === story.id)) return prev;
      return [story, ...prev];
    });
  }

  function remove(id) {
    setItems((prev) => prev.filter((s) => s.id !== id));
  }

  function has(id) {
    return items.some((s) => s.id === id);
  }

  function toggle(story) {
    if (has(story.id)) remove(story.id);
    else add(story);
  }

  return { items, add, remove, has, toggle };
}

export function useBookmarks() {
  return useLocalList("hn_bookmarks");
}

export function useFavourites() {
  return useLocalList("hn_favourites");
}
