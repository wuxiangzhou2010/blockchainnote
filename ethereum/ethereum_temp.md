# [ethereum-and-solidity](https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/)

1. what is ethereum?
2. [app#1]how do we interact with ethereum
3. [app#2]Tooling, Deployment, Testing of Apps with Ethereum.
4. [app#3]Building a multiple page app with ethereum

Golal of this course

- Buil web apps with ethereum

[github](https://github.com/StephenGrider/EthereumCasts)
P2P

## history

- 2008.12.31 bitcoin whilte paper
- 2009 bitcoin launched ---> only for transactions
- 2013.12 Ethereum, paper and online 2015
    Ethereum with smart contract and easy to create Dapps

[Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf)
[Ethereum: The Ultimate Smart Contract and Decentralized Application Platform](http://web.archive.org/web/20131228111141/http://vbuterin.com/ethereum.html)

ethereum are used to transfer money and store data.
there are many different Ethereum networks, main ,test, private networks
Each node is a machine running an ethereum client.
Each node can contain a full copy of the blockchain
THe "blockchain" is a database that store a record of every transaction that has ever taken place.

## technolody

- technology for the developers `web3 js`.

- for consumers `metamask/mist browser`

## metamask

- main network
- Robsten test network
- Kovan test network
- Rinkeby test network

localhost 8545
custom RPC

## account

account address
public key
private key

## get some  money

rinkeby-faucet.com

## transaction

- backend server used web3 library to create a transaction

- a transaction

nonce  How many times the sender has sent a transaction
to
value
Gas price
start Gas/Gas limit
v
r
s

- backend server waited for transaction to be confirmed.

your transaction reach a node
node will collect many transaction to a block
validation logic takes 30 seconds//mining

## blockchain demo

sha256 different input has different hash
    block number
    Nonce
    data
    prev: points backwards
    hash start with some number of zero

mine: get the right  Nonce  that make the hash to start with a certain number of zero(less than some number) block time time to find a solution block time

blockchain
token

hash 64 character long 1.15 x 10^77

## contract

- balance: amount of ether this account owns
- storage: data storage for this contract
- code Raw machine code for this contract

External account

contract is connected to a network, need to deploy to a network. class --> instance

## solidity

- wirtten in `.sol` files
- strongly typed
- similar to Javascript

variables

string
address
int/uint

public/private/internal/external

### solidity is simple and not take much time, but not the applocation (html,css)

### solidity--> compiler --> byte code and ABI(for javascript to interactive with)

[section 1, lecture 17]

## [IDE](https://remix.ethereum.org)

public `get function` is already create automatically

## transaction to create contract

- sender --- is the one who want to create the contract
- to field --- is left as blank
- data --- compiled byte code of the contract
- value --- initial value

if you want to change anyting one the blockchain, you need to spend some amount of money.

- calling a function: can return data, runs instantly, free to do, can not modify the contract's data
- send a transaction to the function:  returns the transaction hash, take time to execute, cost money, not modify data.

## ether vs wei

dollar and cents

## Gas and transaction

- break each operation and find the GAS cost

    ADD 3
    MUL 5
    SUB 3
    EQ 3

- gas price, amount of wei willing to offer for a Gas

    startGas/Gaslimit Uints of Gas this transaction consume

## 12 words mnemonic BIP39 mnemonic Algorithm

generate a series of account public address and private key

[bip39](https://iancoleman.io/bip39/)

## [get more ether](http://faucet.rinkeby.io)

## truffle

contract creation/local testing/deployment --> rinkeby network

- undergoing rapid development
- someting don't work
- somethings don't work at all
- stuff breaks -patience is required

## custom node project

contract creation/ local testing/ deployment --> rinkeby

editor
version control

- setup the solidity compiler to build our contract
- Moca testing
- setup a deploy script to compile + deploy our contract.

## Project

```js
npm install --save solc
npm install --save moca ganache-cli web3@1.0.0-beta.26
```

## web3 version

v0.x.x --> v1.x.x
callbacks for async code --> support for promise + async/await

## web3 providers

`Web3` constructor--> `web3` instance(need setup the `provider`)--> communicate with test network

## Mocha functions

- it  -- run a test and make an assertion
- describe -- group together `it` functions
- beforeEach -- execute some general setup code

call a function on a contract/call(), send()

## [infura API](https://infura.io/)

```sh
npm install --save truffle-hdwallet-provider
```