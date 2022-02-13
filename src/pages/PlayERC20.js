import Caver from 'caver-js';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import ERC20ABI from '../contractInfo/ERC20/ABI.json';
import ERC20ADDRESS from '../contractInfo/ERC20/ADDRESS.json';

const PlayERC20 = () => {
  const caver = new Caver(window.klaytn);
  const ERC20CONTRACT = new caver.klay.Contract(ERC20ABI, ERC20ADDRESS);

  const feePayer = caver.klay.accounts.wallet.add(
    //클레이튼 개인키로 추가해줍니다.
    '0x8cafa33df8c1740720bc4815ce7c7cd61d18aaf396bb2a3da5e197f0c7b85aff'
  );

  const transferERC20 = () => {};

  return <></>;
};

export default PlayERC20;
