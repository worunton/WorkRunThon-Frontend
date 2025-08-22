import { get } from "./http";
import { MOCK_TIMELINE } from "@/data/timeLine.mock";

const useMock = true;

// GET /cases/precedents/{caseId}/timeline
export async function fetchCaseTimeline(caseId) {
  if (useMock) {
    return MOCK_TIMELINE;
  }
  return get(`/cases/precedents/${caseId}/timeline`);
}
