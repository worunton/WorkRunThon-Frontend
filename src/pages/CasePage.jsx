import { useState, useCallback } from "react";
import NavBar from "@/components/NavBar";
import CaseSearchBar from "@/components/searchBar/CaseSearchBar";
import CaseResultList from "@/components/case/CaseResultList";
import { getCases } from "@/api/cases";
import { useEffect, useRef } from "react";

const LIMIT = 20;

export default function Case() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [categoryForList, setCategoryForList] = useState("precedent");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const sentinelRef = useRef(null);
  const loadingRef = useRef(false);
  const lastQueryRef = useRef(null);

  const handleSearch = useCallback(async (payload) => {
    const { category, query, precedent, currentDecision } = payload;

    // CaseResultList 날짜 라벨을 위해 현재 카테고리 저장
    setCategoryForList(category);

    // 공통 파라미터
    const common = {
      query,
      display: LIMIT,
      page: 1,
    };

    // 카테고리별 추가 파라미터
    let params = { ...common };

    if (category === "precedent") {
      params = {
        ...params,
        courtType: precedent?.courtLevel,
        caseType: precedent?.caseTarget,
        courtName:
          precedent?.courtName === "전체" ? undefined : precedent?.courtName,
        startDate: precedent?.dateFrom || undefined,
        endDate: precedent?.dateTo || undefined,
      };
    } else if (category === "currentDecision") {
      params = {
        ...params,
        division: currentDecision?.chamber,
      };
    } else if (category === "interpretation") {
      params = {
        ...params,
      };
    }

    try {
      setLoading(true);
      setResults([]);
      setPage(1);
      setHasMore(false);
      lastQueryRef.current = { category, params };

      const { items } = await getCases(category, params);
      setResults(items);
      setHasMore(items?.length ?? 0);
      setPage(2);
    } finally {
      setLoading(false);
    }
  }, []);

  // 다음 페이지 로더
  const loadNext = useCallback(async () => {
    if (!hasMore || loadingRef.current) return;
    const q = lastQueryRef.current;
    if (!q) return;

    loadingRef.current = true;
    try {
      setLoading(true);
      const { category, params } = q;
      const { items: newItems, total: ttl } = await getCases(category, {
        ...params,
        page,
        display: LIMIT,
      });
      const merged = [...results, ...(newItems ?? [])];
      setResults(merged);

      const has = (ttl ?? 0) > merged.length;
      setHasMore(has);
      if (newItems?.length) setPage((p) => p + 1);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [hasMore, page, results]);

  // 센티넬 관찰
  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;
    const el = sentinelRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadNext();
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loadNext]);

  return (
    <div>
      <NavBar />
      <CaseSearchBar onSubmit={handleSearch} />
      <CaseResultList
        items={results}
        loading={loading}
        category={categoryForList}
      />

      {/* 무한스크롤 센티넬 & 로딩 표시 */}
      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
      {loading && results.length > 0 && (
        <div style={{ textAlign: "center", padding: "12px 0", fontSize: 12 }}>
          더 불러오는 중...
        </div>
      )}
    </div>
  );
}
