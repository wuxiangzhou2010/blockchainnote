var Web3 = require("web3");
var web3 = new Web3();

web3.setProvider(
  new web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/c627a81327cb4a89bbe4289a399ae6b9"
  )
);
const address = "0x9e3E5CBb0d4B6bDA40E734EE53451Bd03661e1ab";
console.log("test account is :", address);
let currentBlockNumber = web3.eth.blockNumber;
console.log("1. current block number is ", currentBlockNumber);
var balance = web3.eth.getBalance(address);
console.log("2. balance of ", address, " is ", balance.toString(10));

let txCount = web3.eth.getBlockTransactionCount(currentBlockNumber);
console.log("3. txCount of block ", currentBlockNumber, " is ", txCount);

if (txCount != 0) {
  let tx = web3.eth.getTransactionFromBlock(currentBlockNumber, 1); // get transaction index 0
  console.log("4. tx 0 of block ", currentBlockNumber, " is ", tx);

  let receipt = web3.eth.getTransactionReceipt(tx.hash);
  console.log("5. receipt of ", tx.hash, "is ", receipt);
}
