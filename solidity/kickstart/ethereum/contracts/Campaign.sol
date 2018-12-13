pragma solidity ^0.4.17;
contract CampaignFactory {
    address[] public deployedCampaigns;
    function createCampaign(uint minium)public {
        address newCampaign = new Campaign(minium, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}


contract Campaign {
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approversCount;
        mapping(address=>bool) approvers;
    }
    
    Request[] public requests;
    address public manager;
    uint miniumContribution;
    // address[] public approvers;
    mapping(address=> bool) public approvers;
    uint approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(uint minium, address creator) public{
        manager = creator;
        miniumContribution = minium;
    }
    
    function contribute() public payable {
        require(msg.value >= miniumContribution);
        // approvers.push(msg.sender);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient)public restricted{
       
        Request memory newRequest =  Request({
            description: description,
            value: value,
            recipient: recipient,
            complete:false,
            approversCount:0
            
        });
        requests.push(newRequest);
    }
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!requests[index].approvers[msg.sender]);
        
        request.approvers[msg.sender] = true;
        request.approversCount++;
        
    }
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approversCount >(approversCount/2));
        require(!request.complete);
        request.recipient.transfer(request.value);
        request.complete = true;
    }
    
}