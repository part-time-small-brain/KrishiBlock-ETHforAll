// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.17;

contract Land {
    address SDM;

    constructor(){
        SDM = msg.sender;
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

    struct Lekhpal {
        uint id;
        address _addr;
        string name;
        uint age;
        string designation;
        string city;
    }

    uint lekhpalCount;
    uint public userCount;
    uint public landsCount;

    mapping(address => Lekhpal) public lekhpalMapping;
    mapping(uint => address[]) lekhpalList;
    mapping(address => bool)  registeredLekhpalMapping;
    mapping(address => User) public UserMapping;
    mapping(uint => address)  AllUsers;
    mapping(uint => address[])  allUsersList;
    mapping(address => bool)  RegisteredUserMapping;
    mapping(address => uint[])  MyLands;
    mapping(uint => Landreg) public lands;
    mapping(uint => uint[])  allLandList;


    function isSDM(address _addr) public view returns(bool){
        if(_addr==SDM)
            return true;
        else
            return false;
    }

    function changeSDM(address _addr)public {
        require(msg.sender==SDM,"you are not SDM");

        SDM=_addr;
    }

    //-----------------------------------------------Lekhpal-----------------------------------------------

    function addLekhpal(address _addr,string memory _name, uint _age, string memory _designation,string memory _city) public returns(bool){
        if(SDM!=msg.sender)
            return false;
        require(SDM==msg.sender);
        registeredLekhpalMapping[_addr]=true;
        lekhpalList[1].push(_addr);
        lekhpalMapping[_addr] = Lekhpal(lekhpalCount,_addr,_name, _age, _designation,_city);
        return true;
    }

    function removeLekhpal(address _addr) public{
        require(msg.sender==SDM,"You are not SDM");
        require(registeredLekhpalMapping[_addr],"Land Inspector not found");
        registeredLekhpalMapping[_addr]=false;
        uint len=lekhpalList[1].length;
        for(uint i=0;i<len;i++)
        {
            if(lekhpalList[1][i]==_addr)
            {
                lekhpalList[1][i]=lekhpalList[1][len-1];
                lekhpalList[1].pop();
                break;
            }
        }
    }

    function isLekhpal(address _id) public view returns (bool) {
        if(registeredLekhpalMapping[_id]){
            return true;
        }else{
            return false;
        }
    }



    //-----------------------------------------------User-----------------------------------------------

    function isUserRegistered(address _addr) public view returns(bool)
    {
        if(RegisteredUserMapping[_addr]){
            return true;
        }else{
            return false;
        }
    }

    function registerUser(string memory _name, uint _age, string memory _city,string memory _aadharNumber, string memory _panNumber, string memory _document, string memory _email
    ) public {

        require(!RegisteredUserMapping[msg.sender]);

        RegisteredUserMapping[msg.sender] = true;
        userCount++;
        allUsersList[1].push(msg.sender);
        AllUsers[userCount]=msg.sender;
        UserMapping[msg.sender] = User(msg.sender, _name, _age, _city,_aadharNumber,_panNumber, _document,_email,false);
    }

    function verifyUser(address _userId) public{
        require(isLekhpal(msg.sender));
        UserMapping[_userId].isUserVerified=true;
    }

    function isUserVerified(address id) public view returns(bool){
        return UserMapping[id].isUserVerified;
    }



    //-----------------------------------------------Land-----------------------------------------------
    function addLand(uint _area, string memory _address, uint landPrice,string memory _allLatiLongi, uint _propertyPID,string memory _surveyNum, string memory _document) public {
        require(isUserVerified(msg.sender));
        landsCount++;
        lands[landsCount] = Landreg(landsCount, _area, _address, landPrice,_allLatiLongi,_propertyPID, _surveyNum , _document,false,payable(msg.sender),false);
        MyLands[msg.sender].push(landsCount);
        allLandList[1].push(landsCount);
    }

    function verifyLand(uint _id) public{
        require(isLekhpal(msg.sender));
        lands[_id].isLandVerified=true;
    }
    
    function isLandVerified(uint id) public view returns(bool){
        return lands[id].isLandVerified;
    }


    function transferOwnership(address _from, address _to, uint _id) public returns(bool){
        require(isLekhpal(msg.sender),"you should be land inspector to call this function");
        require(isUserVerified(_from));
        require(isUserVerified(_to));
        require(isLandVerified(_id));
        require(lands[_id].ownerAddress == _from);

        lands[_id].ownerAddress = _to;
        return true;
    }
}

//TO DO
//consensus implementation - tehsildar(2), witness, bank, vakil, lekhpal(landsinspector), buyer, seller, sdm(contract owner)(1)
//store history of land records
//etherscan
//time to complete a trx