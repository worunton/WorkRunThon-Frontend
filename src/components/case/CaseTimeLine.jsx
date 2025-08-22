import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import { fetchCaseTimeline } from "@/api/cases";
import styles from "./CaseTimeLine.module.css";

export default function CaseDetailModalContent({ item }) {
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);
  const [snapshotAt, setSnapshotAt] = useState("");

  useEffect(() => {
    if (!item?.caseId) return;

    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setSnapshotAt(formatKSTNow());
        const data = await fetchCaseTimeline(item.caseId);
        if (!cancelled) setTimeline(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled)
          console.log(e?.message || "타임라인을 불러오지 못했습니다.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [item?.caseId]);

  if (!item) return null;

  const { title, caseNumber } = item;

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <Loading
          message={`AI 분석을 통해 타임라인을 정리 중입니다.\n30초~1분 정도 소요될 수 있어요.`}
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.title}>{title}</div>
        <div className={styles.caseNo}>{`[문서번호: ${caseNumber}]`}</div>
        <div className={styles.snapshot}>{`{${snapshotAt} 기준}`}</div>
      </div>

      {/* 타임라인 본문 */}
      <div className={styles.body}>
        <ol className={styles.timeline} role="list">
          {timeline.map((it, idx) => (
            <li key={idx} className={styles.item} role="listitem">
              <div className={styles.date}>{it.date}</div>
              <div className={styles.axis}>
                <span className={styles.dot} />
              </div>
              <div className={styles.card}>
                <div className={styles.badge}>{it.type}</div>
                <p className={styles.summary}>{it.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );

  function formatKSTNow() {
    const d = new Date();
    const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
    const pad = (n) => n.toString().padStart(2, "0");
    return `${kst.getUTCFullYear()}.${pad(kst.getUTCMonth() + 1)}.${pad(
      kst.getUTCDate()
    )} ${pad(kst.getUTCHours())}:${pad(kst.getUTCMinutes())}:${pad(
      kst.getUTCSeconds()
    )}`;
  }
}
