import styles from "./Loading.module.css";

export default function Loading({ message = "" }) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <img
        src="/images/loader.gif"
        alt="Loading..."
        className={styles.img}
        loading="lazy"
      />
      <p className={styles.message}>{message}</p>
    </div>
  );
}
