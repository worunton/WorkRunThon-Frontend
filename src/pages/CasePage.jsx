import { useState, useCallback, useMemo } from "react";
import NavBar from "@/components/NavBar";
import CaseSearchBar from "@/components/searchBar/CaseSearchBar";
import CaseResultList from "@/components/CaseResultList";

// Search params 생성
const buildQuery = (obj) => {
  const sp = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") sp.set(k, String(v));
  });
  return sp;
};

export default function Case() {
  const handleSearch = useCallback((payload) => {
    const { category, query, precedent, currentDecision } = payload;

    // 판례 검색
    if (category === "precedent") {
      const sp = buildQuery({
        query,
        courtType: precedent.courtLevel,
        caseType: precedent.caseTarget,
        courtName: precedent.courtName,
        startDate: precedent.dateFrom,
        endDate: precedent.dateTo,
      });

      const url = `/cases/precedents?${sp.toString()}`;
      console.log("[GET]", url);
      return;
    }

    // 현재결정례 검색
    if (category === "currentDecision") {
      const sp = buildQuery({
        category,
        query,
        division: currentDecision.chamber,
      });
      const url = `/cases/current_decisions?${sp.toString()}`;
      console.log("[GET]", url);
      return;
    }

    // 행정심판재결례 검색
    if (category === "adminAppeal") {
      const sp = buildQuery({
        category,
        query,
      });
      const url = `/cases/administrative_appeals?${sp.toString()}`;
      console.log("[GET]", url);
      return;
    }

    // 법제처 해석례 검색
    const sp = buildQuery({ category, query });
    const url = `/cases/moleg_interpretations?${sp.toString()}`;
    console.log("[GET]", url);
  }, []);

  const [total] = useState(123); // TODO: 실제 검색 결과 수를 받아와야 함
  const [loading] = useState(false);

  // 목데이터 (API 스키마에 맞춤)
  const results = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        title: "대표자 상여 처분의 적법 여부",
        caseId: `case-${i + 1}`,
        caseNumber: `서울행정법원-2021-구합-${70813 + i}`,
        summary:
          "원고 법인이 양수받은 채권들의 실현 가능성이 상당히 높은 정도로 성숙·확정되어 익금이 귀속되었다고 보기 부족하며, 보상합의에 따라 지급 받은 금원이 원고(법인)에게 귀속되었다고 보기 어려움",
        sentencedAt: "2025.07.21",
      })),
    []
  );

  return (
    <div>
      <NavBar />
      <CaseSearchBar onSubmit={handleSearch} />

      <CaseResultList total={total} items={results} loading={loading} />
    </div>
  );
}
