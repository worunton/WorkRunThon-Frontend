import styles from "./RelatedLawDetail.module.css";

export default function RelatedLawDetail({ law }) {
  if (!law) return null;

  const name = law?.name ?? "";
  const detail = law?.detail ?? "";
  const clauses = Array.isArray(law?.content) ? law.content : [];

  const explains = clauses.map((c) => c?.explain?.trim()).filter(Boolean);

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.lawName}>{name}</h3>
        <p className={styles.detail}>{detail}</p>
      </header>

      <section className={styles.body} aria-label="조항 내용">
        {explains.length > 0 ? (
          <ul className={styles.list}>
            {explains.map((text, idx) => (
              <li key={idx} className={styles.content}>
                {text}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.line}>{detail}</p>
        )}
      </section>
    </article>
  );
}
