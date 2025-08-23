import { useEffect, useState } from "react";
import { requestAiInterpretation } from "@/api/laws";
import Loading from "@/components/common/Loading";
import styles from "./RelatedLawAi.module.css";

export default function RelatedLawAi({ law }) {
  const { name = "", detail = "" } = law;

  const [loading, setLoading] = useState(true);
  const [aiTitle, setAiTitle] = useState("");
  const [aiContent, setAiContent] = useState("");

  useEffect(() => {
    if (!law) {
      setAiTitle("");
      setAiContent("");
      return;
    }

    setLoading(true);
    setAiTitle("");
    setAiContent("");

    let cancelled = false;

    (async () => {
      try {
        const response = await requestAiInterpretation(law);
        if (cancelled) return;
        setAiTitle(response.aiTitle);
        setAiContent(response.aiContent);
      } catch (error) {
        console.error("AI 해석 요청 실패:", error);
        setAiTitle("AI 요약을 가져오지 못했습니다.");
        setAiContent("AI 해석을 가져오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
    return () => (cancelled = true);
  }, [law]);

  return loading ? (
    <Loading message="AI 해석을 생성하는 중입니다." />
  ) : (
    <article className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.lawName}>{name}</h3>
        <p className={styles.detail}>{detail}</p>
      </header>

      <section className={styles.body}>
        <div className={styles.summary}>
          <h4 className={styles.title}>AI 요약</h4>
          <p className={styles.content}>{aiTitle}</p>
        </div>
        <div className={styles.interpret}>
          <h4 className={styles.title}>AI 해석</h4>
          <p className={styles.content}>{aiContent}</p>
        </div>
      </section>
    </article>
  );
}
