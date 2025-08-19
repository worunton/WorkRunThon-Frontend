import NavBar from "../components/NavBar";
import CaseSearchBar from "../components/searchBar/CaseSearchBar";

export default function Case() {
  return (
    <div>
      <NavBar />
      <CaseSearchBar />
      {/* TODO: 아래에 결과 카운트/리스트 영역 추가 예정 */}
    </div>
  );
}
