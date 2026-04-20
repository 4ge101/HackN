import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";
import { formatUrl } from "../utils/formatUrl";

export default function StoryItem({ story, rank }) {
  const navigate = useNavigate();
  if (!story) return null;

  const domain = formatUrl(story.url);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "32px 1fr",
        gap: "0 10px",
        padding: "20px 16px",
        borderBottom: "1px solid #e8e8e0",
        // background: "rgb(15 15 15)",
      }}
    >
      <div
        style={{
          fontSize: 16,
          color: "#999",
          textAlign: "right",
          paddingTop: 2,
        }}
      >
        {rank}.
      </div>
      <div>
        <div style={{ marginBottom: 4 }}>
          <span
            style={{ fontSize: 18, fontWeight: 500, cursor: "pointer" }}
            onClick={() =>
              story.url
                ? window.open(story.url, "_blank", "noreferrer")
                : navigate(`/item/${story.id}`)
            }
          >
            {story.title}
          </span>
          {domain && (
            <span style={{ fontSize: 13, color: "#999", marginLeft: 6 }}>
              ({domain})
            </span>
          )}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#666",
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          <span style={{ color: "#FF6600", fontWeight: 500 }}>
            ▲ {story.score ?? 0}
          </span>
          <span>·</span>
          <span
            style={{ color: "#FF6600", cursor: "pointer" }}
            onClick={() => navigate(`/user/${story.by}`)}
          >
            {story.by}
          </span>
          <span>·</span>
          <span>{timeAgo(story.time)}</span>
          <span>·</span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/item/${story.id}`)}
          >
            {story.descendants ?? 0} comments
          </span>
        </div>
      </div>
    </div>
  );
}
