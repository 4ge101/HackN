import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";
import { sanitizeHtml } from "../utils/sanitizeHtml";

export default function CommentItem({ comment, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  if (!comment || comment.deleted || comment.dead) return null;

  const hasChildren = comment.children && comment.children.length > 0;

  return (
    <div className={styles.comment} style={{ marginLeft: depth > 0 ? 20 : 0 }}>
      <div className={styles.header}>
        <span
          className={styles.user}
          onClick={() => navigate(`/user/${comment.by}`)}
        >
          {comment.by}
        </span>
        <span className={styles.time}>{timeAgo(comment.time)}</span>
        <button
          className={styles.toggle}
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? `[+${countDescendants(comment)}]` : "[-]"}
        </button>
      </div>

      {!collapsed && (
        <>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(comment.text) }}
          />
          {hasChildren && (
            <div className={styles.children}>
              {comment.children.map((child) => (
                <CommentItem key={child.id} comment={child} depth={depth + 1} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function countDescendants(comment) {
  if (!comment.children || comment.children.length === 0) return 0;
  return comment.children.reduce((acc, c) => acc + 1 + countDescendants(c), 0);
}
