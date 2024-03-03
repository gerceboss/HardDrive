//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;

contract Upload {
    struct Access {
        bool access;
        address user;
    }

    modifier nullAddress() {
        require(msg.sender != address(0), "scammer");
        _;
    }
    modifier onlyOwner(string memory _file) {
        require(owner[_file] == msg.sender, "You are not the owner");
        _;
    }
    // in reality filename or file string is a url it wont be same, mostly
    mapping(string => Access[]) userGivenAccessTo; //user has given access to that  file

    mapping(string => address) owner; // a particular file  uploaded by user

    mapping(string => mapping(address => bool)) fileAccess;

    mapping(address => string[]) filesOfUser; //the ones which are uploaded by a particular user

    function uploadFile(string memory _file) public nullAddress {
        filesOfUser[msg.sender].push(_file);
        owner[_file] = msg.sender;
    }

    function getMyFiles() public view nullAddress returns (string[] memory) {
        return filesOfUser[msg.sender];
    }

    function giveAccessTo(
        address _addr,
        string memory _file
    ) public nullAddress onlyOwner(_file) returns (string memory) {
        int index = -1;
        for (uint i = 0; i < userGivenAccessTo[_file].length; i++) {
            if (userGivenAccessTo[_file][i].user == _addr) {
                index = int(i);
            }
        }

        string memory s = "Access Given";
        if (index != -1) {
            uint val = uint(index);
            if (userGivenAccessTo[_file][val].access) {
                //already given
                s = "Already Given";
                return s;
            } else {
                //give access
                userGivenAccessTo[_file][val].access = true;
                fileAccess[_file][_addr] = true;
                return s;
            }
        }
        Access memory a = Access({access: true, user: _addr});
        userGivenAccessTo[_file].push(a);
        fileAccess[_file][_addr] = true;
        return s;
    }

    function blockAccessOf(
        address _addr,
        string memory _file
    ) public nullAddress returns (string memory) {
        int index = -1;
        for (uint i = 0; i < userGivenAccessTo[_file].length; i++) {
            if (userGivenAccessTo[_file][i].user == _addr) {
                index = int(i);
            }
        }
        string memory s = "Doesnot exist";
        if (index == -1) {
            return s;
        }
        uint val = uint(index);
        if (userGivenAccessTo[_file][val].access == true) {
            s = "Blocked";
            userGivenAccessTo[_file][val].access = false;
            fileAccess[_file][_addr] = false;
            return s;
        } else {
            s = "Already Blocked";
            return s;
        }
    }

    function displayFile(
        address _addr,
        string memory _file
    ) public view returns (bool) {
        return fileAccess[_file][_addr] || owner[_file] == _addr;
    }
}
