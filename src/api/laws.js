import { post } from "@/api/http";

export function lawToAiBody(law) {
  const name = law?.name ?? "";
  const detail = law?.detail ?? "";
  let content = "";

  if (Array.isArray(law?.content)) {
    content = law.content
      .map((c) => c?.explain?.trim())
      .filter(Boolean)
      .join("");
  } else if (typeof law?.content === "string") {
    content = law.content;
  }

  return { name, detail, content };
}

export async function searchLaws(query) {
  return post("law/search", query);
}

export async function fetchMoreLaws({ lawSearchId, offset = 0, limit = 15 }) {
  return post("law/more", { lawSearchId, offset, limit });
}

export async function requestAiInterpretation(law) {
  const body = lawToAiBody(law);
  return post("law/ai", body);
}

export async function fetchLawHistory(payload) {
  return post("law/change", payload);
}
