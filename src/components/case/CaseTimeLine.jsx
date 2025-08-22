import Loading from "@/components/common/Loading";
import styles from "./CaseTimeLine.module.css";

export default function CaseDetailModalContent({ item }) {
  const loading = true;

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <Loading
          message={`AI 분석을 통해 타임라인을 정리 중입니다.\n30초~1분 정도 소요될 수 있어요.`}
        />
      </div>
    );
  }

  if (!item) return null;

  const { title, caseNumber } = item;

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.title}>{title}</div>
        <div className={styles.caseNo}>문서번호: {caseNumber}</div>
      </div>

      {/* TODO: 타임라인 */}
      <div className={styles.body}>
        <div className={styles.placeholder}>
          타임라인/상세 내용이 여기에 표시됩니다.
        </div>
      </div>
    </div>
  );
}
