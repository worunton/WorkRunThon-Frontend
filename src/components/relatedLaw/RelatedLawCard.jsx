import styles from "./RelatedLawCard.module.css";

export default function RelatedLawCard({ item, onClickFull, onClickAi }) {
  return (
    <div className={styles.card}>
      <div className={styles.lawName}>{`{${item.name}}`}</div>
      <div className={styles.article}>
        {item.detail} {item.content}
      </div>
      <div className={styles.actions}>
        <button className={styles.fullBtn} onClick={() => onClickFull(item)}>
          전체보기
        </button>
        <button className={styles.aiBtn} onClick={() => onClickAi(item)}>
          AI 해석
        </button>
      </div>
    </div>
  );
}
