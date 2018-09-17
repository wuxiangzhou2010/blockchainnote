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

## pragma

``` js
pragma solidity ^0.4.0
```

表达式遵循npm 使用规则

## Import

 In solidity, you can reference other solidity source files so you can use them in your current source files.

``` sol
import "./token.sol";
import "./Token.sol" as token;
```

## Value types

- string
- bool
- address
- int(int8, int16 ... int256),

  - int == int256

- uint (uint8, uint16 ... uint256)
  
  - uint == uint256
  
- fixed/ufixed

<!-- refer to: [Components](https://soliditylang.com/documentation/language-specifications.html) -->

## reference types

- fixed array

int[3] --> [1,2,3], bool[2] --> [false, true]

- dynamic array

int[] --> [1,2,3], bool[] --> [false, true]

- mapping

Collection of key value pairs.

mapping(string => string)

mapping(int => bool)

- struct

## message

- msg.data
- msg.gas
- msg.sender
- msg.value

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

## 回退函数（fallback function）

每一个合约有且仅有一个没有名字的函数。这个函数无参数，也无返回值。如果调用合约时，没有匹配上任何一个函数(或者没有传哪怕一点数据)，就会调用默认的`回退函数`。

一个没有定义一个回退函数的合约。如果接收ether，会触发异常，并返还ether（solidity v0.4.0开始）。
所以`合约要接收ether，必须实现回退函数`。

refer to: `http://www.tryblockchain.org/14825685263030.html`

## nested dynamic array is not implemented in solidity

## this  指当前合约

- 深入理解Solidity : `https://blog.csdn.net/diandianxiyu_geek/article/details/77942459`
- Solidity in Depth `https://solidity.readthedocs.io/en/develop/solidity-in-depth.html`

The following statements are considered modifying the state:

    Writing to state variables.
    Emitting events.
    Creating other contracts.
    Using selfdestruct.
    Sending Ether via calls.
    Calling any function not marked view or pure.
    Using low-level calls.
    Using inline assembly that contains certain opcodes.
