## Ethereum source code analysis

#### rlp: Recursive Length Prefix
#### p2p
- NAT
- discover
- peer
    
#### trie  
- [ethereum-merkle-tree-explanation](https://ethereum.stackexchange.com/questions/15288/ethereum-merkle-tree-explanation)
- [merkling-in-ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)

#### crypto  
- sha3  
   Ethereum's "sha3_256" and "sha3_512" hashes are not standard sha3 hashes, but a variant often referred to as "Keccak-256" and "Keccak-512" in other contexts.

- elliptic curve  ECDSA

#### accounts: 

account and wallet 硬件钱包， keystore

#### bmt :   
    
    binary merkle tree implementation 

#### cmd:    
    
    编译相关 geth bootnode evm swarm

#### common 

types/big number/bit/hex manipulation/file descriptor limit/monotonic timer /compiler

#### compression

 run length encoding 

#### consensus:
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
- vm
#### eth
#### ethdb
#### ethclient

#### miners

#### rpc 
- http 
- unix ipc 
- websocket rpc 

#### vendor 
    
    