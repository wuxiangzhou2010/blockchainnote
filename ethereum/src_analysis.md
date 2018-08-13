# Ethereum source code analysis

## rlp: Recursive Length Prefix

    The only purpose of RLP is to encode structure; encoding specific atomic data types (eg. strings, ints, floats) is left up to higher-order protocols;

## whisper

    In a nutshell whisper is a communication protocol for DApps to communicate with each other.

## p2p

- NAT  provides access to common network port mapping protocols.
- discover implements the Node Discovery Protocol.
- discv5 implements the RLPx v5 Topic Discovery Protocol.
- peer

## trie

    trie implements Merkle Patricia Tries.

- [ethereum-merkle-tree-explanation](https://ethereum.stackexchange.com/questions/15288/ethereum-merkle-tree-explanation)
- [merkling-in-ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)

## crypto

- sha3  (NIST 2015.8发布， 作为sha1 sha2 的替代)
   Ethereum's "sha3_256" and "sha3_512" hashes are not standard sha3 hashes, but a variant often referred to as "Keccak-256" and "Keccak-512" in other contexts.

- elliptic curve  ECDSA

## accounts

- abi
- keystore
- usbwallet

accounts implements high level Ethereum account management. 

account and wallet 硬件钱包， keystore

abi implements the Ethereum ABI (Application Binary Interface). 

``` go
type Account struct {
    Address common.Address
    URL URL
}
```

``` go
type Wallet interface {
    Open(passphrase string) error
    Close() error
    Accounts() []Account
    Contains(account Account) bool
    SignTx
    SignHashWithPassphrase
    SignTxWithPassphrase
    ...
}
type Backend interface {
    Wallets() []Wallet
    Subscribe (sink chan<-WalletEvent) event.Subscribe
}

```

## bmt

    binary merkle tree implementation

## cmd

    编译相关 geth bootnode evm swarm

## common

types/big number/bit/hex manipulation/file descriptor limit/monotonic timer /compiler

## compression

 Package rle implements the run-length encoding used for Ethereum data

## consensus

Package consensus implements different Ethereum consensus engines.

- clique proof-of-authority
- ethash pow

interfaces

## console

## contracts

## core

- asm： deal with EVM assembly  instructions
- state: statedb  trie
- types :   header struct/nonce struct/
            Block --> header uncles transactions hash
            Transaction
            Receipt
- bloombits
- vm

## eth

API
Ethereum api
    Public EthereumAPI provides an API to access Ethereum full node-related information.
peer api
miner api
debug api
admin api

default config

``` go
type Config struct {
    // The genesis block, which is inserted if the database is empty.
    // If nil, the Ethereum main net block is used.
    Genesis *core.Genesis `toml:",omitempty"`

    // Protocol options
    NetworkId uint64 // Network ID to use for selecting peers to connect to
    SyncMode  downloader.SyncMode
    NoPruning bool

    // Light client options
    LightServ  int `toml:",omitempty"` // Maximum percentage of time allowed for serving LES requests
    LightPeers int `toml:",omitempty"` // Maximum number of LES client peers

    // Database options
    SkipBcVersionCheck bool `toml:"-"`
    DatabaseHandles    int  `toml:"-"`
    DatabaseCache      int
    TrieCache          int
    TrieTimeout        time.Duration

    // Mining-related options
    Etherbase    common.Address `toml:",omitempty"`
    MinerThreads int            `toml:",omitempty"`
    ExtraData    []byte         `toml:",omitempty"`
    GasPrice     *big.Int

    // Ethash options
    Ethash ethash.Config

    // Transaction pool options
    TxPool core.TxPoolConfig

    // Gas Price Oracle options
    GPO gasprice.Config

    // Enables tracking of SHA3 preimages in the VM
    EnablePreimageRecording bool

    // Miscellaneous options
    DocRoot string `toml:"-"`
}
```

## ethdb

    use level db, 增删改查

### ethstats

    ethstats implements the network stats reporting service

## ethclient

## les

    les implements the Light Ethereum Subprotocol.

## miners

    Package miner implements Ethereum block creation and mining

## rpc

- http
- unix ipc
- websocket rpc

## vendor

## [Architecture](http://www.ethdocs.org/en/latest/ethereum-clients/cpp-ethereum/architecture.html)

[[以太坊源代码分析] I.区块和交易，合约和虚拟机](http://blog.csdn.net/teaspring/article/details/75389151?locationNum=3&fps=1)

- 地址和hash

    常用数据类型 哈希值和地址 big.Int

``` go
# /commons/types.go
const (
    HashLength = 32
    AddressLength = 20
)
type Hash [HashLength]byte
type Address [AddressLength]byte
```

哈希值在数学上的唯一性使得它可以用作某个对象的全局唯一标识符。

- RLP（Recursive Length Prefix）编码

    它可以将一个任意嵌套的字节数组([]byte)，编码成一个“展平”无嵌套的[]byte。1 byte取值范围0x00 ～ 0xff，可以表示任意字符，所以[]byte可以线性的表示任意的数据。最简单比如一个字符串，如果每个字符用ASCII码的二进制表示，整个字符串就变成一个[]byte。 RLP 编码其实提供了一种序列化的编码方法，无论输入是何种嵌套形式的元素或数组，编码输出形式都是[]byte。RLP是可逆的，它提供了互逆的编码、解码方法。
    Ethereum 中具体使用的哈希算法，就是对某个类型对象的RLP编码值做了SHA3哈希运算，可称为RLP Hash。 Ethereum 在底层存储中特意选择了专门存储和读取[k, v] 键值对的第三方数据库，[k, v] 中的v 就是某个结构体对象的RLP编码值([]byte)，`k大多数情况就是v的RLP编码后的SHA-3哈希值`

- 区块是交易的集合

    Receipt的PostState保存了创建该Receipt对象时，整个Block内所有“帐户”的当时状态。

    想得到父区块(parentBlock)对象，直接解析这个ParentHash是不够的， 而是要将ParentHash同其他字符串([]byte)组合成合适的key([]byte), 去kv数据库里查询相应的value才能解析得到。 

- Bloom Filter

    概念定义可见wikipedia，它可用来快速验证一个新收到的对象是否处于一个- 已知的大量对象集合之中。这里Receipt的Bloom，被用以验证某个给定的Log是否处于Receipt已有的Log数组中。

- Swarm

    是一个用于以太坊的分布式文件存储项目。

- Gas
    是Ethereum里对所有活动进行消耗资源计量的单位。

Ethereum 中每个交易(transaction，tx)对象在被放进block时，都是经过数字签名的，这样可以在后续传输和处理中随时验证tx是否经过篡改。Ethereum 采用的数字签名是椭圆曲线数字签名算法(Elliptic Cure Digital Signature Algorithm,ECDSA)。tx的转帐转出方地址，就是对该tx对象作ECDSA签名计算时所用的公钥publicKey,Ethereum中的数字签名计算过程所生成的签名(signature), 是一个长度为65bytes的字节数组，它被截成三段放进tx中，前32bytes赋值给成员变量R, 再32bytes赋值给S，末1byte赋给V

Ethereum 里的哈希函数，用的是SHA-3，256 bits；数据(数组)的序列化，用的是RLP编码，所以所有对象，数组的哈希算法，实际用的RLP + SHA-3。数字签名算法，使用了椭圆曲线数字签名算法(ECDSA)

所有交易或操作的结果，将以各个个体账户的状态(state)存在，账户的呈现形式是stateObject，所有账户的集合受StateDB管理。

Block的哈希值，等于其Header成员的(RLP)哈希值