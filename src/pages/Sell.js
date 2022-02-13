import Caver from "caver-js";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { TSCONTRACT, YTTCONTRACT } from "../variables";
import ST_ADDRESS from "../contractInfo/SKKRYPTOCONTRACT/STCONTRACT_ADDRESS.json";
import TS_ADDRESS from "../contractInfo/SKKRYPTOCONTRACT/TOKENSALES_ADDRESS.json";
import TS_ABI from "../contractInfo/SKKRYPTOCONTRACT/TOKENSALES_ABI.json";
import ST_ABI from "../contractInfo/SKKRYPTOCONTRACT/STCONTRACT_ABI.json";

const Sell = () => {
  const caver = new Caver(window.klaytn);
  const STCONTRACT = new caver.klay.Contract(ST_ABI, ST_ADDRESS);
  window.klaytn.enable();

  const feePayer = caver.klay.accounts.wallet.add(
    //클레이튼 개인키로 추가해줍니다.
    "0x8cafa33df8c1740720bc4815ce7c7cd61d18aaf396bb2a3da5e197f0c7b85aff"
  );
  useEffect(() => {
    // STCONTRACT.methods
    //   .setApprovalForAll(TS_ADDRESS, true)
    //   .send({
    //     from: window.klaytn.selectedAddress,
    //     gas: "250000",
    //   })
  }, []);

  const approve = async () => {
    const { rawTransaction: senderRawTransaction } =
      await caver.klay.signTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: window.klaytn.selectedAddress,
        to: ST_ADDRESS,
        data: STCONTRACT.methods
          .setApprovalForAll(TS_ADDRESS, true)
          .encodeABI(),
        gas: "5000000",
        value: caver.utils.toPeb("0", "KLAY"),
      });

    caver.klay
      .sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: feePayer.address,
      })
      .then((receipt) => {
        console.log(receipt.transactionHash);
      });
  };

  const cancelApprove = async () => {
    const { rawTransaction: senderRawTransaction } =
      await caver.klay.signTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: window.klaytn.selectedAddress,
        to: ST_ADDRESS,
        data: STCONTRACT.methods
          .setApprovalForAll(TS_ADDRESS, false)
          .encodeABI(),
        gas: "5000000",
        value: caver.utils.toPeb("0", "KLAY"),
      });

    caver.klay
      .sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: feePayer.address,
      })
      .then((receipt) => {
        console.log(receipt.transactionHash);
      });
  };

  const sellToken = async () => {
    const { rawTransaction: senderRawTransaction } =
      await caver.klay.signTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: window.klaytn.selectedAddress,
        to: TS_ADDRESS,
        data: TSCONTRACT.methods
          .setForSale(2020312708, caver.utils.toPeb("1", "peb"))
          .encodeABI(),
        gas: "500000",
        value: caver.utils.toPeb("0", "KLAY"), // payable 타입일때는 1
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

  return (
    <>
      <Button onClick={approve}>컨트랙트에 판매권한 주기</Button>
      <br />
      <Button onClick={cancelApprove}>컨트랙트에 판매 권한 취소</Button>
      <br />
      <Button onClick={sellToken}>내 토큰 판매하기</Button>
      <br />
    </>
  );
};

export default Sell;
