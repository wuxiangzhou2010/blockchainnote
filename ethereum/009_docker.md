# docker ethereum

## [docker](https://github.com/ethereum/go-ethereum/wiki/Running-in-Docker)

```sh
docker run -it -p 30305:30303 -v /root/docker/docker3:/root/.ethereum  -v /root/genesis_cmb.json:/root/genesis_cmb.json ethereum/client-go init /root/genesis_cmb.json

docker run -it -p 30305:30303 -v /root/docker/docker3:/root/.ethereum  -v /root/genesis_cmb.json:/root/genesis_cmb.json ethereum/client-go --networkid 15  --bootnodes enode://ed23c476c7d743ce4f78d6f45255d2b1380939faba1663aa4c39138e5b056552f723e3ae64ffc245c01340b0f1588f725a204766d2e03f5ef47f12e42320636b@[192.168.1.130]:30303

```