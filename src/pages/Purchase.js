import Caver from 'caver-js';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import ST_ADDRESS from '../contractInfo/STCONTRACT/ADDRESS.json';
import ST_ABI from '../contractInfo/STCONTRACT/ABI.json';
import TS_ADDRESS from '../contractInfo/TSCONTRACT/ADDRESS.json';
import TS_ABI from '../contractInfo/TSCONTRACT/ABI.json';
import ERC20ABI from '../contractInfo/ERC20/ABI.json';
import ERC20ADDRESS from '../contractInfo/ERC20/ADDRESS.json';
const Sell = () => {
  const sellToken = async () => {
    const caver = new Caver(window.klaytn);
    const TSCONTRACT = new caver.klay.Contract(TS_ABI, TS_ADDRESS);
    // window.klaytn.enable();

    const feePayer = caver.klay.accounts.wallet.add(
      //클레이튼 개인키로 추가해줍니다.
      '0x8cafa33df8c1740720bc4815ce7c7cd61d18aaf396bb2a3da5e197f0c7b85aff'
    );
    const ERC20CONTRACT = new caver.klay.Contract(ERC20ABI, ERC20ADDRESS);
    const { rawTransaction: senderRawTransaction } = await caver.klay.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: window.klaytn.selectedAddress,
      to: ERC20ADDRESS,
      data: ERC20CONTRACT.methods.transfer('0xf0375C82D83e269A324eae0ff0866f1850c6Ee2b', caver.utils.toPeb('1', 'KLAY')).encodeABI(),
      gas: '500000',
      value: caver.utils.toPeb('0', 'peb'),
    });

    caver.klay
      .sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: feePayer.address,
      })
      .then(async (receipt) => {
        if (receipt.transactionHash) {
          console.log(receipt.transactionHash);

          caver.klay
            .sendTransaction({
              type: 'VALUE_TRANSFER',
              from: window.klaytn.selectedAddress,
              to: '0xda885688cffbe34536482696ab9aac93fa330596',
              value: caver.utils.toPeb('1', 'peb'),
              gas: 800000,
            })
            .once('transactionHash', (transactionHash) => {
              console.log('txHash', transactionHash);
            })
            .once('receipt', (receipt) => {
              console.log('receipt', receipt);
            })
            .once('error', (error) => {
              console.log('error', error);
            });

          // const data = caver.klay.abi.encodeFunctionCall(
          //   {
          //     name: 'puchaseToken',
          //     type: 'function',
          //     inputs: [
          //       {
          //         type: 'uint32',
          //         name: '_tokenId',
          //       },
          //     ],
          //   },
          //   [2020312708]
          // );

          // caver.klay
          //   .sendTransaction({
          //     type: 'SMART_CONTRACT_EXECUTION',
          //     from: feePayer.address,
          //     to: TS_ADDRESS,
          //     value: caver.utils.toPeb('1', 'peb'),
          //     gas: 800000,
          //     data,
          //   })
          //   .once('transactionHash', (transactionHash) => {
          //     console.log('txHash', transactionHash);
          //   })
          //   .once('receipt', (receipt) => {
          //     console.log('receipt', receipt);
          //   })
          //   .once('error', (error) => {
          //     console.log('error', error);
          //   });
        }
      });
  };

  return (
    <>
      <Button onClick={sellToken}>내 토큰 구매하기</Button>
      <br />
    </>
  );
};

export default Sell;
