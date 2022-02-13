const STCONTRACT = artifacts.require('SkkrypToken');
const TokenSales = artifacts.require('TokenSales');
const fs = require('fs');

module.exports = function (deployer) {
  deployer.deploy(TokenSales, STCONTRACT.address).then(() => {
    if (TokenSales._json) {
      fs.writeFile('./src/contractInfo/TSCONTRACT/ABI.json', JSON.stringify(TokenSales._json.abi), (err) => {
        if (err) throw err;
        console.log('파일에 ABI 입력 성공');
      });
    }

    fs.writeFile('./src/contractInfo/TSCONTRACT/ADDRESS.json', TokenSales.address, (err) => {
      if (err) throw err;
      console.log('파일에 주소 입력 성공');
    });
  });
};
