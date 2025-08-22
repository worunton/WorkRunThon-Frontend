import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

export default function Modal({
  isOpen,
  onClose,
  children,
  closeOnBackdrop = true,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = original;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={styles.wrapper}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className={styles.closeBtn}
          aria-label="닫기"
          onClick={onClose}
        >
          <img src="/images/x_icon.png" alt="닫기 아이콘" />
        </button>

        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
