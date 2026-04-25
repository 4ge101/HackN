import CommentItem from "./CommentItem";

export default function CommentTree({ comments, loading, theme }) {
  const isDark = theme === "dark";

  if (loading) {
    return (
      <p
        style={{
          fontFamily: "Poppins",
          fontSize: 13,
          color: isDark ? "#555" : "#999",
          padding: "20px 0",
        }}
      >
        loading comments...
      </p>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <p
        style={{
          fontFamily: "Poppins",
          fontSize: 13,
          color: isDark ? "#444" : "#bbb",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        no comments yet
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          depth={0}
          theme={theme}
        />
      ))}
    </div>
  );
}
