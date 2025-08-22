import { useState } from "react";
import Modal from "@/components/common/Modal";
import CaseTimeLine from "@/components/case/CaseTimeLine";
import styles from "./CaseResultList.module.css";

const DATE_FIELD_MAP = {
  precedent: { field: "sentencedAt", label: "선고일" },
  currentDecision: { field: "terminatedAt", label: "종국일자" },
  interpretation: { field: "interpretedAt", label: "해석일자" },
  adminAppeal: { field: "adjudicatedAt", label: "의결일자" },
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
            {dateLabel}: {dateValue}
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
  category = "precedent",
}) {
  const [selected, setSelected] = useState(null);

  const open = (item) => setSelected(item);
  const close = () => {
    setSelected(null);
  };

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
        {items.map((it) => (
          <CaseResultCard
            key={it.caseId}
            item={it}
            onOpen={open}
            category={category}
          />
        ))}
      </ul>

      <Modal isOpen={!!selected} onClose={close}>
        <CaseTimeLine item={selected} />
      </Modal>
    </div>
  );
}
