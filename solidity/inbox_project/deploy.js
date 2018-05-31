const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'resist okay grid decide subject half there will lady size turkey cheap',
'https://rinkeby.infura.io/asdfghjklqwertyuiiio'
);

const web = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('attemping to deploy from account', accounts[0]);
    // console.log(accounts);
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode, arguments:['Hi there!']})
    .send({gas: '1000000',from:accounts[0]});
    console.log('Contract deployed to ', result.options.address);
};
