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

the Go way

``` sh
go get -u github.com/ethereum/go-ethereum/cmd/geth
```

## From bin

[download](https://ethereum.github.io/go-ethereum/downloads/)

``` sh
tar xfv **.tar.gz
```

## From PPA

`https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Ubuntu`

[another link, bundle](https://ethereum.github.io/go-ethereum/install/)