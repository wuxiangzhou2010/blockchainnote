# 环境搭建

## API

modules:

`Dapp api` and additional `management api`

[management api](https://github.com/ethereum/go-ethereum/wiki/Management-APIs)

### using json rcp and console

- enable management api

``` sh
geth --ipcapi admin,eth,miner --rpcapi eth,web3 --rpc
geth --datadir "" --verbosity 3 console --ipcpath geth-data1.ipc -rpc --rpcport "8545" --rpcaddr "192.168.1.111" --rpcapi "admin,eth,miner,net,personal,web3,txpool"
geth console
geth attach
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

### JavaScript控制台环境使用说明

```js
// 创建新账号
personal.newAccount()
// 或者
personal.newAccount("123456")
// 解锁账号
personal.unlockAccount(eth.accounts[0])
// 使用账户资金前都需要先解锁账号



// 查看节点信息
admin.nodeInfo


// 开始挖矿
miner.start(1)
// 停止挖矿
miner.stop()
// 修改矿工账号
miner.setEtherbase(eth.accounts[1])

// 查看当前矿工账号
eth.coinbase // 默认为第一个账户
// 查看账户信息
eth.accounts[0]
// 查看账户余额
eth.getBalance(eth.accounts[0])
// 或者

web3.fromWei(eth.getBalance(eth.accounts[0]), "ether")


// 转账
eth.sendTransaction({from:eth.accounts[0],to:"0x587e57a516730381958f86703b1f8e970ff445d9",value:web3.toWei(3,"ether")})

// 看到交易状态
txpool.status
txpool.content

// 查看区块数据
eth.blockNumber
eth.getTransaction("0x0c59f431068937cbe9e230483bc79f59bd7146edc8ff5ec37fea6710adcab825")
// 通过区块号查看区块
eth.getBlock(1)

```