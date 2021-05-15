pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaign;

    function createCampaign(uint min_contri) public{
        address newCampaign = new Campaign(min_contri, msg.sender);
        deployedCampaign.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[]){
        return deployedCampaign;
    }
}


contract Campaign{
    struct SpendRequest{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approval_count;
        mapping(address=>bool) approvals;
    }

    SpendRequest[] public spend_requests;
    address public manager;
    uint public minimum_contribution;
    mapping(address=>bool) public approvers;
    uint public approvers_count;

    modifier manager_only(){
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint min_contri, address creator) public{
        manager = creator;
        minimum_contribution = min_contri;
    }

    function contribution() public payable{
        require(msg.value >= minimum_contribution);
        approvers[msg.sender]=true;
        approvers_count++;
    }

    function createRequest(string description, uint value, address recipient)
        public manager_only{
        SpendRequest memory newRequest = SpendRequest({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approval_count: 0
        });
        spend_requests.push(newRequest);
    }

    function approveRequest(uint index) public{
        SpendRequest storage spend_request = spend_requests[index];
        require(approvers[msg.sender]);
        require(!spend_request.approvals[msg.sender]);

        spend_request.approvals[msg.sender] = true;
        spend_request.approval_count++;
    }

    function finalizeRequest(uint index) public manager_only {
        SpendRequest storage spend_request = spend_requests[index];
        require(!spend_request.complete);
        require(spend_request.approval_count > (approvers_count/2));

        spend_request.recipient.transfer(spend_request.value);

        spend_request.complete = true;
    }
}
