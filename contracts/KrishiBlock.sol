//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Land {
    address contractOwner;

    constructor(){
        contractOwner = msg.sender;
    }

    struct Landreg {
        uint id;
        uint area;
        string landAddress;
        uint landPrice;
        string allLatitudeLongitude;
        uint propertyPID;
        string physicalSurveyNumber;
        string document;
        bool isforSell;
        address ownerAddress;
        bool isLandVerified;
    }

    struct User{
        address id;
        string name;
        uint age;
        string city;
        string aadharNumber;
        string panNumber;
        string document;
        string email;
        bool isUserVerified;
    }

    struct LandInspector {
        uint id;
        address _addr;
        string name;
        uint age;
        string designation;
        string city;
    }
}
    uint inspectorsCount;
    uint public userCount;
    uint public landsCount;

    mapping(address => LandInspector) public InspectorMapping;
    mapping(uint => address[]) allLandInspectorList;
    mapping(address => bool)  RegisteredInspectorMapping;
    mapping(address => User) public UserMapping;
    mapping(uint => address)  AllUsers;
    mapping(uint => address[])  allUsersList;
    mapping(address => bool)  RegisteredUserMapping;
    mapping(address => uint[])  MyLands;
    mapping(uint => Landreg) public lands;
    mapping(uint => uint[])  allLandList;


    function isContractOwner(address _addr) public view returns(bool){
        if(_addr==contractOwner)
            return true;
        else
            return false;
    }

    function changeContractOwner(address _addr)public {
        require(msg.sender==contractOwner,"you are not contractOwner");

        contractOwner=_addr;
    }