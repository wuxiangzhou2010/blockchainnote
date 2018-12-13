import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // metamask is present
    web3 = new Web3(window.web3.currentProvider);
}
else {
    // metamask is not present
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/c627a81327cb4a89bbe4289a399ae6b9'
    );
   
    web3 = new Web3(provider);
    // console.log(provider);
}
export default web3;