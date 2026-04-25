import { useParams, useNavigate } from "react-router-dom";
import { useComments } from "../hooks/useComments";
import { timeAgo } from "../utils/timeAgo";
import { formatUrl } from "../utils/formatUrl";
import { sanitizeHtml } from "../utils/sanitizeHtml";
import CommentTree from "../components/CommentTree";

export default function Story({ theme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { story, comments, loading, error } = useComments(id);
  const isDark = theme === "dark";

  const bg = isDark ? "#000" : "#fff";
  const border = isDark ? "#1a1a1a" : "#efefef";
  const text = isDark ? "#fff" : "#111";
  const muted = isDark ? "#555" : "#999";

  if (loading && !story) {
    return (
      <div
        style={{
          flex: 1,
          background: bg,
          padding: 40,
          fontFamily: "Poppins",
          color: muted,
          fontSize: 14,
        }}
      >
        loading story...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          flex: 1,
          background: bg,
          padding: 40,
          fontFamily: "Poppins",
          color: "red",
          fontSize: 14,
        }}
      >
        Failed to load story: {error.message}
      </div>
    );
  }

  if (!story) {
    return (
      <div
        style={{
          flex: 1,
          background: bg,
          padding: 40,
          fontFamily: "Poppins",
          color: muted,
          fontSize: 14,
        }}
      >
        Story not found
      </div>
    );
  }

  const domain = formatUrl(story.url);

  return (
    <div style={{ flex: 1, background: bg, minHeight: "100vh" }}>
      <div
        style={{ maxWidth: 740, margin: "0 auto", padding: "24px 20px 60px" }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: "var(--primary-color, #ff8500)",
            fontFamily: "Poppins",
            fontSize: 13,
            cursor: "pointer",
            padding: 0,
            marginBottom: 24,
            display: "block",
          }}
        >
          ← back
        </button>

        <h1
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: text,
            fontFamily: "Poppins",
            lineHeight: 1.4,
            marginBottom: 6,
          }}
        >
          {story.url ? (
            <a
              href={story.url}
              target="_blank"
              rel="noreferrer"
              style={{ color: text, textDecoration: "none" }}
            >
              {story.title}
            </a>
          ) : (
            story.title
          )}
        </h1>

        {domain && (
          <p
            style={{
              fontSize: 12,
              color: muted,
              fontFamily: "Poppins",
              marginBottom: 12,
            }}
          >
            {domain}
          </p>
        )}

        {/* Meta */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            fontSize: 13,
            color: muted,
            fontFamily: "Poppins",
            marginBottom: 24,
            alignItems: "center",
          }}
        >
          <span
            style={{ color: "var(--primary-color, #ff8500)", fontWeight: 600 }}
          >
            ▲ {story.score}
          </span>
          <span>·</span>
          <span
            style={{
              color: "var(--primary-color, #ff8500)",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/user/${story.by}`)}
          >
            {story.by}
          </span>
          <span>·</span>
          <span>{timeAgo(story.time)}</span>
          <span>·</span>
          <span>{story.descendants ?? 0} comments</span>
        </div>

        {story.text && (
          <div
            style={{
              fontSize: 14,
              color: isDark ? "#aaa" : "#444",
              lineHeight: 1.7,
              fontFamily: "Poppins",
              marginBottom: 28,
              padding: 16,
              background: isDark ? "#0a0a0a" : "#f9f9f9",
              borderRadius: 8,
              border: `1px solid ${border}`,
            }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(story.text) }}
          />
        )}

        <hr
          style={{
            border: "none",
            borderTop: `1px solid ${border}`,
            marginBottom: 28,
          }}
        />

        <CommentTree comments={comments} loading={loading} theme={theme} />
      </div>
    </div>
  );
}
