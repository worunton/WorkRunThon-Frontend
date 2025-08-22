import { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import RelatedLawDetail from "./RelatedLawDetail";
import RelatedLawHistory from "./RelatedLawHistory";
import styles from "./LawDetailModal.module.css";

const TABS = {
  original: "법령 원문",
  history: "개정 이력",
};
const DEFAULT_TAB = "original";

export default function LawDetailModal({ isOpen, onClose, law }) {
  const [tab, setTab] = useState(DEFAULT_TAB);

  useEffect(() => {
    if (isOpen) setTab(DEFAULT_TAB);
  }, [isOpen]);

  const handleClose = () => {
    setTab(DEFAULT_TAB);
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={styles.header}>
        <div className={styles.chips} role="tablist" aria-label="법령 보기 탭">
          {Object.entries(TABS).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              className={`${styles.chip} ${tab === key ? styles.active : ""}`}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        {tab === "original" ? (
          <RelatedLawDetail law={law} />
        ) : (
          <RelatedLawHistory law={law} />
        )}
      </div>
    </Modal>
  );
}
