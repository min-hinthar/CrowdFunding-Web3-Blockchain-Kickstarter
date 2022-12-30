// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//Structure of Campaign
contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations; 
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

//Create new Campaign function
    function createCampaign(
        address_owner, 
        string memory_title, 
        string memory_description, 
        uint256_target, 
        uint256_deadline, 
        string memory_image) public returns (uint256) {
            Campaign storage campaign = campaigns[numberOfCampaigns];

            //check to verify campaign structure requirements
            require(campaign.deadline < block.timestamp, "Error: The deadline should be a date in the future.");

            campaign.owner = _owner;
            campaign.title = _title;
            campaign.description = _description;
            campaign.target = _target;
            campaign.deadline = _deadline;
            campaign.amountCollected = 0;
            campaign.image = _image;

            numberOfCampaigns++;

            return numberOfCampaigns - 1;
        }

    function donateToCampaign(uint256_id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaigns.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent){
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(uint256_id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
        }

    function getCampaigns() {}
}