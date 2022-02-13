import Caver from "caver-js";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { STCONTRACT } from "../variables";
import ST_ADDRESS from "../contractInfo/SKKRYPTOCONTRACT/STCONTRACT_ADDRESS.json";
const MakeNFT = () => {
  const caver = new Caver(window.klaytn);

  const feePayer = caver.klay.accounts.wallet.add(
    //클레이튼 개인키로 추가해줍니다.
    "0x8cafa33df8c1740720bc4815ce7c7cd61d18aaf396bb2a3da5e197f0c7b85aff"
  );

  const makeNFT = async () => {
    const { rawTransaction: senderRawTransaction } =
      await caver.klay.signTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: window.klaytn.selectedAddress,
        to: ST_ADDRESS,
        data: STCONTRACT.methods
          .mintSToken(
            "김용",
            7,
            2020312708,
            "개발팀",
            "2021",
            "https://ipfs.infura.io/ipfs/Qmbw6Sv8w1gH48u4eKV8M9sEt76YgpCo2UdM69bUxZMS88",
            "2022-02-13"
          )
          .encodeABI(),
        gas: "50000000",
        value: caver.utils.toPeb("0", "KLAY"), //payable 타입이라면 "0"=>"1"
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
      <Button onClick={makeNFT}>nft 만들기</Button>
    </>
  );
};

export default MakeNFT;
