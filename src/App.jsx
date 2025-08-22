import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import SearchResult from "./pages/SearchResult";
import RelatedLawsMore from "./pages/RelatedLawsMore";
import CasePage from "./pages/CasePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/search/related-laws" element={<RelatedLawsMore />} />
        <Route path="/case" element={<CasePage />} />
      </Routes>
    </BrowserRouter>
  );
}
