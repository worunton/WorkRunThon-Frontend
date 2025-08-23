import NavBar from "@/components/NavBar";
import SearchBar from "@/components/searchBar/SearchBar";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <NavBar />

      <main className={styles.main}>
        <div className={styles.center}>
          <img
            src="/images/logo.png"
            alt="사각사각 로고"
            className={styles.bigLogo}
            loading="eager"
          />
          <SearchBar />
        </div>
      </main>
    </div>
  );
}
