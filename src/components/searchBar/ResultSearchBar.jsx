import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./ResultSearchBar.module.css";

export default function ResultSearchBar() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const initial = params.get("query") || "";
  const [value, setValue] = useState(initial);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  const submit = () => {
    const q = value.trim();
    if (!q) return;
    navigate(`/search?query=${encodeURIComponent(q)}`);
  };

  const clearAll = () => {
    setValue("");
    navigate(`/search`, { replace: true });
    inputRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className={styles.wrapper}>
      <img
        src="/images/search_icon.png"
        alt=""
        className={styles.icon}
        loading="lazy"
      />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        className={styles.input}
      />
      {value && (
        <button
          type="button"
          className={styles.clearBtn}
          aria-label="검색어 지우기"
          onClick={clearAll}
          title="지우기"
        >
          ×
        </button>
      )}
    </div>
  );
}
