import { useNavigate, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";

const TABS = [
  { key: "law", label: "법령 해석", path: "/" },
  { key: "case", label: "판례 조회", path: "/case" },
];

export default function NavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeKey =
    pathname === "/" ? "law" : pathname.startsWith("/case") ? "case" : "law";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <img
            src="/images/logo.png"
            alt="사각사각 로고"
            className={styles.logo}
            loading="eager"
          />
          <p className={styles.title}>사각사각</p>
        </div>

        {/* 탭 */}
        <nav className={styles.nav}>
          {TABS.map((t) => {
            const isActive = activeKey === t.key;
            return (
              <button
                key={t.key}
                onClick={() => navigate(t.path)}
                className={`${styles.item} ${
                  isActive ? styles.itemActive : ""
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
