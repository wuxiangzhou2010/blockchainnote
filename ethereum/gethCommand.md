# 环境搭建

## API

modules:

`Dapp api` and additional `management api`

[management api](https://github.com/ethereum/go-ethereum/wiki/Management-APIs)

### using json rcp and console

- enable management api

``` sh
geth --ipcapi admin,eth,miner --rpcapi eth,web3 --rpc
```

  http rpc, ipc, websocket

- admin

        admin.nodeInfo
        admin.peers
        admin.addPeer
        admin.setSolc
        admin.startRPC (8545)
        admin.startWS  (8546)
        admin.stopWS
        admin.stopRPC

- debug
        debug.backtraceAt
        debug.blockProfile
        debug.cpuProfile
        debug.dumpBlock
        debug.gcStats
        debug.getBlockRlp
        debug.goTrace
        debug.seedHash
        debug.setHead
        debug.setBlockProfileRate
        debug.stacks
        debug.startCPUProfile
        debug.startGoTrace
        debug.stopCPUProfile
        debug.stopGoTrace
        debug.traceBlock

- txpool

        txpool.content
        txpool.inspect
        txpool.status

- miner

        miner.setExtra (sets the extra data a miner ca n include when miner blocks)
        miner.setGasPrice
        miner.start
        miner.stop
        miner.setEtherBase

- personal

        personal.importRawKey
        personal.listAccounts
        personal.lockAcclunt
        personal.newAccount
        personal.unlockAccount
        personal.sendTransaction
        personal.sign
        personal.ecRecover

- eth
- ethash
- net
- rpc
- web3

### [accounts]((https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts))

```sh
geth account new
geth account list   --> eth.accounts
geth account update
geth account import
geth --unlock
```

### [Mining](https://github.com/ethereum/go-ethereum/wiki/Mining)

```sh
miner.start(8)
miner.stop()
miner.setEtherbase(eth.accounts[2])
miner.hashrate
eth.getBalance(eth.coinbase)
personal.unlockAccount(eth.coinbase)
```

### [docker](https://github.com/ethereum/go-ethereum/wiki/Running-in-Docker)

```sh
docker run -it -p 30305:30303 -v /root/docker/docker3:/root/.ethereum  -v /root/genesis_cmb.json:/root/genesis_cmb.json ethereum/client-go init /root/genesis_cmb.json

docker run -it -p 30305:30303 -v /root/docker/docker3:/root/.ethereum  -v /root/genesis_cmb.json:/root/genesis_cmb.json ethereum/client-go --networkid 15  --bootnodes enode://ed23c476c7d743ce4f78d6f45255d2b1380939faba1663aa4c39138e5b056552f723e3ae64ffc245c01340b0f1588f725a204766d2e03f5ef47f12e42320636b@[192.168.1.130]:30303

```

### [JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC)

### [JavaScript-Console](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console)

```sh

geth --datadir "" --verbosity 3 console --ipcpath geth-data1.ipc -rpc --rpcport "8545" --rpcaddr "0.0.0.0" --rpcapi "admin,eth,miner,net,personal,web3,txpool"
geth console
geth attach

# ipc
geth attach ipc:/some/custom/path

# http rpc
geth attach http://192.168.1.1:8545

# websocket
geth attach ws://192.168.1.1:8546
```

### [JavaScript-API](https://github.com/ethereum/wiki/wiki/JavaScript-API)

## 二、配置私链节点

### 2.1 创世块设置

新建文件夹，命名随意，在此文件夹下创建genesis.json文件和data文件夹
genesis.json 的内容如下：

``` json
{
    "config": {
            "chainId": 123456,
            "homesteadBlock": 0,
            "eip155Block": 0,
            "eip158Block": 0
    },
    "nonce": "0x0000000000000042",
    "difficulty": "0x020000",
    "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "timestamp": "0x00",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "extraData": "0x11bbe8db4e347b4e8c937c1c8370e4b5ed33adb3db69cbdb7a38e1e50b1b82fa",
    "gasLimit": "0x4c4b40",
    "alloc": {}
}
```

### 2.2 初始化

在命令行下进入刚才创建的文件夹，输入如下命令：

```sh
geth --datadir data init genesis.json
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

### 2.4 Geth JavaScript控制台环境使用说明

```js
// 创建新账号
personal.newAccount()
// 或者
personal.newAccount("123456")

// 查看节点信息
admin.nodeInfo

// 挖矿
// 开始挖矿
miner.start(1)
// 停止挖矿
miner.stop()

// 查看当前矿工账号
eth.coinbase // 默认为第一个账户

// 修改矿工账号
miner.setEtherbase(eth.accounts[1])

// 查看账户信息
eth.accounts[0]

// 查看账户余额
eth.getBalance(eth.accounts[0])
// 或者
web3.fromWei(eth.getBalance(eth.accounts[0]), "ether")

// 解锁账号
personal.unlockAccount(eth.accounts[0])
// 使用账户资金前都需要先解锁账号

// 转账
eth.sendTransaction({from:eth.accounts[0],to:"0x587e57a516730381958f86703b1f8e970ff445d9",value:web3.toWei(3,"ether")})

// 看到交易状态
txpool.status

// 查看区块数据
eth.blockNumber
eth.getTransaction("0x0c59f431068937cbe9e230483bc79f59bd7146edc8ff5ec37fea6710adcab825")
eth.getBlock(1)
// 通过区块号查看区块
```