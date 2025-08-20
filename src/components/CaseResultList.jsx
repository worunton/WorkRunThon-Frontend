import styles from "./CaseResultList.module.css";

function CaseResultCard({ item }) {
  const { title, case_number, summary, sentenced_at } = item || {};

  return (
    <li className={styles.card}>
      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        <div className={styles.docnum}>[문서번호: {case_number}]</div>
        <p className={styles.summary}>{summary}</p>
      </div>

      <div className={styles.etc}>
        {sentenced_at && (
          <div className={styles.badge}>생산일자: {sentenced_at}</div>
        )}
        <div className={styles.actions}>
          <button type="button" className={styles.linkBtn}>
            <img
              src="/images/link_icon.png"
              alt=""
              className={styles.linkIcon}
            />
          </button>
        </div>
      </div>
    </li>
  );
}

export default function CaseResultList({
  total = 0,
  items = [],
  loading = false,
  className = "",
}) {
  return (
    <div className={`${styles.results} ${className}`}>
      {/* 카운트 */}
      <div className={styles.countRow}>
        <span className={styles.countText}>
          {loading
            ? "로딩 중..."
            : `총 ${total.toLocaleString()}건 조회되었습니다.`}
        </span>
      </div>

      {/* 비어있을 때 */}
      {!loading && items.length === 0 && (
        <div className={styles.empty}>표시할 결과가 없습니다.</div>
      )}

      {/* 리스트 */}
      <ul className={styles.list}>
        {items.map((it, idx) => (
          <CaseResultCard key={`${it.case_number}-${idx}`} item={it} />
        ))}
      </ul>
    </div>
  );
}
