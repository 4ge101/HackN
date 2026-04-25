import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { timeAgo } from "../utils/timeAgo";
import { sanitizeHtml } from "../utils/sanitizeHtml";

export default function User({ theme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading, error } = useUser(id);
  const isDark = theme === "dark";

  const bg = isDark ? "#000" : "#fff";
  const border = isDark ? "#1a1a1a" : "#efefef";
  const text = isDark ? "#fff" : "#111";
  const muted = isDark ? "#555" : "#999";

  if (loading) {
    return (
      <div
        style={{
          flex: 1,
          background: bg,
          padding: 40,
          fontFamily: "Poppins",
          color: muted,
        }}
      >
        loading...
      </div>
    );
  }

  if (error || !user) {
    return (
      <div
        style={{
          flex: 1,
          background: bg,
          padding: 40,
          fontFamily: "Poppins",
          color: "red",
        }}
      >
        User not found
      </div>
    );
  }

  return (
    <div style={{ flex: 1, background: bg, minHeight: "100vh" }}>
      <div
        style={{ maxWidth: 600, margin: "0 auto", padding: "24px 20px 60px" }}
      >
        {/* Back button */}
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

        {/* Profile card */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "rgba(255,133,0,0.12)",
              border: "1px solid rgba(255,133,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 18,
              color: "var(--primary-color, #ff8500)",
              flexShrink: 0,
            }}
          >
            {user.id?.slice(0, 2).toUpperCase()}
          </div>

          <div>
            <h1
              style={{
                fontFamily: "Poppins",
                fontSize: 20,
                fontWeight: 600,
                color: text,
                marginBottom: 4,
              }}
            >
              {user.id}
            </h1>
            <a
              href={`https://news.ycombinator.com/user?id=${user.id}`}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: 12,
                color: "var(--primary-color, #ff8500)",
                fontFamily: "Poppins",
                textDecoration: "none",
              }}
            >
              view on HN ↗
            </a>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {[
            { label: "karma", value: user.karma?.toLocaleString() ?? "0" },
            {
              label: "submissions",
              value: user.submitted?.length?.toLocaleString() ?? "0",
            },
            { label: "joined", value: timeAgo(user.created) },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                background: isDark ? "#0a0a0a" : "#f9f9f9",
                border: `1px solid ${border}`,
                borderRadius: 8,
                padding: "14px 16px",
              }}
            >
              <p
                style={{
                  fontFamily: "Poppins",
                  fontSize: 18,
                  fontWeight: 600,
                  color: text,
                  marginBottom: 4,
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontFamily: "Poppins",
                  fontSize: 11,
                  color: muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* About */}
        {user.about && (
          <div
            style={{
              background: isDark ? "#0a0a0a" : "#f9f9f9",
              border: `1px solid ${border}`,
              borderRadius: 8,
              padding: 16,
            }}
          >
            <p
              style={{
                fontFamily: "Poppins",
                fontSize: 11,
                color: muted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 10,
              }}
            >
              about
            </p>
            <div
              style={{
                fontSize: 14,
                color: isDark ? "#aaa" : "#444",
                lineHeight: 1.7,
                fontFamily: "Poppins",
              }}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(user.about) }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
