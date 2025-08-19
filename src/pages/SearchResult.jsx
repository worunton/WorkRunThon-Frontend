import NavBar from "../components/NavBar";
import ResultSearchBar from "../components/ResultSearchBar";
import styles from "./SearchResult.module.css";

export default function SearchResult() {
  return (
    <div className={styles.page}>
      <NavBar />

      <div className={styles.topSearch}>
        <ResultSearchBar />
      </div>

      <main className={styles.content}></main>
    </div>
  );
}
