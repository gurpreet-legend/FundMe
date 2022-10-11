// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./PriceConverter.sol";
//Address
//ABI

error NotOwner();

contract FundMe {
    using PriceConverter for uint256; // For using conversions 
     
    // State variables
    address[] public funders;
    mapping(address => uint256) public addressToAmount;
    address /*immutable*/ owner;

    // Fund minimum limit in USD is $10
    uint256 public /*constant*/ MINIMUM_USD = 10;

    // constructor:
    constructor() {
        owner = msg.sender;
    }

    // modifiers
    modifier onlyOwner {
        // require(msg.sender != owner, "You are not the owner");
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    // functions:
    // 1. fund()
    // 2. withdraw()


    function fund() public payable  {
        require(msg.value.convertToUsd() >= MINIMUM_USD, "You need to spend more ETH!");
        addressToAmount[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    function withdraw() public onlyOwner {
        for (uint256 i = 0 ; i < funders.length ; i++){
            address funderAddress = funders[i];
            addressToAmount[funderAddress] = 0;
        }

        funders = new address[](0);
        // transfer
        // payable(msg.sender).transfer(address(this).balance);
        // // send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");
        // call
        (bool callSuccess, /*bytes memory data*/) = payable(msg.sender).call{value: address(this).balance}(""); 
        require(callSuccess, "Call failed");
    }

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }

}