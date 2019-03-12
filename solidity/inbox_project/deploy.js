const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "resist okay grid decide subject half there will lady size turkey cheap",
  "https://rinkeby.infura.io/v3/c627a81327cb4a89bbe4289a399ae6b9"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    //  to use  new verison of truffle-hdwallet-provider, need add "0x" + before bytecode and provider need to be closed with
    // provider.engine.stop();
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};

deploy();
