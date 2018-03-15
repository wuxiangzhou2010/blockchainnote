## Private network

### modify `genesis.json`
```json
{
"config": {
        "chainId": 15,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },

  "alloc"      : {
    "0x0000000000000000000000000000000000000001": {"balance": "111111111"},
    "0x0000000000000000000000000000000000000002": {"balance": "222222222"}
    },

  "coinbase"   : "0x0000000000000000000000000000000000000000",
  "difficulty" : "0x00001",
  "extraData"  : "",
  "gasLimit"   : "0x2fefd8",
  "nonce"      : "0x0000000000000107",
  "mixhash"    : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp"  : "0x00"
}
```
### Creating the rendezvous point
```sh
cd /root/testdir/data
geth --datadir=/root/testdir/data init /root/testdir/genesis.json
bootnode --genkey=boot.key
bootnode --nodekey=boot.key
```
### Starting up member nodes
```sh
geth --datadir=/root/testdir/data --bootnodes=enode://148f3....@10.1.1.1:3031
```
### Running a private miner
```sh
geth --datadir=/root/testdir/data --mine --minerthreads=1 --etherbase=0x..
```
### create account and check balance
```sh
geth attach /root/testdir/data/geth.ipc 
> eth.accounts
> personal.newAccount("mypassword")
> web3.fromWei(eth.getBalance(eth.accounts[0]), "ether")
```
...

- write and deploy the contract 
- interact with the contract


refer:

[区块链开发（一）搭建基于以太坊的私有链环境](http://blog.csdn.net/sportshark/article/details/51855007)

[create private test network](https://omarmetwally.blog/2017/07/25/how-to-create-a-private-ethereum-network/)

[miner](https://github.com/ethereum-mining/ethminer)

[ethereum wiki](https://github.com/ethereum/wiki/wiki)
[setup-ethereum-private-network-on-mac](https://yushuangqi.com/blog/2017/setup-ethereum-private-network-on-mac.html)