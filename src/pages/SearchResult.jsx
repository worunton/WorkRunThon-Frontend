import { useNavigate, useLocation } from "react-router-dom";
import data from "@/data/relatedLaws.mock.json";
import { questionList } from "@/data/questionsList.mock";
import RelatedLawCard from "@/components/relatedLaw/RelatedLawCard";
import NavBar from "@/components/NavBar";
import ResultSearchBar from "@/components/searchBar/ResultSearchBar";
import styles from "./SearchResult.module.css";

export default function SearchResult() {
  const nav = useNavigate();
  const { search } = useLocation();

  const preview = data.slice(0, 3);

  return (
    <div className={styles.page}>
      <NavBar />

      <div className={styles.topSearch}>
        <ResultSearchBar />
      </div>

      <main className={styles.content}>
        <div className={styles.lawWrapper}>
          <section className={styles.laws}>
            <div className={styles.header}>
              <h2 className={styles.title}>
                관련 법령
                <span className={styles.count}>
                  총 {data.length}건 조회 되었습니다.
                </span>
              </h2>

              {data.length > 3 && (
                <button
                  className={styles.moreBtn}
                  onClick={() => nav(`/search/related-laws${search}`)}
                >
                  더보기
                  <img
                    src="/images/arrow_right_icon.png"
                    alt="더보기 아이콘"
                    className={styles.moreIcon}
                  />
                </button>
              )}
            </div>

            <div className={styles.cards}>
              {preview.map((item) => (
                <RelatedLawCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        </div>

        <div className={styles.questionWrapper}>
          <h2 className={styles.qTitle}>궁금증이 해결되지 않았다면?</h2>
          <div className={styles.questions}>
            {questionList.map((q, index) => (
              <div
                type="button"
                key={index}
                className={styles.question}
                onClick={() => nav(`/search?query=${q.question}`)}
                title={q.question}
              >
                <div className={styles.dot} />
                <span className={styles.qText}>{`{${q.question}}`}</span>
                <img
                  src="/images/arrow_right_icon.png"
                  alt="화살표 아이콘"
                  className={styles.searchBtn}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
