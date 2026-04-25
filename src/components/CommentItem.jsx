import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";
import { sanitizeHtml } from "../utils/sanitizeHtml";

export default function CommentItem({ comment, depth = 0, theme }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const isDark = theme === "dark";

  if (!comment || comment.deleted || comment.dead) return null;

  const hasChildren = comment.children && comment.children.length > 0;
  const borderColor = isDark ? "#1f1f1f" : "#efefef";
  const textColor = isDark ? "#aaa" : "#444";
  const mutedColor = isDark ? "#555" : "#999";

  function countDescendants(c) {
    if (!c.children || c.children.length === 0) return 0;
    return c.children.reduce(
      (acc, child) => acc + 1 + countDescendants(child),
      0,
    );
  }

  return (
    <div
      style={{
        marginLeft: depth > 0 ? 20 : 0,
        borderLeft: depth > 0 ? `2px solid ${borderColor}` : "none",
        paddingLeft: depth > 0 ? 12 : 0,
        marginTop: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontFamily: "Poppins",
            fontWeight: 600,
            color: "var(--primary-color, #ff8500)",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/user/${comment.by}`)}
        >
          {comment.by}
        </span>
        <span
          style={{
            fontSize: 11,
            fontFamily: "Roboto Mono, monospace",
            color: mutedColor,
          }}
        >
          {timeAgo(comment.time)}
        </span>
        <button
          onClick={() => setCollapsed((c) => !c)}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 11,
            fontFamily: "Roboto Mono, monospace",
            color: mutedColor,
            padding: "0 4px",
          }}
        >
          {collapsed ? `[+${countDescendants(comment) + 1}]` : "[-]"}
        </button>
      </div>

      {!collapsed && (
        <>
          <div
            style={{
              fontSize: 13,
              color: textColor,
              lineHeight: 1.65,
              fontFamily: "Poppins",
            }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(comment.text) }}
          />

          {hasChildren && (
            <div>
              {comment.children.map((child) => (
                <CommentItem
                  key={child.id}
                  comment={child}
                  depth={depth + 1}
                  theme={theme}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
