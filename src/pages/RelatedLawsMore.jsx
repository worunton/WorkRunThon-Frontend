import { useNavigate } from "react-router-dom";
import data from "../data/relatedLaws.mock.json";
import RelatedLawCard from "@/components/relatedLaw/RelatedLawCard";
import NavBar from "@/components/NavBar";
import styles from "./RelatedLawsMore.module.css";

export default function RelatedLawsMore() {
  const nav = useNavigate();

  return (
    <div>
      <NavBar />
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <button className={styles.backBtn} onClick={() => nav(-1)}>
            <img src="/images/arrow_left_icon.png" alt="뒤로가기" />
            뒤로가기
          </button>
          <h2 className={styles.title}>관련 법령</h2>
          <span className={styles.number}>총 {data.length}건</span>
        </div>

        <div className={styles.cards}>
          {data.map((item) => (
            <RelatedLawCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
