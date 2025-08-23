import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import RelatedLawCard from "@/components/relatedLaw/RelatedLawCard";
import NavBar from "@/components/NavBar";
import ResultSearchBar from "@/components/searchBar/ResultSearchBar";
import { searchLaws } from "@/api/laws";
import styles from "./SearchResult.module.css";
import Loading from "@/components/common/Loading";

export default function SearchResult() {
  const nav = useNavigate();
  const { search } = useLocation();

  const params = useMemo(() => new URLSearchParams(search), [search]);
  const query = params.get("query")?.trim() ?? "";

  const [loading, setLoading] = useState(false);
  const [lawSearchId, setLawSearchId] = useState(null);
  const [count, setCount] = useState(0);
  const [lawList, setLawList] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      setLawSearchId(null);
      setCount(0);
      setLawList([]);
      setQuestions([]);
      return;
    }

    setLoading(true);
    setLawSearchId(null);
    setCount(0);
    setLawList([]);
    setQuestions([]);

    let cancelled = false;

    (async () => {
      try {
        const res = await searchLaws(query);
        if (cancelled) return;
        setLawSearchId(res?.lawSearchId ?? null);
        setCount(res?.count ?? 0);
        setLawList(Array.isArray(res?.lawList) ? res.lawList : []);
        setQuestions(Array.isArray(res?.questionList) ? res.questionList : []);
      } catch (e) {
        console.error("법령 검색 실패:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className={styles.page}>
      <NavBar />

      <div className={styles.topSearch}>
        <ResultSearchBar />
      </div>

      {loading ? (
        <Loading message="법령을 검색하는 중입니다." />
      ) : (
        <main className={styles.content}>
          <div className={styles.lawWrapper}>
            <section className={styles.laws}>
              <div className={styles.header}>
                <h2 className={styles.title}>
                  관련 법령
                  <span className={styles.count}>
                    총 {count}건 조회되었습니다.
                  </span>
                </h2>

                {count > 3 && (
                  <button
                    className={styles.moreBtn}
                    onClick={() => {
                      const sp = new URLSearchParams();
                      if (lawSearchId) sp.set("sid", String(lawSearchId));
                      if (query) sp.set("query", query);
                      nav(`/search/related-laws?${sp.toString()}`);
                    }}
                  >
                    더보기
                    <img
                      src="/images/arrow_right_icon.png"
                      alt="더보기 아이콘"
                      className={styles.moreIcon}
                      loading="lazy"
                    />
                  </button>
                )}
              </div>

              <div className={styles.cards}>
                {lawList.map((item, idx) => (
                  <RelatedLawCard key={idx} item={item} />
                ))}
              </div>
            </section>
          </div>

          <div className={styles.questionWrapper}>
            <h2 className={styles.qTitle}>{`궁금증이\n해결되지 않았다면?`}</h2>
            <div className={styles.questions}>
              {questions.map((q, index) => (
                <div
                  type="button"
                  key={index}
                  className={styles.question}
                  onClick={() => nav(`/search?query=${q.question}`)}
                  title={q.question}
                >
                  <div className={styles.dot} />
                  <span className={styles.qText}>{q.question}</span>
                  <img
                    src="/images/arrow_right_icon.png"
                    alt="화살표 아이콘"
                    className={styles.searchBtn}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
