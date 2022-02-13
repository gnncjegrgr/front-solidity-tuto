import { Button } from "@mui/material";
import { useEffect } from "react";
import { STCONTRACT } from "../variables";
import ST_ADDRESS from "../contractInfo/SKKRYPTOCONTRACT/STCONTRACT_ADDRESS.json";
const Search = () => {
  const checkKimyong = async () => {
    let res1 = await STCONTRACT.methods.getST(2020312708).call();
    console.log(res1[0]);
    console.log(res1);
  };

  const alreadyCreated = async () => {
    let res1 = await STCONTRACT.methods
      .isTokenAlreadyCreated(2020312708)
      .call();
    console.log(res1);
  };

  return (
    <>
      <Button onClick={checkKimyong}>김용 정보 확인하기</Button>
      <Button onClick={alreadyCreated}>김용 만들어졌는지 확인</Button>
    </>
  );
};

export default Search;
