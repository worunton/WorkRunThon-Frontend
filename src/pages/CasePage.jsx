import { useCallback } from "react";
import NavBar from "../components/NavBar";
import CaseSearchBar from "../components/searchBar/CaseSearchBar";

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
    const { category, query, precedent, currentDecision, adminAppeal } =
      payload;

    // 판례 검색
    if (category === "precedent") {
      const sp = buildQuery({
        category,
        query,
        courtLevel: precedent.courtLevel,
        caseTarget: precedent.caseTarget,
        courtName: precedent.courtName,
        dateMode: precedent.dateMode,
        dateFrom: precedent.dateFrom,
        dateTo: precedent.dateTo,
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
        ...currentDecision,
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
        ...adminAppeal,
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

  return (
    <div>
      <NavBar />
      <CaseSearchBar onSubmit={handleSearch} />
      {/* TODO: 아래에 결과 카운트/리스트 영역 추가 예정 */}
    </div>
  );
}
