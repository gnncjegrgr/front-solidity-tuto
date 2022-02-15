### node_modules를 추가한 이유는 react 웹팩버전과 caver-js 가 충돌이 나서 caver-js를 추가했습니다. npm install 할 필요없이 그냥 npm start해서 사용하시면 됩니다.

#### 사용방법 
1. prettier 설정 하기 https://nuggy875.tistory.com/109 여기 링크로 들어가서 설정해주세요.(필수는 아님)
2. kaikas 설치하기 크롬 확장프로그램 스토어에서 kaikas를 설치해줍니다.
3. skkrypto-front-solidity 위치에서 truffle migrate --compile-all --reset --network klaytn 그대로 터미널 창에 입력해주고, 클레이튼 바오밥 네트워크에 배포해줍니다. 
4. 그 다음에 ./src/contractInfo/ERC20/ADDRESS.json, ./src/contractInfo/STCONTRACT/ADDRESS.json, ./src/contractInfo/TSCONTRACT/ADDRESS.json에 컨트랙트 주소가 0x00... 으로 되어 있는데 이 주소에 큰따옴표를 씌워 줍니다.
5. react 코드를 보면서 어떤 역할을 하는지 확인해 주고 필요하다면 코드를 수정하면서 쓰면 될 것 같습니다.

#### 소스 코드 설명
##### ./src/App.js
Route 코드를 작성했습니다. react-router-dom 버전 6이기 때문에 코드 수정하려면(ver 5하고 좀 코드가 다릅니다.)  https://reactrouter.com/docs/en/v6/getting-started/overview 공식문서를 참고하시면 될 것 같습니다.
##### ./src/pages/MainPage.js
###### 버튼설명 
1. 카이카스 로그인 : kaikas 로그인을 하는 버튼입니다.
2. value transfer 트랜잭션 보내기 : 클레이를 보내는 트랜잭션을 발생시키는 버튼입니다.
3. 스마트 컨트랙트 트랜잭션 send하기 : 바이밥 네트워크에 배포된 스마트 컨트랙트와 연결하여 블록체인 상에 정보를 저장
4. 대납 트랜잭션 발생시키기 : 바오밥 네트워크에 배포된 스마트 컨트랙트와 연결하여 setter함수를 실행시키면서 발생하는 가스비를 대신 납부합니다.
5. 대납 트랜잭션 결과 : 대납 트랜잭션의 결과를 봅니다.(getter함수로 보기)

위의 설명을 바탕으로 나머지 코드도 보시면 될 것 같습니다.
