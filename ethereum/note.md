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

### [Contract-Tutorial](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

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

### (JavaScript-API)https://github.com/ethereum/wiki/wiki/JavaScript-API）

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

## 三、智能合约

### 3.1 编辑合约代码

创建一个 Token.sol 文件,内容如下：

``` js
contract Token {
    address issuer;
    mapping (address => uint) balances;

    event Issue(address account, uint amount);
    event Transfer(address from, address to, uint amount);

    function Token() {
        issuer = msg.sender;
    }

    function issue(address account, uint amount) {
        if (msg.sender != issuer) throw;
        balances[account] += amount;
    }

    function transfer(address to, uint amount) {
        if (balances[msg.sender] < amount) throw;

        balances[msg.sender] -= amount;
        balances[to] += amount;

        Transfer(msg.sender, to, amount);
    }

    function getBalance(address account) constant returns (uint) {
        return balances[account];
    }
}
```

这份代码实现了一个简单的Token合约功能。
issue 函数可以充值以太到合约账户
transfer 函数可以向其他账号发送token
getBalance 函数可以获取某个账号的token余额

### 3.2 编译与部署

    压缩合约代码
    命令行下执行 cat Token.sol | tr '\n' ' '
    这条命令将代码中的换行符替换成空格，这样我们的代码就只有一行了。命令执行成功后将回显复制下来。

    将合约代码保存为一个变量
    回到Geth JavaScript 控制台，执行如下命令，等于号后面的内容就是我们刚才复制下来的压缩后的合约代码。

    var tokenSource = 'contract Token { address issuer; mapping (address => uint) balances; event Issue(address account, uint amount); event Transfer(address from, address to, uint amount); function Token() { issuer = msg.sender; } function issue(address account, uint amount) { if (msg.sender != issuer) throw; balances[account] += amount; } function transfer(address to, uint amount) { if (balances[msg.sender] < amount) throw; balances[msg.sender] -= amount; balances[to] += amount; Transfer(msg.sender, to, amount); } function getBalance(address account) constant returns (uint) { return balances[account]; } }';

    编译
    var tokenCompiled = eth.compile.solidity(tokenSource);

    若不成功，请参考https://ethereum.stackexchange.com/questions/15435/how-to-compile-solidity-contracts-with-geth-v1-6提供的替代方案

    查看二进制代码
    tokenCompiled['<stdin>:Token'].code

    查看ABI
    tokenCompiled['<stdin>:Token'].info.abiDefinition

    创建合约对象
    var contract = eth.contract(tokenCompiled['<stdin>:Token'].info.abiDefinition);

    var initializer = {from: web3.eth.accounts[0], data: tokenCompiled['<stdin>:Token'].code, gas: 300000};

    var token = contract.new(initializer)

输入命令 token 可以看到此时的token有transactionHash 但是没有address
执行 miner.start(1) 一段时间后停止，我们的合约就发布到了链上

### 3.3 与合约进行交互

    充值
    personal.unlockAccount(eth.accounts[0])
    token.issue.sendTransaction(eth.accounts[0], 100, {from: eth.accounts[0]});
    miner.start(1)
    miner.stop()

    发送 token
    token.transfer(eth.accounts[1], 30, {from: eth.accounts[0]})
    miner.start(1)
    miner.stop()

    查看余额
    token.getBalance()

<!--
## 三、QTUM

目前QTUM的智能合约完全兼容现有 solidity 语法，以太坊中的合约脚本可以轻松移植到QTUM中，新一代智能合约语言 eSML 也在稳步开发中。

QTUM 将以太坊 EVM 搭建在比特币 UTXO 架构上，通过轻钱包就可以登录EVM。轻钱包采用SPV协议，用户可以与区块链网络互动，并验证各自交易信息，不用下载及同步完整区块链。合并改进版本的比特币核心基础架构和可以相互兼容的以太坊虚拟机版本，使得量子链既拥有比特币坚不可摧的区块链网络又能发挥智能合约的无限可能。-->

- refer to

[以太坊私链与智能合约部署入门教程](https://forum.qtum.org/topic/127/%E4%BB%A5%E5%A4%AA%E5%9D%8A%E7%A7%81%E9%93%BE%E4%B8%8E%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E9%83%A8%E7%BD%B2%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B)
[How to Build a Private Ethereum Blockchain](https://media.consensys.net/how-to-build-a-private-ethereum-blockchain-fbf3904f337)

[Ethereum can be viewed as a transaction-based state machine](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)

[Blockchain at Berkeley](https://www.youtube.com/channel/UC5sgoRfoSp3jeX4DEqKLwKg/playlists)

### nonce

为了防止交易的重播攻击，每笔交易必须有一个nonce随机数，针对每一个账户nonce都是从0开始，当nonce为0的交易处理完之后，才会处理nonce为1的交易，并依次加1的交易才会被处理.以下是nonce使用的几条规则：

    当nonce太小，交易会被直接拒绝。
    当nonce太大，交易会一直处于队列之中
    当发送一个比较大的nonce值，然后补齐开始nonce到那个值之间的nonce，那么交易依旧可以被执行。
    当交易处于queue中时停止geth客户端，那么交易queue中的交易会被清除掉。

- [Internal transaction and transaction](https://dewone.zendesk.com/hc/zh-cn/articles/360005205873-Transactions-%E5%92%8CInternal-Transactions%E7%9A%84%E5%8C%BA%E5%88%AB)

### 区块儿浏览器

区块链浏览器一：https://etherscan.io

区块链浏览器二：https://www.etherchain.org

智能合约也是个账户，没有私钥，但是可以收到别人打过来的代币，作为中转账户使用

收款：外部给智能合约转账为了接收Ether，(fallback)回退函数必须标记为payable。
如果没有这样的函数，合约不能通过常规transactions接收Ether。

``` js
//这里的address指的是你要提现的账户地址
//value代表了你要提现的金额
 address.transfer(value);
```