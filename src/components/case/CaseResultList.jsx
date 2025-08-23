import { useState } from "react";
import Modal from "@/components/common/Modal";
import CaseTimeLine from "@/components/case/CaseTimeLine";
import Loading from "@/components/common/Loading";
import styles from "./CaseResultList.module.css";

const DATE_FIELD_MAP = {
  precedent: { field: "sentencedAt", label: "선고일자" },
  currentDecision: { field: "terminatedAt", label: "선고일자" },
  interpretation: { field: "interpretedAt", label: "선고일자" },
  adminAppeal: { field: "adjudicatedAt", label: "선고일자" },
};

function getDateInfo(item, category) {
  const conf = DATE_FIELD_MAP[category] || {};
  const value = conf.field ? item?.[conf.field] : undefined;
  return { label: conf.label, value };
}

function CaseResultCard({ item, onOpen, category }) {
  const { title, caseNumber, summary } = item || {};
  const { label: dateLabel, value: dateValue } = getDateInfo(item, category);

  return (
    <li className={styles.card}>
      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        <div className={styles.docnum}>[문서번호: {caseNumber}]</div>
        <p className={styles.summary}>{summary}</p>
      </div>

      <div className={styles.etc}>
        {dateValue && (
          <div className={styles.badge}>
            {dateLabel}: {formatYMD(dateValue)}
          </div>
        )}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.linkBtn}
            onClick={() => onOpen(item)}
          >
            <img
              src="/images/link_icon.png"
              alt=""
              className={styles.linkIcon}
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </li>
  );
}

export default function CaseResultList({
  items = [],
  className = "",
  category = "precedent",
  loading = false,
}) {
  const [selected, setSelected] = useState(null);

  const open = (item) => setSelected(item);
  const close = () => {
    setSelected(null);
  };

  return (
    <div className={`${styles.results} ${className}`}>
      {loading ? (
        <div className={styles.loading}>
          <Loading message="검색 결과를 불러오는 중입니다." />
        </div>
      ) : (
        <>
          {/* 비어있을 때 */}
          {items.length === 0 ? (
            <div className={styles.empty}>
              <img
                src="/images/no_result.png"
                alt="검색 결과 없음"
                loading="lazy"
              />
              <p>{` 표시할 결과가 없습니다.\n 상단 검색 기능을 이용해서 원하는 정보를 찾아보세요.`}</p>
            </div>
          ) : (
            /* 리스트 */
            <ul className={styles.list}>
              {items.map((it) => (
                <CaseResultCard
                  key={it.caseId}
                  item={it}
                  onOpen={open}
                  category={category}
                />
              ))}
            </ul>
          )}
        </>
      )}

      <Modal isOpen={!!selected} onClose={close}>
        <CaseTimeLine item={selected} category={category} />
      </Modal>
    </div>
  );
}

/** "20171212" → "2017.12.12" */
function formatYMD(s) {
  const v = String(s || "").replace(/\D/g, "");
  if (v.length !== 8) return s ?? "-";
  return `${v.slice(0, 4)}.${v.slice(4, 6)}.${v.slice(6, 8)}.`;
}
