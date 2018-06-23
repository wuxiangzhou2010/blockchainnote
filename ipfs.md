# [ipfs](https://ipfs.io)

it uses a `DHT` to store data, a `MerkleDAG` to give it structure, and a `bittorrent` mechanism to exchange data.

ipfs-update is a command-line tool to install and upgrade the ipfs binary.

```sh
go get -u github.com/ipfs/ipfs-update
ipfs-update versions
ipfs-update install latest
```

## ipfs 环境环境配置

IPFS用基于内容的寻址替代传统的基于域名的寻址
将一个文件放到IPFS节点中，将会得到基于其内容计算出的唯一加密哈希值。哈希值直接反映文件的内容，哪怕只修改1比特，哈希值也会完全不同

``` sh
ipfs init
ipfs id
ipfs daemon
```

## web ui `http://localhost:5001/webui`

location based addressing --> content based addressing

## ipfs object

    data
    links

## commit

    parent
    object

## application

wikipedia
dtube

Refer:

[ipfs-blockchain](http://www.8btc.com/ipfs-blockchain)
