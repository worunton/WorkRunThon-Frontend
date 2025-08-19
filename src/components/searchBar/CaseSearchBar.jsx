import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CaseAdvPrecedent from "../advancedForm/CaseAdvPrecedent";
import CaseAdvCurrentDecision from "../advancedForm/CaseAdvCurrentDecision";
import CaseAdvAdminAppeal from "../advancedForm/CaseAdvAdminAppeal";
import styles from "./CaseSearchBar.module.css";

const CATEGORIES = [
  { key: "판례", value: "precedent" },
  { key: "현재결정례", value: "currentDecision" },
  { key: "법제처해석례", value: "interpretation" },
  { key: "행정심판재결례", value: "adminAppeal" },
];

export default function CaseSearchBar() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // 기본값: 판례 + URL 초기값 반영
  const defaultCategory = CATEGORIES[0];
  const initialQuery = params.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(defaultCategory);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAdvanced, setOpenAdvanced] = useState(false);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const advRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 드롭다운 외부클릭 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        openDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpenDropdown(false);
      }
      if (
        openAdvanced &&
        advRef.current &&
        !advRef.current.contains(e.target)
      ) {
        setOpenAdvanced(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown, openAdvanced]);

  const isInterpretation = category.value === "interpretation";

  const resetAll = () => {
    setCategory(defaultCategory);
    setQuery("");
    setOpenAdvanced(false);
    navigate("/case", { replace: true });
    inputRef.current?.focus();
  };

  const submit = () => {
    if (!category?.value || !query.trim()) {
      return;
    }
    navigate(
      `/case?category=${category.value}&query=${encodeURIComponent(
        query.trim()
      )}`
    );
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.hero}>
        <h1 className={styles.title}>어떤 정보를 찾아볼까요?</h1>

        <div
          className={`${styles.formRow} ${
            isInterpretation ? styles.simple : ""
          }`}
        >
          {/* 대분류 */}
          <div className={styles.select} ref={dropdownRef}>
            <button
              type="button"
              className={styles.selectBtn}
              onClick={() => setOpenDropdown((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={openDropdown}
            >
              <img
                src="/images/hammer_icon.png"
                alt=""
                className={styles.searchIcon}
              />
              <span className={styles.filterName}>{category.key}</span>
              <img
                src="/images/arrow_down_icon.png"
                alt=""
                className={styles.downIcon}
              />
            </button>
            {openDropdown && (
              <ul role="listbox" className={styles.dropdown}>
                {CATEGORIES.map((c) => (
                  <li key={c.value}>
                    <button
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => {
                        setCategory(c);
                        setOpenDropdown(false);
                      }}
                    >
                      {c.key}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 검색어 */}
          <div className={styles.inputWrap}>
            <img
              src="/images/search_icon.png"
              alt=""
              className={styles.searchIcon}
            />
            <input
              ref={inputRef}
              className={styles.input}
              placeholder="어떤 법령을 알아볼까요?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>

          {/* 상세검색 */}
          {!isInterpretation && (
            <div className={styles.advWrap} ref={advRef}>
              <button
                type="button"
                className={styles.advBtn}
                onClick={() => setOpenAdvanced((v) => !v)}
                aria-expanded={openAdvanced}
                aria-controls="advanced-panel"
                title="상세검색"
              >
                <img
                  src="/images/filter_icon.png"
                  alt=""
                  className={styles.searchIcon}
                />
                <span className={styles.filterName}>상세검색</span>
                <img
                  src={
                    openAdvanced
                      ? "/images/x_icon.png"
                      : "/images/arrow_down_icon.png"
                  }
                  alt=""
                  className={styles.downIcon}
                />
              </button>

              {openAdvanced && (
                <div
                  id="advanced-panel"
                  className={styles.advDropdown}
                  role="dialog"
                >
                  {category.value === "precedent" && <CaseAdvPrecedent />}
                  {category.value === "currentDecision" && (
                    <CaseAdvCurrentDecision />
                  )}
                  {category.value === "adminAppeal" && <CaseAdvAdminAppeal />}
                </div>
              )}
            </div>
          )}

          {/* 초기화 */}
          <button type="button" className={styles.resetBtn} onClick={resetAll}>
            초기화
          </button>
        </div>

        {/* 검색 */}
        <button type="button" className={styles.submitBtn} onClick={submit}>
          검색
        </button>
      </div>
    </div>
  );
}
