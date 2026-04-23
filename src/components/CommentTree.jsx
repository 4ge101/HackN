import CommentItem from "./CommentItem";
import Spinner from "../ui/Spinner";

export default function CommentTree({ comments, loading }) {
  if (loading) return <Spinner />;

  if (!comments || comments.length === 0) {
    return <p className={styles.empty}>no comments yet</p>;
  }

  return (
    <div className={styles.tree}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} depth={0} />
      ))}
    </div>
  );
}
