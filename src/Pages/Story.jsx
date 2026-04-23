import { useParams, useNavigate } from "react-router-dom";
import { useComments } from "../hooks/useComments";
import { timeAgo } from "../utils/timeAgo";
import { formatUrl } from "../utils/formatUrl";
import { sanitizeHtml } from "../utils/sanitizeHtml";
import CommentTree from "../components/CommentTree";
import Spinner from "../ui/Spinner";

export default function Story() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { story, comments, loading, error } = useComments(id);

  if (loading && !story)
    return (
      <div className={styles.wrap}>
        <Spinner />
      </div>
    );

  if (error) {
    return (
      <div className={styles.wrap}>
        <p className={styles.error}>failed to load story: {error.message}</p>
      </div>
    );
  }

  if (!story) return null;

  const domain = formatUrl(story.url);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          ← back
        </button>

        <div className={styles.header}>
          <h1 className={styles.title}>
            {story.url ? (
              <a href={story.url} target="_blank" rel="noreferrer">
                {story.title}
              </a>
            ) : (
              story.title
            )}
          </h1>
          {domain && <span className={styles.domain}>{domain}</span>}
        </div>

        <div className={styles.meta}>
          <span className={styles.points}>▲ {story.score}</span>
          <span className={styles.sep}>·</span>
          <span>
            by{" "}
            <span
              className={styles.user}
              onClick={() => navigate(`/user/${story.by}`)}
            >
              {story.by}
            </span>
          </span>
          <span className={styles.sep}>·</span>
          <span className={styles.time}>{timeAgo(story.time)}</span>
          <span className={styles.sep}>·</span>
          <span>{story.descendants ?? 0} comments</span>
        </div>

        {story.text && (
          <div
            className={styles.selfText}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(story.text) }}
          />
        )}

        <div className={styles.divider} />

        <CommentTree comments={comments} loading={loading} />
      </div>
    </div>
  );
}
