# Private network

## start ethereum

``` sh
geth

# the testnet
geth --testnet --fast
```

### what happened

- connect the test peers and get the whole blockchain
- DB path: /home/ubuntu/.`ethereum/testnet/geth/chaindata`

refer to: [Youtube video](https://www.youtube.com/watch?v=OTck7SLXTHY9)

- start ethereum with docker

## [Net type](https://github.com/ethereum/go-ethereum)

    main network    ChainID: 0
    test network    ChainID: 3
    rinkeby         ChainID: 4

- [list of chain ids](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md)

## modify `genesis.json`

新建文件夹，命名随意，在此文件夹下创建genesis.json文件和data文件夹
genesis.json 的内容如下：

``` js
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

``` sh
geth --datadir=/root/testdir/data init /root/testdir/genesis.json
```

各参数代表的含义如下：

    init 表示初始化区块，后面跟着创世块的配置文件genesis.json
    datadir 数据存放的位置

### 2.3 启动节点

```sh
geth --datadir data --networkid 123456 --rpc --rpccorsdomain "*" --nodiscover console
```

各参数代表的含义如下：

    networkid 设置当前区块链的网络ID，用于区分不同的网络，1表示公链
    rpc 表示启动rpc通信，可以进行智能合约的部署和调试
    console 表示启动命令行模式，可以在geth中执行命令

执行成功后将进入区块链的JavaScript控制台环境
geth-run

## create account and check balance

```sh
geth attach /root/testdir/data/geth.ipc
> eth.accounts
> personal.newAccount("mypassword")
> web3.fromWei(eth.getBalance(eth.accounts[0]), "ether")
> miner.setEtherbase("0xd65f5ba9d88a6c67a5dfcb70c38c02165cbb07d0")
> miner.start(1)
>
```

- write and deploy the contract
- interact with the contract

``` sh
geth --datadir "$ETH_HOME/youtube1" init "$ETH_HOME/genesis.json"
geth --datadir "$ETH_HOME/youtube1" --networkid 1234 console 2>console.log
admin.peers
admin.addPeer("enode://6bf90e342078573304537e6f59da2e5ead6c4d380994ffd98bd425a80853ef18bb0944c18200553568ade6cb4c47f0f2efbaf4991ac165733b9dfd21a0a0c1fb@[::]:30304?discport=0")
admin.nodeInfo
eth.blockNumber

//geth attach /root/eth/youtube1/geth.ipc

geth --datadir "$ETH_HOME/youtube1-a" init "$ETH_HOME/genesis.json"

geth --datadir "$ETH_HOME/youtube1-a" --port 30304 --nodiscover --networkid 1234  console 2>console.log

personal.newAccount()
miner.setEtherbase("0x6019067f35d8f7fcc2094644b18a2b02364900eb")
```

refer to:

- [区块链开发（一）搭建基于以太坊的私有链环境](http://blog.csdn.net/sportshark/article/details/51855007)
- [create private test network](https://omarmetwally.blog/2017/07/25/how-to-create-a-private-ethereum-network/)
- [miner](https://github.com/ethereum-mining/ethminer)
- [ethereum wiki](https://github.com/ethereum/wiki/wiki)
- [setup-ethereum-private-network-on-mac](https://yushuangqi.com/blog/2017/setup-ethereum-private-network-on-mac.html)
- [create a local private multi-node Ethereum network](https://www.youtube.com/watch?v=49KK8MbMggQ&t=1581s)
