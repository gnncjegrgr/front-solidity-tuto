import { Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import Caver from "caver-js";
import { IPFSCONTRACT, cav } from "../variables";

const MainPage = () => {
  const caver = new Caver(window.klaytn);

  const feePayer = caver.klay.accounts.wallet.add(
    //클레이튼 개인키로 추가해줍니다.
    "0x8cafa33df8c1740720bc4815ce7c7cd61d18aaf396bb2a3da5e197f0c7b85aff"
  );

  const [kasAccount, setKasAccount] = useState();

  useEffect(() => {}, []);

  const activateKaikas = async () => {
    const accounts = await window.klaytn.enable();
    setKasAccount(accounts[0]);
  };

  const checkResult1 = async () => {
    const vari = await IPFSCONTRACT.methods.getIpfsAddress("2022-02-13").call();
    console.log(vari);
  };

  const signFeeDelegatedTransaction = async () => {
    const { rawTransaction: senderRawTransaction } =
      await caver.klay.signTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: window.klaytn.selectedAddress,
        to: "0x469f65e038A41fC36eCfBf0C366131bF87892388",
        data: IPFSCONTRACT.methods
          .setIpfsAddress("2022-02-13", "today")
          .encodeABI(),
        gas: "500000",
        value: caver.utils.toPeb("0", "KLAY"),
      });
    caver.klay
      .sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: feePayer.address,
      })
      .then(function (receipt) {
        console.log(receipt.transactionHash);
      });
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div>간단한 kaikas 실습</div>
      <Button onClick={activateKaikas}>카이카스 로그인</Button>
      <div>{kasAccount}</div>

      <br />
      <Button onClick={signFeeDelegatedTransaction}>
        대납 트랜잭션 발생시키기
      </Button>
      <br />
      <Button onClick={checkResult1}> 대납 트랜잭션 결과 </Button>
    </>
  );
};

export default MainPage;
