import { data } from "@/data/aiInterpretation.mock";
import styles from "./RelatedLawAi.module.css";

export default function RelatedLawAi({ law }) {
  if (!law) return null;
  const { name = "", detail = "" } = law;

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.lawName}>{`{${name}}`}</h3>
        <p className={styles.detail}>{detail}</p>
      </header>

      <section className={styles.body}>
        <div className={styles.summary}>
          <h4 className={styles.title}>AI 요약</h4>
          <p className={styles.content}> {data.aiTitle} </p>
        </div>
        <div className={styles.interpret}>
          <h4 className={styles.title}>AI 해석</h4>
          <p className={styles.content}> {data.aiContent} </p>
        </div>
      </section>
    </article>
  );
}
