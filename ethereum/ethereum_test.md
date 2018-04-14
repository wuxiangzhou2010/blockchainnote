# geth ethereum

## From source

[Install and compile geth ethereum](https://www.youtube.com/watch?v=1ZTQaXSENNs)

[you can get the latest go](../../go/go.md)

``` sh
sudo apt-get install golang make -y

git clone https://github.com/ethereum/go-ethereum.git
cd go-ethereum
git checkout release/1.6
make geth
```

the go way

``` sh
go get -u github.com/ethereum/go-ethereum/cmd/geth
```

## From bin

[download](https://ethereum.github.io/go-ethereum/downloads/)

``` sh
tar xfv ...tar.gz
```

## [From PPA](https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Ubuntu)

[another link, bundle](https://ethereum.github.io/go-ethereum/install/)

### start the testnet

``` sh
geth --testnet --fast
```

what happened?

- connect the test peers and get the whole blockchain
- DB path: /home/ubuntu/.`ethereum/testnet/geth/chaindata`

[Youtube video](https://www.youtube.com/watch?v=OTck7SLXTHY9)

[Net type](https://github.com/ethereum/go-ethereum)

    main network    ChainID: 0
    test network    ChainID: 3
    rinkeby         ChainID: 4

[list of chain ids](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md)
start ethereum with docker

Interactive with Geth node

    Json-RPC/ http ws

required port

    8545 TCP, used by the HTTP based JSON RPC API
    8546 TCP, used by the WebSocket based JSON RPC API
    30303 TCP and UDP, used by the P2P protocol running the network
    30304 UDP, used by the P2P protocol's new peer discovery overlay

[JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC)