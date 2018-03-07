pragma solidity ^0.4.0;

contract MyfistContract {
    
    string private m_strName;
    uint private m_uAge;
    
    function MyfistContract(string _name, uint _age) public {
        m_strName = _name;
        m_uAge = _age;
    }
    
    function setName(string _name) public {
        m_strName = _name;
    }
    
    function setAge(uint _age) public {
        m_uAge = _age;
    }
    function getName() public view returns (string) {
        return m_strName;
    }
    function getAge() public view returns (uint) {
        return m_uAge;
    }
}

