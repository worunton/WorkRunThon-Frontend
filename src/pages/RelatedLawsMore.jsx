import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { fetchMoreLaws } from "@/api/laws";
import RelatedLawCard from "@/components/relatedLaw/RelatedLawCard";
import NavBar from "@/components/NavBar";
import styles from "./RelatedLawsMore.module.css";
import Loading from "@/components/common/Loading";

const LIMIT = 15;

export default function RelatedLawsMore() {
  const nav = useNavigate();
  const { search } = useLocation();

  const params = useMemo(() => new URLSearchParams(search), [search]);
  const sid = params.get("sid");
  const lawSearchId = sid ? Number(sid) : null;

  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const sentinelRef = useRef(null);
  const loadingRef = useRef(false);

  const load = useCallback(async () => {
    if (!lawSearchId) return;
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const res = await fetchMoreLaws({ lawSearchId, offset, limit: LIMIT });
      const newList = Array.isArray(res?.lawList) ? res.lawList : [];
      const total = res?.count ?? 0;

      setCount(total);
      setItems((prev) => [...prev, ...newList]);
      const newOffset = offset + newList.length;
      setOffset(newOffset);
      setHasMore(newOffset < total);
    } catch (e) {
      console.error("더보기 로드 실패:", e);
    } finally {
      setLoading(false);
      setInitLoading(false);
      loadingRef.current = false;
    }
  }, [lawSearchId, offset, hasMore]);

  // 초기 로드
  useEffect(() => {
    setCount(0);
    setItems([]);
    setOffset(0);
    setHasMore(true);
    setInitLoading(true);

    if (lawSearchId) {
      load();
    } else {
      setInitLoading(false);
    }
  }, [lawSearchId]);

  // IntersectionObserver로 바닥 감지
  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;
    const el = sentinelRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          load();
        }
      },
      { rootMargin: "120px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, load]);

  return (
    <div>
      <NavBar />
      <div className={styles.wrapper} aria-busy={initLoading || loading}>
        <div className={styles.top}>
          <button className={styles.backBtn} onClick={() => nav(-1)}>
            <img src="/images/arrow_left_icon.png" alt="뒤로가기" />
            뒤로가기
          </button>
          <h2 className={styles.title}>관련 법령</h2>
          <span className={styles.number}>총 {count}건</span>
        </div>

        {initLoading ? (
          <Loading message="더 많은 법령을 불러오는 중입니다." />
        ) : (
          <>
            <div className={styles.cards}>
              {items.map((item, idx) => {
                const key =
                  (item.lowId ?? "l") + "-" + (item.zoId ?? "z") + "-" + idx;
                return <RelatedLawCard key={key} item={item} />;
              })}
            </div>

            {/* 무한스크롤 센티넬 */}
            {hasMore && <div ref={sentinelRef} className={styles.sentinel} />}
          </>
        )}
      </div>
    </div>
  );
}
