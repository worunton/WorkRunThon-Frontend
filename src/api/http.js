import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  headers: { "Content-Type": "application/json" },
});

// 공통 에러 정리 (인터셉터 없이 try/catch에서 호출)
function normalizeError(err) {
  if (!err.response) {
    return {
      code: "NETWORK_ERROR",
      message: "서버에 연결할 수 없습니다.",
      detail: err.message,
    };
  }
  const { status, data } = err.response;
  return {
    code: String(status),
    message: data?.message || "요청 실패",
    detail: data,
  };
}

export async function get(url, params) {
  try {
    const res = await http.get(url, { params });
    return res.data;
  } catch (e) {
    throw normalizeError(e);
  }
}

export async function post(url, body) {
  try {
    const res = await http.post(url, body);
    return res.data;
  } catch (e) {
    throw normalizeError(e);
  }
}
