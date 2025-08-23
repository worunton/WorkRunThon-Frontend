import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = () => {
    const query = value.trim();
    if (!query) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
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
        className={styles.icon}
        loading="lazy"
      ></img>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        placeholder="어떤 법령을 알아볼까요?"
        className={styles.input}
      />
    </div>
  );
}
