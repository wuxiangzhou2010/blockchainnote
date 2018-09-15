// 接受用户转入指定价值的eth，如果用户转入eth较少，则直接返回异常，当用户转入eth较多，则将用户多转入的eth退回

contract Refund {
    
    address owner = 0x0;
    uint256 public Balance = 0x00;
    uint256 ticket = 0.5 ether;    // 一个eth
      
    // 合约构造函数
    // 第一次部署合约时，会调用该方法。
    // 之后执行合约不会调用。
    function Refund() public payable {
        // 将部署合约的地址作为合约拥有者
        owner = msg.sender;
    }
    
function getbalance() public  {
        Balance = this.balance;
    }
  
  
    // 后备函数
    function () public payable {
          require(msg.value >= ticket);
          if (msg.value > ticket) {
              var refundFee = msg.value - ticket;
            msg.sender.transfer(refundFee);
        }
    }
}