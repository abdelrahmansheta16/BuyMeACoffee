// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

// deployed at 0x500Ab3F6fC1C277601976cA7Fde197A2Bff42c23

contract BuyMeACoffee {
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    Memo[] memos;

    address payable owner;

    constructor() {
        // Set the deployer as the contract's owner by default
        owner = payable(msg.sender);
    }

    function buyCoffee(
        string memory _name,
        string memory _message
    ) public payable {
        require(msg.value > 0, "Can't buy coffee with zero ETH");
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
        memos.push(
            Memo({
                from: msg.sender,
                timestamp: block.timestamp,
                name: _name,
                message: _message
            })
        );
    }

    function withdrawTips(address to) public {
        require(msg.sender == owner, "Only owner can withdraw");
        if (!payable(to).send(address(this).balance)) revert();
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
