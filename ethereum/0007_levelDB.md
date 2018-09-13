# levelDB

Geth uses leveldb. Some of the reasons behind choosing it was:

    1. In process database (i.e. I don't need to run an additional software)
    2. Native implementation in Go (i.e. cross platform to everything Go supports)
    3. Key/value store (i.e. values are arbitrary binary blobs, no schema constraints)
    4. Modern data storage (i.e. multiple layers on disk, organized in the background)
    5. Proven track record (i.e. many companies and other databases build on top)

However, there are also limitations:

    1. Ethereum uses hashes exclusively for identifying anything. However, hashes are uniformly randomly distributed identifiers. Leveldb keeps keys organized "alphabetically" on disk, so accessing values associated with hashes is very expensive. This is mostly felt for the state trie, which is hundreds of thousands of nodes scattered and pointing all over the disk. However, without a specific database modelling the Ethereum trie by design, I don't see how this could be further optimized.
    2. Leveldb was originally designed by Google to be a disk backed memory database. As long as most of it can fit into memory, it performs very well, but as more and more disk access is required, performance can degrade. Facebook's RocksDB tries to address some of these issues + multi threaded background compaction, but its still a fairly new thing and being in C makes portability hard.

- [which-databases-do-the-ethereum-clients-use-and-why](https://ethereum.stackexchange.com/questions/824/which-databases-do-the-ethereum-clients-use-and-why)

## [goleveldb](https://github.com/syndtr/goleveldb)

- path

`https://github.com/ethereum/go-ethereum/tree/master/ethdb`