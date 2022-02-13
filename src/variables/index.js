import Caver from 'caver-js';

const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651',
};
const cav = new Caver(config.rpcURL);
const IPFSCONTRACT = new cav.klay.Contract(ABI, ADDRESS);

export { cav, IPFSCONTRACT };
