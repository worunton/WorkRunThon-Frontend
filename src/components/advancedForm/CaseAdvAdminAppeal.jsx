import { useState } from "react";
import styles from "./CaseAdvAdminAppeal.module.css";

/** 심판유형 */
const APPEAL_TYPES = [
  { label: "전체", value: "all" },
  { label: "일반", value: "general" },
  { label: "특별", value: "special" },
];

export default function CaseAdvancedAdminAppeal({ value, onChange }) {
  const [local, setLocal] = useState({
    appealType: "all",
  });
  const state = value ?? local;
  const setState = onChange ?? ((next) => setLocal(next));
  const setField = (k, v) => setState({ ...state, [k]: v });

  return (
    <div className={styles.panel}>
      {/* 심판유형 */}
      <div className={styles.field}>
        <div className={styles.label}>심판유형</div>
        <div className={styles.radios}>
          {APPEAL_TYPES.map((o) => (
            <label key={o.value} className={styles.radio}>
              <input
                type="radio"
                name="appealType"
                checked={state.appealType === o.value}
                onChange={() => setField("appealType", o.value)}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
