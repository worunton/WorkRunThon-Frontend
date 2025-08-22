import { get } from "./http";

// 카테고리별 API 경로
const PATHS = {
  precedent: "/cases/precedents",
  currentDecision: "/cases/ccourt_decisions",
  interpretation: "/cases/moleg_interpretations",
  adminAppeal: "/cases/administrative_appeals",
};

export async function fetchCaseTimeline(category, caseId) {
  const base = PATHS[category] || PATHS.precedent;

  const data = await get(`${base}/${caseId}/timeline`);
  return data;
}

/**
 * 공통 검색
 * @param {'precedent'|'currentDecision'|'interpretation'|'adminAppeal'} category
 * @param {object} params  // 공통: { query, startDate, endDate, display, page } + 카테고리별 추가
 */
export async function getCases(category, params = {}) {
  const path = PATHS[category];
  if (!path) throw new Error(`Unknown category: ${category}`);

  const {
    // 공통
    query,
    startDate,
    endDate,
    display = 20,
    page = 1,

    // 카테고리별
    courtType, // precedent
    caseType, // precedent
    courtName, // precedent
    division, // currentDecision
    inquiringAgency, // interpretation
    interpretingAgency, // interpretation
  } = params;

  // 전달 파라미터 화이트리스트
  const base = { query, startDate, endDate, display, page };
  let extra = {};
  if (category === "precedent") {
    extra = { courtType, caseType, courtName };
  } else if (category === "currentDecision") {
    extra = { division };
  } else if (category === "interpretation") {
    extra = { inquiringAgency, interpretingAgency };
  } // adminAppeal은 공통만

  const data = await get(path, { ...base, ...extra });

  // 배열로 바로 오는 케이스 (예: Postman 예시)
  if (Array.isArray(data)) {
    return { total: data.length, items: data };
  }

  // 객체로 오는 케이스(total/items)
  return {
    total:
      data?.total ??
      data?.totalElements ??
      (Array.isArray(data?.items) ? data.items.length : 0),
    items: data?.items ?? [],
  };
}
