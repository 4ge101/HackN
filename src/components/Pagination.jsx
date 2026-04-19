import styles from './Pagination.module.css'

export default function Pagination({ page, hasMore, onPrev, onNext }) {
  return (
    <div className={styles.row}>
      <button
        className={styles.btn}
        onClick={onPrev}
        disabled={page === 0}
      >
        ← prev
      </button>
      <span className={styles.page}>page {page + 1}</span>
      <button
        className={styles.btn}
        onClick={onNext}
        disabled={!hasMore}
      >
        next →
      </button>
    </div>
  )
}