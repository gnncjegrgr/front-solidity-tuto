import Caver from 'caver-js';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import ERC20ABI from '../contractInfo/ERC20/ABI.json';
import ERC20ADDRESS from '../contractInfo/ERC20/ADDRESS.json';
import TS_ADDRESS from '../contractInfo/TSCONTRACT/ADDRESS.json';
import TS_ABI from '../contractInfo/TSCONTRACT/ABI.json';
import axios from 'axios';

const NftPurchaseERC20 = () => {
  const purchaseNFTwithERC20 = async () => {
    const caver = new Caver(window.klaytn);
    const feePayer = caver.klay.accounts.wallet.add(
      //클레이튼 개인키로 추가해줍니다.
      '0x8cafa33df8c1740720bc4815ce7c7cd61d18aaf396bb2a3da5e197f0c7b85aff'
    );
    const TSCONTRACT = new caver.klay.Contract(TS_ABI, TS_ADDRESS);
    const ERC20CONTRACT = new caver.klay.Contract(ERC20ABI, ERC20ADDRESS);

    const { rawTransaction: senderRawTransaction } = await caver.klay.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: window.klaytn.selectedAddress,
      to: ERC20ADDRESS,
      data: ERC20CONTRACT.methods.transfer('0xDa885688cFFBE34536482696aB9AAc93FA330596', caver.utils.toPeb('1', 'KLAY')).encodeABI(), // '0xf0...'는 내주소
      gas: '500000',
      value: caver.utils.toPeb('0', 'peb'),
    });

    caver.klay
      .sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: feePayer.address,
      })
      .then(async (receipt) => {
        console.log(receipt.transactionHash);
        if (receipt.transactionHash) {
          console.log(receipt.transactionHash);
          const { rawTransaction: senderRawTx } = await caver.klay.signTransaction({
            type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
            from: window.klaytn.selectedAddress,
            to: TS_ADDRESS,
            value: caver.utils.toPeb('1', 'peb'),
            gas: 800000,
            data: TSCONTRACT.methods.purchaseToken(2020312708).encodeABI(),
          });

          axios
            .post('http://localhost:5000/purchaseNFTwithERC20', {
              transaction: senderRawTx,
            })
            .then((res) => console.log(res));
        }
      });
  };

  return (
    <>
      <Button onClick={purchaseNFTwithERC20}>내 erc20으로 nft 사기</Button>
    </>
  );
};

export default NftPurchaseERC20;
