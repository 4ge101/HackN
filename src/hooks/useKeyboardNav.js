import { useEffect, useRef } from "react";

export function useKeyboardNav(stories, onBookmark) {
  const indexRef = useRef(-1);

  useEffect(() => {
    function handleKey(e) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      const story = stories[indexRef.current];

      switch (e.key) {
        case "j": {
          indexRef.current = Math.min(indexRef.current + 1, stories.length - 1);
          const el = document.getElementById(
            `story-${stories[indexRef.current]?.id}`,
          );
          el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
          highlightStory(stories[indexRef.current]?.id);
          break;
        }
        case "k": {
          indexRef.current = Math.max(indexRef.current - 1, 0);
          const el = document.getElementById(
            `story-${stories[indexRef.current]?.id}`,
          );
          el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
          highlightStory(stories[indexRef.current]?.id);
          break;
        }
        case "o": {
          if (story?.url) window.open(story.url, "_blank", "noreferrer");
          break;
        }
        case "c": {
          if (story) window.location.href = `/item/${story.id}`;
          break;
        }
        case "b": {
          if (story && onBookmark) onBookmark(story);
          break;
        }
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [stories, onBookmark]);
}

function highlightStory(id) {
  document.querySelectorAll(".hn-story-active").forEach((el) => {
    el.classList.remove("hn-story-active");
    el.style.background = "transparent";
  });
  if (!id) return;
  const el = document.getElementById(`story-${id}`);
  if (el) {
    el.classList.add("hn-story-active");
    el.style.background = "rgba(255,133,0,0.06)";
  }
}
