import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";
import { formatUrl } from "../utils/formatUrl";
import { useBookmarks, useFavourites } from "../hooks/useBookmarks";

function AnimatedNumber({ value }) {
  return <span>{value}</span>;
}

export default function StoryItem({ story, rank, theme }) {
  const navigate = useNavigate();
  const bookmarks = useBookmarks();
  const favourites = useFavourites();
  const [hovered, setHovered] = useState(false);

  if (!story) return null;

  const domain = formatUrl(story.url);
  const isDark = theme === "dark";
  const isBookmarked = bookmarks.has(story.id);
  const isFavourited = favourites.has(story.id);
  const iconStroke = isDark ? "#666" : "#999";
  const iconActive = "var(--primary-color, #ff8500)";

  return (
    <div
      id={`story-${story.id}`}
      style={{
        display: "grid",
        gridTemplateColumns: "36px 1fr auto",
        gap: "0 10px",
        padding: "18px 20px",
        borderBottom: `1px solid ${isDark ? "#1a1a1a" : "#efefef"}`,
        background: hovered ? (isDark ? "#0d0d0d" : "#fafafa") : "transparent",
        transition: "background 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          fontSize: 14,
          color: isDark ? "#444" : "#bbb",
          textAlign: "right",
          paddingTop: 3,
          fontFamily: "Roboto Mono, monospace",
        }}
      >
        {rank}.
      </div>

      <div>
        <div
          style={{
            marginBottom: 6,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
              color: isDark ? "#fff" : "#111",
              lineHeight: 1.4,
            }}
            onClick={() =>
              story.url
                ? window.open(story.url, "_blank", "noreferrer")
                : navigate(`/item/${story.id}`)
            }
          >
            {story.title}
          </span>
          {domain && (
            <span style={{ fontSize: 11, color: isDark ? "#444" : "#bbb" }}>
              ({domain})
            </span>
          )}
        </div>

        <div
          style={{
            fontSize: 12,
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
            color: isDark ? "#555" : "#999",
          }}
        >
          <span
            style={{ color: "var(--primary-color, #ff8500)", fontWeight: 600 }}
          >
            ▲ <AnimatedNumber value={story.score ?? 0} />
          </span>
          <span>·</span>
          <span
            style={{
              color: "var(--primary-color, #ff8500)",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/user/${story.by}`);
            }}
          >
            {story.by}
          </span>
          <span>·</span>
          <span>{timeAgo(story.time)}</span>
          <span>·</span>
          <span
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/item/${story.id}`);
            }}
          >
            {story.descendants ?? 0} comments
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          title="Bookmark"
          onClick={() => bookmarks.toggle(story)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            transition: "transform 0.15s",
            transform: isBookmarked ? "scale(1.2)" : "scale(1)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill={isBookmarked ? iconActive : "none"}
            stroke={isBookmarked ? iconActive : iconStroke}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </button>

        <button
          title="Favourite"
          onClick={() => favourites.toggle(story)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            transition: "transform 0.15s",
            transform: isFavourited ? "scale(1.2)" : "scale(1)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill={isFavourited ? iconActive : "none"}
            stroke={isFavourited ? iconActive : iconStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
