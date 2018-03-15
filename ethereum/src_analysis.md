## Ethereum source code analysis

#### rlp: Recursive Length Prefix
#### whisper
#### p2p
- NAT
- discover/discv5
- peer
    
#### trie  

    trie implements Merkle Patricia Tries.

- [ethereum-merkle-tree-explanation](https://ethereum.stackexchange.com/questions/15288/ethereum-merkle-tree-explanation)
- [merkling-in-ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)

#### crypto  
- sha3  
   Ethereum's "sha3_256" and "sha3_512" hashes are not standard sha3 hashes, but a variant often referred to as "Keccak-256" and "Keccak-512" in other contexts.

- elliptic curve  ECDSA

#### accounts: 
account and wallet 硬件钱包， keystore

```
type Account struct {
    Address common.Address
    URL URL
}
```
```
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

#### bmt :   
    
    binary merkle tree implementation 

#### cmd:    
    
    编译相关 geth bootnode evm swarm

#### common 

types/big number/bit/hex manipulation/file descriptor limit/monotonic timer /compiler

#### compression

 Package rle implements the run-length encoding used for Ethereum data

#### consensus:

Package consensus implements different Ethereum consensus engines.
- clique proof-of-authority
- ethash pow 

interfaces

#### console

#### contracts:
    
#### core:
- asm： deal with EVM assembly  instructions
- state: statedb  trie
- types :   header struct/nonce struct/
            Block --> header uncles transactions hash
            Transaction
            Receipt   
- bloombits            
- vm
#### eth

API
Ethereum api
    PublicEthereumAPI provides an API to access Ethereum full node-related information.
peer api
miner api 
debug api
admin api

default config

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

#### ethdb

    use level db, 增删改查

##### ethstats

    ethstats implements the network stats reporting service

#### ethclient

#### les

    les implements the Light Ethereum Subprotocol.

#### miners

    Package miner implements Ethereum block creation and mining

#### rpc 
- http 
- unix ipc 
- websocket rpc 

#### vendor 
    
## Architecture
http://www.ethdocs.org/en/latest/ethereum-clients/cpp-ethereum/architecture.html