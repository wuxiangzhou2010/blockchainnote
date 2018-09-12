
# 三、智能合约

## 3.1 编辑合约代码

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

- `issue`     函数可以充值以太到合约账户
- `transfer`  函数可以向其他账号发送token
- `getBalance` 函数可以获取某个账号的token余额

## 3.2 编译与部署

## 压缩合约代码

命令行下执行 `cat Token.sol | tr '\n' ' '`

这条命令将代码中的换行符替换成空格，这样我们的代码就只有一行了。命令执行成功后将回显复制下来。

将合约代码保存为一个变量
回到Geth JavaScript 控制台，执行如下命令，等于号后面的内容就是我们刚才复制下来的压缩后的合约代码。

``` js
var tokenSource = 'contract Token { address issuer; mapping (address => uint) balances; event Issue(address account, uint amount); event Transfer(address from, address to, uint amount); function Token() { issuer = msg.sender; } function issue(address account, uint amount) { if (msg.sender != issuer) throw; balances[account] += amount; } function transfer(address to, uint amount) { if (balances[msg.sender] < amount) throw; balances[msg.sender] -= amount; balances[to] += amount; Transfer(msg.sender, to, amount); } function getBalance(address account) constant returns (uint) { return balances[account]; } }';

```

## 编译

方法一

``` js
var tokenCompiled = eth.compile.solidity(tokenSource);
```


- 查看二进制代码

``` js
tokenCompiled['<stdin>:Token'].code
```

- 查看ABI

``` js
tokenCompiled['<stdin>:Token'].info.abiDefinition
```

- 创建合约对象

``` js
var contract = eth.contract(tokenCompiled['<stdin>:Token'].info.abiDefinition);

var initializer = {from: web3.eth.accounts[0], data: tokenCompiled['<stdin>:Token'].code, gas: 300000};

var token = contract.new(initializer)
```

输入命令 token 可以看到此时的token有transactionHash 但是没有address
执行 miner.start(1) 一段时间后停止，我们的合约就发布到了链上

方法二

若不成功，请参考 https://ethereum.stackexchange.com/questions/15435/how-to-compile-solidity-contracts-with-geth-v1-6 提供的替代方案

- unlock 一个account
- http://remix.ethereum.org  --> Compile --> Details --> web3Deploy

``` js
var tokenContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Transfer","type":"event"}]);
var token = tokenContract.new(
{
    from: web3.eth.accounts[0],
    data: '0x608060405234801561001057600080fd5b5060008054600160a060020a031916331790556101e5806100326000396000f3006080604052600436106100565763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663867904b4811461005b578063a9059cbb14610081578063f8b2cb4f146100a5575b600080fd5b34801561006757600080fd5b5061007f600160a060020a03600435166024356100d8565b005b34801561008d57600080fd5b5061007f600160a060020a0360043516602435610111565b3480156100b157600080fd5b506100c6600160a060020a036004351661019e565b60408051918252519081900360200190f35b600054600160a060020a031633146100ef57600080fd5b600160a060020a03909116600090815260016020526040902080549091019055565b3360009081526001602052604090205481111561012d57600080fd5b33600081815260016020908152604080832080548690039055600160a060020a03861680845292819020805486019055805193845290830191909152818101839052517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360600190a15050565b600160a060020a0316600090815260016020526040902054905600a165627a7a723058205080e2b76bf1d7fd0e8fe363017d0475936baa456b6b5739214f069b13ea3daf0029',
    gas: '4700000'
}, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
})
```


## 3.3 与合约进行交互

- 充值

``` js
personal.unlockAccount(eth.accounts[0])
token.issue.sendTransaction(eth.accounts[0], 100, {from: eth.accounts[0]});
miner.start(1)
miner.stop()

// 发送 token
token.transfer(eth.accounts[1], 30, {from: eth.accounts[0]})
miner.start(1)
miner.stop()

// 查看余额
token.getBalance()
```

<!--
# 三、QTUM

目前QTUM的智能合约完全兼容现有 solidity 语法，以太坊中的合约脚本可以轻松移植到QTUM中，新一代智能合约语言 eSML 也在稳步开发中。

QTUM 将以太坊 EVM 搭建在比特币 UTXO 架构上，通过轻钱包就可以登录EVM。轻钱包采用SPV协议，用户可以与区块链网络互动，并验证各自交易信息，不用下载及同步完整区块链。合并改进版本的比特币核心基础架构和可以相互兼容的以太坊虚拟机版本，使得量子链既拥有比特币坚不可摧的区块链网络又能发挥智能合约的无限可能。-->

- refer to

[以太坊私链与智能合约部署入门教程](https://forum.qtum.org/topic/127/%E4%BB%A5%E5%A4%AA%E5%9D%8A%E7%A7%81%E9%93%BE%E4%B8%8E%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E9%83%A8%E7%BD%B2%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B)
[How to Build a Private Ethereum Blockchain](https://media.consensys.net/how-to-build-a-private-ethereum-blockchain-fbf3904f337)

[Ethereum can be viewed as a transaction-based state machine](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)

[Blockchain at Berkeley](https://www.youtube.com/channel/UC5sgoRfoSp3jeX4DEqKLwKg/playlists)


## 合约与一般账户的区别

智能合约也是个账户，没有私钥，但是可以收到别人打过来的代币，作为中转账户使用

收款：外部给智能合约转账为了接收Ether，(fallback)回退函数必须标记为payable。
如果没有这样的函数，合约不能通过常规transactions接收Ether。

``` js
//这里的address指的是你要提现的账户地址
//value代表了你要提现的金额
 address.transfer(value);
```

## [Contract-Tutorial](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## 区块儿浏览器

区块链浏览器一: https://etherscan.io

区块链浏览器二: https://www.etherchain.org


## nonce

为了防止交易的重播攻击，每笔交易必须有一个nonce随机数，针对每一个账户nonce都是从0开始，当nonce为0的交易处理完之后，才会处理nonce为1的交易，并依次加1的交易才会被处理.以下是nonce使用的几条规则：

    当nonce太小，交易会被直接拒绝。
    当nonce太大，交易会一直处于队列之中
    当发送一个比较大的nonce值，然后补齐开始nonce到那个值之间的nonce，那么交易依旧可以被执行。
    当交易处于queue中时停止geth客户端，那么交易queue中的交易会被清除掉。

## [Internal transaction and transaction](https://dewone.zendesk.com/hc/zh-cn/articles/360005205873-Transactions-%E5%92%8CInternal-Transactions%E7%9A%84%E5%8C%BA%E5%88%AB)

## example

https://segmentfault.com/a/1190000012365997