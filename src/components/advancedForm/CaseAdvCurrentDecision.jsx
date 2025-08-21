import { useState } from "react";
import styles from "./CaseAdvCurrentDecision.module.css";

/** 재판부 */
const CHAMBERS = [
  { label: "전체", value: "all" },
  { label: "전원재판부", value: "full" },
  { label: "지정재판부", value: "designated" },
];

export default function CaseAdvancedCurrentDecision({ value, onChange }) {
  const [local, setLocal] = useState({
    chamber: "all",
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
    </div>
  );
}
