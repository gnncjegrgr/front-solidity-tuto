import './App.css';
import Caver from 'caver-js';
import { Link } from '@mui/material';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import MakeNFT from './pages/MakeNFT';
import Search from './pages/Search';
import Sell from './pages/Sell';
import Purchase from './pages/Purchase';
import PlayERC20 from './pages/PlayERC20';
import AxiosPrac from './pages/AxiosPrac';

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
      <Link href="/erc20">erc20토큰 함수 이용하기</Link>
      <br />
      <Link href="/axios-action">axios 실습</Link>
      <br />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="makenft" element={<MakeNFT />} />
          <Route path="search" element={<Search />} />
          <Route path="sell" element={<Sell />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="erc20" element={<PlayERC20 />} />
          <Route path="axios-action" element={<AxiosPrac />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
