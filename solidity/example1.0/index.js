// 1. connect ethereum through infura api
// 2. getBalance with with callback

const Web3 = require("web3");
const rpcURL = "https://rinkeby.infura.io/v3/c627a81327cb4a89bbe4289a399ae6b9"; // Your RPC URL goes here

const web3 = new Web3(rpcURL);

const address = "0x9e3E5CBb0d4B6bDA40E734EE53451Bd03661e1ab"; // Your account address goes here

console.log("test account is :", address);

const test = async () => {
  let currentBlockNumber = await web3.eth.getBlockNumber();
  console.log("1. current block number is ", currentBlockNumber);
  var balance = await web3.eth.getBalance(address);
  console.log("2. balance of ", address, " is ", balance.toString(10));

  let txCount = await web3.eth.getBlockTransactionCount(currentBlockNumber);
  console.log("3. txCount of block ", currentBlockNumber, " is ", txCount);

  if (txCount != 0) {
    let tx = await web3.eth.getTransactionFromBlock(currentBlockNumber, 1); // get transaction index 0
    console.log("4. tx 0 of block ", currentBlockNumber, " is ", tx);

    let receipt = await web3.eth.getTransactionReceipt(tx.hash);
    console.log("5. receipt of ", tx.hash, "is ", receipt);
  }
};

test();
