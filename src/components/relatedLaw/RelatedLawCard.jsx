import { useState, useMemo } from "react";
import Modal from "@/components/common/Modal";
import RelatedLawDetail from "./RelatedLawDetail";
import RelatedLawAi from "./RelatedLawAi";
import styles from "./RelatedLawCard.module.css";

export default function RelatedLawCard({
  item,
  onClickFull,
  onClickAi,
  disableInternalModal = false,
}) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openAi, setOpenAi] = useState(false);

  const handleOpenDetail = () => {
    onClickFull?.(item);
    if (!disableInternalModal) setOpenDetail(true);
  };

  const handleOpenAi = () => {
    onClickAi?.(item);
    if (!disableInternalModal) setOpenAi(true);
  };

  const summary = useMemo(() => {
    const arr = Array.isArray(item?.content) ? item.content : [];
    const explains = arr.map((c) => c?.explain?.trim()).filter(Boolean);
    return explains.join(" ");
  }, [item]);

  return (
    <div className={styles.card}>
      <div className={styles.lawName}>{`{${item.name}}`}</div>
      <div className={styles.article}>
        {item.detail} {summary}
      </div>
      <div className={styles.actions}>
        <button className={styles.fullBtn} onClick={handleOpenDetail}>
          전체보기
        </button>
        <button className={styles.aiBtn} onClick={handleOpenAi}>
          AI 해석
        </button>
      </div>

      {!disableInternalModal && (
        <>
          <Modal isOpen={openDetail} onClose={() => setOpenDetail(false)}>
            <RelatedLawDetail law={item} />
          </Modal>

          <Modal isOpen={openAi} onClose={() => setOpenAi(false)}>
            <RelatedLawAi law={item} />
          </Modal>
        </>
      )}
    </div>
  );
}
