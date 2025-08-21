// import { contentToLineParts } from "@/utils/lawFormat";
import styles from "./RelatedLawDetail.module.css";

export default function RelatedLawDetail({ law }) {
  if (!law) return null;
  const { name = "", detail = "", content = [] } = law;
  // const lines = contentToLineParts(content, { fallback: detail });

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.lawName}>{`{${name}}`}</h3>
        <p className={styles.detail}>{`{${detail}}`}</p>
      </header>

      {/* {lines?.length > 0 && (
        <section className={styles.body} aria-label="조항 내용">
          {lines.map((ln, idx) => (
            <div className={styles.clause} key={idx}>
              {ln.number && <span className={styles.number}>{ln.number}</span>}
              <p className={styles.text}>{ln.text}</p>
            </div>
          ))}
        </section>
      )} */}
      <p className={styles.content}>{content}</p>
    </article>
  );
}
