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
        borderBottom: "1px solid #1f1f1f",
        cursor: 'default',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#0f0f0f'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ fontSize: 16, color: "#444", textAlign: "right", paddingTop: 2 }}>
        {rank}.
      </div>
      <div>
        <div style={{ marginBottom: 6 }}>
          <span
            style={{ fontSize: 18, fontWeight: 500, cursor: "pointer", color: '#fff', lineHeight: 1.4 }}
            onClick={() =>
              story.url
                ? window.open(story.url, "_blank", "noreferrer")
                : navigate(`/item/${story.id}`)
            }
          >
            {story.title}
          </span>
          {domain && (
            <span style={{ fontSize: 12, color: "#555", marginLeft: 8 }}>
              ({domain})
            </span>
          )}
        </div>
        <div style={{
          fontSize: 13,
          color: "#555",
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: 'center',
        }}>
          <span style={{ color: "#ff8500", fontWeight: 600 }}>▲ {story.score ?? 0}</span>
          <span style={{ color: '#333' }}>·</span>
          <span
            style={{ color: "#ff8500", cursor: "pointer" }}
            onClick={() => navigate(`/user/${story.by}`)}
          >
            {story.by}
          </span>
          <span style={{ color: '#333' }}>·</span>
          <span style={{ color: '#555' }}>{timeAgo(story.time)}</span>
          <span style={{ color: '#333' }}>·</span>
          <span
            style={{ cursor: "pointer", color: '#555' }}
            onClick={() => navigate(`/item/${story.id}`)}
          >
            {story.descendants ?? 0} comments
          </span>
        </div>
      </div>
    </div>
  );
}