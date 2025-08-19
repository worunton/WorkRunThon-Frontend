import { useState } from "react";
import styles from "./CaseAdvCurrentDecision.module.css";

/** 재판부 */
const CHAMBERS = [
  { label: "전체", value: "all" },
  { label: "전원재판부", value: "full" },
  { label: "지정재판부", value: "designated" },
];

/** 종국결과 */
const DISPOSITIONS = [
  { label: "전체", value: "all" },
  { label: "각하", value: "dismiss" },
  { label: "기각", value: "reject" },
  { label: "인용", value: "uphold" },
  { label: "위헌", value: "unconstitutional" },
  { label: "합헌", value: "constitutional" },
  { label: "한정위헌", value: "partial_unconstitutional" },
  { label: "한정합헌", value: "partial_constitutional" },
  { label: "헌법불합치", value: "incompatibility" },
  { label: "기타", value: "etc" },
];

export default function CaseAdvancedCurrentDecision({ value, onChange }) {
  const [local, setLocal] = useState({
    chamber: "all",
    disposition: "all",
  });
  const state = value ?? local;
  const setState = onChange ?? ((next) => setLocal(next));
  const setField = (k, v) => setState({ ...state, [k]: v });

  return (
    <div className={styles.panel}>
      {/* 재판부 */}
      <div className={styles.field}>
        <div className={styles.label}>재판부</div>
        <div className={styles.radios}>
          {CHAMBERS.map((o) => (
            <label key={o.value} className={styles.radio}>
              <input
                type="radio"
                name="chamber"
                checked={state.chamber === o.value}
                onChange={() => setField("chamber", o.value)}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 종국결과 */}
      <div className={styles.field}>
        <div className={styles.label}>종국결과</div>
        <div className={styles.radios}>
          {DISPOSITIONS.map((o) => (
            <label key={o.value} className={styles.radio}>
              <input
                type="radio"
                name="disposition"
                checked={state.disposition === o.value}
                onChange={() => setField("disposition", o.value)}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
