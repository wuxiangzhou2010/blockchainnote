// use node v8.14.1, not working on  v10+


const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");



// #### use infura
// const provider = new HDWalletProvider(
//   "resist okay grid decide subject half there will lady size turkey cheap",
//   "https://rinkeby.infura.io/v3/XXXXXXXXXXcb4a89bbe4289a399ae6b9"
// );
// const web3 = new Web3(provider);
// #### use infura


// ### use standard rpc api
const web3 = new Web3("http://1.1.1.1:8545");
// ### use standard rpc api

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("getAccounts result ", accounts);
  if (accounts != undefined) {
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log("getBalanceOf ", accounts[0], "is ", balance);
  }
  // console.log(accounts);
  // const result = await new  web3.eth.Contract(JSON.parse(interface))
  // .deploy({data:bytecode})
  // .send({gas: '1000000',from:accounts[0]});
  // console.log('Contract deployed to ', result.options.address);
};

deploy();
