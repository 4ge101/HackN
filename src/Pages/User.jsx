import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { timeAgo } from "../utils/timeAgo";
import { sanitizeHtml } from "../utils/sanitizeHtml";
import Spinner from "../ui/Spinner";

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading, error } = useUser(id);

  if (loading)
    return (
      <div className={styles.wrap}>
        <Spinner />
      </div>
    );

  if (error || !user) {
    return (
      <div className={styles.wrap}>
        <p className={styles.error}>user not found</p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          ← back
        </button>

        <div className={styles.card}>
          <div className={styles.avatar}>
            {user.id.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className={styles.name}>{user.id}</h1>
            <p className={styles.sub}>
              <a
                href={`https://news.ycombinator.com/user?id=${user.id}`}
                target="_blank"
                rel="noreferrer"
                className={styles.hnLink}
              >
                view on hn ↗
              </a>
            </p>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statVal}>
              {user.karma?.toLocaleString()}
            </span>
            <span className={styles.statLabel}>karma</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statVal}>
              {user.submitted?.length?.toLocaleString() ?? 0}
            </span>
            <span className={styles.statLabel}>submissions</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statVal}>{timeAgo(user.created)}</span>
            <span className={styles.statLabel}>joined</span>
          </div>
        </div>

        {user.about && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>about</h2>
            <div
              className={styles.about}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(user.about) }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
