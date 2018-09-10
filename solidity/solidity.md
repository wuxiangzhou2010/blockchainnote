# Solidity

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
