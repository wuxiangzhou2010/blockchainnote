
### geth ethereum

#### From source 
[Install and compile geth ethereum](https://www.youtube.com/watch?v=1ZTQaXSENNs)
[you can get the latest go](../build/go,md)
```
sudo apt-get install golang make -y

git clone https://github.com/ethereum/go-ethereum.git
cd go-ethereum
git checkout release/1.6
make geth
```

the go way

```
go get -u github.com/ethereum/go-ethereum/cmd/geth
```
#### From bin

https://ethereum.github.io/go-ethereum/downloads/
tar xfv ...tar.gz 

### [From PPA](https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Ubuntu)

#### start the testnet 
```
geth --testnet --fast 
```
what happened?

- connect the test peers and get the whole blockchain 
- DB path: /home/ubuntu/.`ethereum/testnet/geth/chaindata`

[Youtube video](https://www.youtube.com/watch?v=OTck7SLXTHY9)