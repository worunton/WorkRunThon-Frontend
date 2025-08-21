import { useState } from "react";
import Modal from "@/components/common/Modal"; // 경로는 프로젝트에 맞춰 주세요
import RelatedLawDetail from "./RelatedLawDetail";
import styles from "./RelatedLawCard.module.css";

export default function RelatedLawCard({
  item,
  onClickFull,
  onClickAi,
  disableInternalModal = false,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    onClickFull?.(item);
    if (!disableInternalModal) setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div className={styles.card}>
      <div className={styles.lawName}>{`{${item.name}}`}</div>
      <div className={styles.article}>
        {item.detail} {item.content}
      </div>
      <div className={styles.actions}>
        <button className={styles.fullBtn} onClick={handleOpen}>
          전체보기
        </button>
        <button className={styles.aiBtn} onClick={() => onClickAi(item)}>
          AI 해석
        </button>
      </div>

      {!disableInternalModal && (
        <Modal isOpen={open} onClose={handleClose}>
          <RelatedLawDetail law={item} />
        </Modal>
      )}
    </div>
  );
}
