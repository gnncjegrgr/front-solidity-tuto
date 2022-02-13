import "./App.css";
import Caver from "caver-js";
import { Link } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import MainPage from "./pages/MainPage";
import MakeNFT from "./pages/MakeNFT";
import Search from "./pages/Search";
import Sell from "./pages/Sell";
import Purchase from "./pages/Purchase";

function App() {
  return (
    <div>
      <Link href="/">홈</Link>
      <br />
      <Link href="/makeNFT">Skkryptoken 만들기</Link>
      <br />
      <Link href="/search">token확인하기</Link>
      <br />
      <Link href="/sell">token팔기</Link>
      <br />
      <Link href="/purchase">token 사기</Link>
      <br />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="makenft" element={<MakeNFT />} />
          <Route path="search" element={<Search />} />
          <Route path="sell" element={<Sell />} />
          <Route path="purchase" element={<Purchase />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
