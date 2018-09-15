# Solidity

## get solc

``` sh
pacman -S solidity
```

`https://github.com/ethereum/solidity/releases`

## solc

``` sh
solc --help
solc helloworld.sol
# output EVM assembly
solc --asm helloworld.sol
# output in bytecode (hex)
solc --bin helloworld.sol

# --optimize
```

## Three type of Comment

- single-line comments (`//`)
- multi-line comments (`/* ... */`)
- `///` or `/** ...*/`

## Import

 In solidity, you can reference other solidity source files so you can use them in your current source files.

``` sol
import "./token.sol";
import "./Token.sol" as token;
```

## Value types

- Address
- Integer
- boolean
- Byte Arrays

 refer to [Components](ttps://soliditylang.com/documentation/language-specifications.html)

## function modifier

``` js
pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value >.01 ether);
        players.push(msg.sender)
    }
    function random() public view returns (uint){
        return uint(keccak(block.difficulty, now, players))
    }


    function pickWiner() public restricted {
        uint index = random() % player.length
        player[index].transfer(this.balance)
        player = new address[](0)
    }

    modifier restricted() {
        require(ms.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}
```

每一个合约有且仅有一个没有名字的函数。这个函数无参数，也无返回值。如果调用合约时，没有匹配上任何一个函数(或者没有传哪怕一点数据)，就会调用默认的回退函数。

一个没有定义一个回退函数的合约。如果接收ether，会触发异常，并返还ether（solidity v0.4.0开始）。
所以合约要接收ether，必须实现回退函数。

refer to: `http://www.tryblockchain.org/14825685263030.html`