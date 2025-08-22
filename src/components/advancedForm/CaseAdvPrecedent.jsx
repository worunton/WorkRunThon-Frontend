import { useMemo, useRef, useState } from "react";
import styles from "./CaseAdvPrecedent.module.css";
import courts from "@/constants/courts.json";

/** 라디오 옵션 */
const COURT_LEVEL = [
  { label: "전체", value: "전체" },
  { label: "대법원", value: "대법원" },
  { label: "하급심", value: "하급심" },
];

const CASE_TARGET = [
  { label: "전체", value: "전체" },
  { label: "가사", value: "가사" },
  { label: "민사", value: "민사" },
  { label: "세무", value: "세무" },
  { label: "행정", value: "행정" },
  { label: "특허", value: "특허" },
  { label: "형사", value: "형사" },
];

export default function CaseAdvancedPrecedent({ value, onChange }) {
  const [local, setLocal] = useState({
    courtLevel: "전체",
    caseTarget: "전체",
    courtName: "전체",
    dateMode: "all", // 'all' | 'manual'
    dateFrom: "",
    dateTo: "",
  });

  const state = value ?? local;
  const setState = onChange ?? ((next) => setLocal(next));

  const setField = (k, v) => setState({ ...state, [k]: v });

  /** 법원명 드롭다운 */
  const [openCourt, setOpenCourt] = useState(false);
  const [courtSearch, setCourtSearch] = useState("");
  const stickyRef = useRef(null);
  const listRef = useRef(null);

  const courtsFiltered = useMemo(() => {
    const q = courtSearch.trim();
    if (!q) return courts;
    return courts.filter((c) => c.includes(q));
  }, [courtSearch]);

  /** 날짜 입력: 숫자만, 자동 포맷(YYYY.MM.DD) */
  const normalizeDate = (raw) => {
    const onlyDigits = raw.replace(/\D/g, "").slice(0, 8);
    const y = onlyDigits.slice(0, 4);
    const m = onlyDigits.slice(4, 6);
    const d = onlyDigits.slice(6, 8);
    let out = y;
    if (m) out += "." + m;
    if (d) out += "." + d;
    return out;
  };

  return (
    <div className={styles.panel}>
      {/* 법원종류 */}
      <div className={styles.field}>
        <div className={styles.label}>법원종류</div>
        <div className={styles.radios}>
          {COURT_LEVEL.map((o) => (
            <label key={o.value} className={styles.radio}>
              <input
                type="radio"
                name="courtLevel"
                checked={state.courtLevel === o.value}
                onChange={() => setField("courtLevel", o.value)}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 사건대상 */}
      <div className={styles.field}>
        <div className={styles.label}>사건대상</div>
        <div className={styles.radios}>
          {CASE_TARGET.map((o) => (
            <label key={o.value} className={styles.radio}>
              <input
                type="radio"
                name="caseTarget"
                checked={state.caseTarget === o.value}
                onChange={() => setField("caseTarget", o.value)}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 법원명 */}
      <div className={styles.field}>
        <div className={styles.label}>법원명</div>
        <div className={styles.selectWrap}>
          <button
            type="button"
            className={styles.selectBtn}
            onClick={() => setOpenCourt((v) => !v)}
          >
            <span>{state.courtName || "전체"}</span>
            <img
              src="/images/arrow_down_icon.png"
              alt=""
              className={styles.arrowIcon}
            />
          </button>

          {openCourt && (
            <div className={styles.dropdown}>
              <div ref={stickyRef} className={styles.dropdownHeader}>
                <input
                  className={styles.searchInput}
                  placeholder="직접 입력하기"
                  value={courtSearch}
                  onChange={(e) => setCourtSearch(e.target.value)}
                />
              </div>

              <div ref={listRef} className={styles.list}>
                {courtsFiltered.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className={`${styles.listItem} ${
                      state.courtName === name ? styles.activeItem : ""
                    }`}
                    onClick={() => {
                      setField("courtName", name);
                      setOpenCourt(false);
                    }}
                    title={name}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 선고일자 */}
      <div className={styles.field}>
        <div className={styles.label}>선고일자</div>
        <div className={styles.radios}>
          <label className={styles.radio}>
            <input
              type="radio"
              name="dateMode"
              checked={state.dateMode === "all"}
              onChange={() => setField("dateMode", "all")}
            />
            <span>전체기간</span>
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              name="dateMode"
              checked={state.dateMode === "manual"}
              onChange={() => setField("dateMode", "manual")}
            />
            <span>직접입력</span>
          </label>
        </div>

        {state.dateMode === "manual" && (
          <div className={styles.dateRow}>
            <input
              className={styles.dateInput}
              placeholder="YYYY.MM.DD"
              inputMode="numeric"
              value={state.dateFrom}
              onChange={(e) =>
                setField("dateFrom", normalizeDate(e.target.value))
              }
            />
            <span className={styles.dateDash}>-</span>
            <input
              className={styles.dateInput}
              placeholder="YYYY.MM.DD"
              inputMode="numeric"
              value={state.dateTo}
              onChange={(e) =>
                setField("dateTo", normalizeDate(e.target.value))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
