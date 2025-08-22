/**
 * Clause 타입: { number?: string, explain?: string }
 */

/** content 배열을 안전하게 정규화 */
export function normalizeContent(content) {
  if (!Array.isArray(content)) return [];
  return content
    .map((c) => ({
      number: (c?.number ?? "").toString().trim(),
      explain: (c?.explain ?? "").toString().trim(),
    }))
    .filter((c) => c.number || c.explain);
}

/**
 * 줄글(한 문단)로 변환
 * - includeNumber: true면 "① ..." 형식 유지
 * - separator: 항 사이 구분(기본 공백 하나)
 * - fallback: content가 없을 때 대신 쓸 문자열(보통 detail)
 */
export function contentToInline(
  content,
  { includeNumber = true, separator = " ", fallback = "" } = {}
) {
  const list = normalizeContent(content);
  if (!list.length) return fallback;
  return list
    .map((c) =>
      [includeNumber && c.number ? c.number : null, c.explain]
        .filter(Boolean)
        .join(" ")
    )
    .join(separator);
}

/**
 * 항별 한 줄 문자열 배열로 변환
 * - includeNumber: true면 "① ..." 포함
 * - fallback: content 없을 때 [fallback] 또는 [] 반환
 */
export function contentToLines(
  content,
  { includeNumber = true, fallback = "" } = {}
) {
  const list = normalizeContent(content);
  if (!list.length) return fallback ? [fallback] : [];
  return list.map((c) =>
    [includeNumber && c.number ? c.number : null, c.explain]
      .filter(Boolean)
      .join(" ")
  );
}

/**
 * 항별로 number/text 분리된 형태로 반환 (모달에서 번호와 본문 따로 렌더할 때)
 * - [{ number: "①", text: "..." }, ...]
 */
export function contentToLineParts(content, { fallback = "" } = {}) {
  const list = normalizeContent(content);
  if (!list.length) return fallback ? [{ number: "", text: fallback }] : [];
  return list.map((c) => ({ number: c.number || "", text: c.explain }));
}
