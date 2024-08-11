// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Upload {
    struct Access {
        address user;
        bool access;
    }

    mapping(address => string[]) private value;
    mapping(address => mapping(address => bool)) private ownership;
    mapping(address => Access[]) private accessList;
    mapping(address => mapping(address => uint256)) private userIndex;

    event FileAdded(address indexed user, string url);
    event AccessGranted(address indexed owner, address indexed user);
    event AccessRevoked(address indexed owner, address indexed user);

    function addFile(string calldata url) external {
        value[msg.sender].push(url);
        emit FileAdded(msg.sender, url);
    }

    function grantAccess(address user) external {
        require(user != msg.sender, "Cannot grant access to yourself");
        if (!ownership[msg.sender][user]) {
            ownership[msg.sender][user] = true;
            userIndex[msg.sender][user] = accessList[msg.sender].length;
            accessList[msg.sender].push(Access(user, true));
        } else {
            uint256 index = userIndex[msg.sender][user];
            accessList[msg.sender][index].access = true;
        }
        emit AccessGranted(msg.sender, user);
    }

    function revokeAccess(address user) external {
        require(ownership[msg.sender][user], "Access not granted");
        uint256 index = userIndex[msg.sender][user];
        accessList[msg.sender][index].access = false;
        ownership[msg.sender][user] = false;
        emit AccessRevoked(msg.sender, user);
    }

    function viewFiles(address user) external view returns (string[] memory) {
        require(user == msg.sender || ownership[user][msg.sender], "Access denied");
        return value[user];
    }

    function viewAccessList() external view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
