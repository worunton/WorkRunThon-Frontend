import { useSearchParams, Link } from "react-router-dom";

export default function SearchResult() {
  const [params] = useSearchParams();
  const query = params.get("query") || "";

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
      <Link to="/">← 메인으로</Link>
      <h1 style={{ marginTop: 16, marginBottom: 8 }}>검색 결과</h1>
      <p style={{ color: "var(--color-2)" }}>
        query: <b>{query}</b>
      </p>

      {/* TODO: 실제 검색 API 연동 */}
      <div
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid var(--color-3)",
          borderRadius: 8,
        }}
      >
        실제 결과 리스트는 여기 렌더링
      </div>
    </div>
  );
}
