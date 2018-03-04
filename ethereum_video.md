[Dan's Intro to How Ethereum Works](https://www.youtube.com/watch?v=-SMliFtoPn8&t=4s)
- hash 
- Merkel tree/ hash of hash
- blockchain add some data and hash together
- 共识算法 Proof work (racing)


etherrum block structure

    timestamp
    list of transactions
    hash
    parent hash
    uncles
    miner address
    difficulty
    Nonce
    Gas used 
    reward

transaction structure
    
    from 
    to 
    Gas price 
    Gas limit 
    value 
    data
    signature

VM state: user accounts and contracts

- send ether between two address
- call method on a contract
- contract reacts to being called