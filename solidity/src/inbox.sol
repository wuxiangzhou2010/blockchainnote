//specifies the version of solidity that our code is written with

pragma solidity ^0.4.17;

// can be think of as class
contract Inbox {
    //type view and variable name
    string public message;//declear storage variable

    // constructor function, automatically called
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    // function name / function type(public view) /return value
    // public -- anyone can call this function.
    // private --  only this contract can call this function.
    // view -- this function returns data and does not modify the contract's data
    // constant -- this function returns data and does not modify the contract's data
    // pure -- function will not modify or even read the contract's data
    // payable -- when someone call this function they might send ether along
    function getMessage() public view returns (string) {
        return message;
    }
}