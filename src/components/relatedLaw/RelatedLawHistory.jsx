import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import { fetchLawHistory } from "@/api/laws";
import styles from "./RelatedLawHistory.module.css";

export default function RelatedLawHistory({ law }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!law) {
      setData(null);
      return;
    }

    setLoading(true);
    setData(null);

    let cancelled = false;

    (async () => {
      try {
        const res = await fetchLawHistory({
          lawId: String(law.lawId),
          detail: law.detail,
        });
        if (cancelled) return;
        setData(res);
      } catch (e) {
        console.log(e?.message || "개정 이력을 불러오지 못했습니다.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => (cancelled = true);
  }, [law]);

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <Loading message={`개정 이력을 불러오는 중입니다.`} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* 상단: 법령명 / (법령종류) */}
      <div className={styles.head}>
        <div className={styles.titleRow}>
          <div className={styles.lawName}>{data?.name || law?.name || "-"}</div>
          {law?.type && <div className={styles.lawType}>{law.type}</div>}
        </div>
        {/* 조문(세부) 표시: ex) 제2조의2 */}
        {(data?.detail || law?.detail) && (
          <div className={styles.detail}>{data?.detail || law?.detail}</div>
        )}
      </div>

      {/* 타임라인 */}
      <div className={styles.body}>
        <ol className={styles.timeline} role="list">
          {data?.changeList.map((it, idx) => (
            <li key={idx} className={styles.item} role="listitem">
              {/* 좌측: 공포일자 */}
              <div className={styles.date}>
                공포일자{"\n"}
                {formatYMD(it?.showDate)}
              </div>

              {/* 축 */}
              <div className={styles.axis}>
                <span className={styles.dot} />
              </div>

              {/* 우측 카드 */}
              <div className={styles.card}>
                <div className={styles.badges}>
                  {/* 제개정구분 */}
                  {it?.changeName && (
                    <span className={`${styles.chip} ${styles.strong}`}>
                      {it.changeName}
                    </span>
                  )}
                  {/* 공포번호 */}
                  {it?.number && (
                    <span className={styles.chip}>
                      {`공포번호 제${it.number}호`}
                    </span>
                  )}
                  {/* 시행일자 (YY.MM.DD 형태 노출) */}
                  {it?.actionDate && (
                    <span className={styles.chip}>
                      {`시행일자 ${formatYyMd(it.actionDate)}`}
                    </span>
                  )}
                </div>

                {/* 개정된 법령 내용 */}
                <div className={styles.clauses}>
                  {Array.isArray(it?.content) &&
                    it.content.map((c, i) => (
                      <div key={i} className={styles.clause}>
                        <span className={styles.clauseText}>
                          {c?.clausecontent}
                        </span>
                      </div>
                    ))}
                </div>

                {/* 소관부처 */}
                {it?.company && (
                  <div className={styles.company}>
                    소관부처:{" "}
                    <span className={styles.companyName}>{it.company}</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** "20171212" → "2017.12.12" */
function formatYMD(s) {
  const v = String(s || "").replace(/\D/g, "");
  if (v.length !== 8) return s ?? "-";
  return `${v.slice(0, 4)}.${v.slice(4, 6)}.${v.slice(6, 8)}.`;
}

/** "171212" → "17.12.12" */
function formatYyMd(s) {
  const v = String(s || "").replace(/\D/g, "");
  if (v.length !== 6) return s ?? "-";
  return `${v.slice(0, 2)}.${v.slice(2, 4)}.${v.slice(4, 6)}.`;
}
