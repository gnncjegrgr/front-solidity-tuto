import Caver from 'caver-js';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import ERC20ABI from '../contractInfo/ERC20/ABI.json';
import ERC20ADDRESS from '../contractInfo/ERC20/ADDRESS.json';

const PlayERC20 = () => {
  const caver = new Caver(window.klaytn);
  const ERC20CONTRACT = new caver.klay.Contract(ERC20ABI, ERC20ADDRESS);

  const transferERC20 = async () => {
    const caver = new Caver(window.klaytn);
    const feePayer = caver.klay.accounts.wallet.add(
      //클레이튼 개인키로 추가해줍니다.
      '0x8cafa33df8c1740720bc4815ce7c7cd61d18aaf396bb2a3da5e197f0c7b85aff'
    );
    const { rawTransaction: senderRawTransaction } = await caver.klay.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: window.klaytn.selectedAddress,
      to: ERC20ADDRESS,
      data: ERC20CONTRACT.methods.transfer('0xf0375C82D83e269A324eae0ff0866f1850c6Ee2b', 10).encodeABI(),
      gas: '500000',
      value: caver.utils.toPeb('0', 'peb'),
    });

    caver.klay
      .sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: feePayer.address,
      })
      .then(function (receipt) {
        if (receipt.transactionHash) {
          console.log(receipt.transactionHash);
        }
      });
  };

  const checkBalance = async () => {
    const res = await ERC20CONTRACT.methods.balanceOf('0x934a084fB003de8D9d9B53Eb8804877Cf01b7B63').call();
    console.log(res);
  };

  return (
    <>
      <Button onClick={transferERC20}>yt(erc20) 토큰 보내보기</Button>
      <Button onClick={checkBalance}>밸런스 보기</Button>
    </>
  );
};

export default PlayERC20;
