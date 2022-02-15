import axios from 'axios';
import Caver from 'caver-js';
import { Button, Link } from '@mui/material';
import ABI from '../contractInfo/PRACCONTRACT/ABI.json';
import ADDRESS from '../contractInfo/PRACCONTRACT/ADDRESS.json';

function AxiosPrac() {
  const onClick = async () => {
    await axios
      .post('http://localhost:5000/test-api', {
        firstName: 'Fred',
        lastName: 'Find',
      })
      .then((res) => console.log(res));
  };

  const signAndSend = async () => {
    const caver = new Caver(window.klaytn);

    const IPFSCONTRACT = new caver.klay.Contract(ABI, ADDRESS);

    const { rawTransaction: senderRawTransaction } = await caver.klay.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: window.klaytn.selectedAddress,
      to: '0x469f65e038A41fC36eCfBf0C366131bF87892388',
      data: IPFSCONTRACT.methods.setIpfsAddress('2022-02-13', 'today is the best!').encodeABI(),
      gas: '500000',
      value: caver.utils.toPeb('0', 'KLAY'),
    });
    // console.log(rawTransaction);
    // console.log(senderRawTransaction);
    console.log(caver);
    console.log(typeof caver);
    await axios
      .post('http://localhost:5000/fee-delegated', {
        transaction: senderRawTransaction,
      })
      .then((res) => console.log(res));
  };

  return (
    <>
      <Button onClick={onClick}>axios(간단)</Button>
      <Button onClick={signAndSend}>백엔드에 서명한 트랜잭션 보내고 백엔드 상에서 트랜잭션 보내기</Button>
    </>
  );
}

export default AxiosPrac;
