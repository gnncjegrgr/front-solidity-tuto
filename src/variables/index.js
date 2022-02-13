import Caver from "caver-js";
import DEPLOYED_ABI from "../contractInfo/IPFSCONTRACT/deployedABI.json";
import DEPLOYED_ADDRESS from "../contractInfo/IPFSCONTRACT/deployedAddress.json";
import ST_ADDRESS from "../contractInfo/SKKRYPTOCONTRACT/STCONTRACT_ADDRESS.json";
import ST_ABI from "../contractInfo/SKKRYPTOCONTRACT/STCONTRACT_ABI.json";
import TS_ADDRESS from "../contractInfo/SKKRYPTOCONTRACT/TOKENSALES_ADDRESS.json";
import TS_ABI from "../contractInfo/SKKRYPTOCONTRACT/TOKENSALES_ABI.json";
import YTT_ABI from "../contractInfo/YTT/YTT_ABI.json";
import YTT_ADDRESS from "../contractInfo/YTT/YTT_ADDRESS.json";

const config = {
  rpcURL: "https://api.baobab.klaytn.net:8651",
};
const cav = new Caver(window.klaytn);
const IPFSCONTRACT = new cav.klay.Contract(
  DEPLOYED_ABI,
  DEPLOYED_ADDRESS["key"]
);

const STCONTRACT = new cav.klay.Contract(ST_ABI, ST_ADDRESS);
const TSCONTRACT = new cav.klay.Contract(TS_ABI, TS_ADDRESS);
const YTTCONTRACT = new cav.klay.Contract(YTT_ABI, YTT_ADDRESS);

let ipfsClient = require("ipfs-http-client");
let ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

export { cav, IPFSCONTRACT, ipfs, STCONTRACT, TSCONTRACT, YTTCONTRACT };
