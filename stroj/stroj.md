# Stroj

[stroj download](https://storj.io/share)
[time](http://www.timesynctool.com/)
[ntp pool](http://www.pool.ntp.org/en/)
[time sync](https://docs.storj.io/v1.1/docs/storj-share-gui#section--3-1-1-ntp-synchronization-for-windows-)

```sh
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.3/install.sh | bash
nvm install --lts
sudo apt-get update && sudo apt-get dist-upgrade
sudo apt-get install git python build-essential -y
npm install --global storjshare-daemon
storjshare create --storj=YOUR_STORJ_TOKEN_WALLET_ADRESS --storage=/mnt/storjmerge/storj.io/

storjshare daemon

storjshare start --config /home/pi/.config/storjshare/configs/zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz.json

storjshare killall
storjshare status
```