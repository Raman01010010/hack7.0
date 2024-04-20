pragma solidity >=0.7.0 <0.9.0;

contract Complaint {
    enum ViolationType { Speeding, RunningRedLight, IllegalParking, RecklessDriving }
    
    struct Violation {
        address complainant;
        string name;
        string vehicleNumber;
        uint timestamp;
        string location;
        string date;
        string registeredBy;
        string contactNumber;
        string licenseNumber;
        ViolationType violationType;
        bool resolved;
        string details; 
    }
    
    mapping(uint => Violation) public violations;
    uint public violationCount;
    
    event ViolationReported(uint indexed id, address complainant, string name, string vehicleNumber, uint timestamp, string location, string date, string registeredBy, string contactNumber, string licenseNumber, ViolationType violationType, string details);
    event ViolationResolved(uint indexed id);
    
    constructor() {
        violationCount = 0;
    }
    
    function reportViolation(string memory _name, string memory _vehicleNumber, string memory _location, string memory _date, string memory _registeredBy, string memory _contactNumber, string memory _licenseNumber, uint8 _violationType, string memory _details) public {
        require(_violationType < 4, "Invalid violation type");
        
        violationCount++;
        violations[violationCount] = Violation(msg.sender, _name, _vehicleNumber, block.timestamp, _location, _date, _registeredBy, _contactNumber, _licenseNumber, ViolationType(_violationType), false, _details);
        emit ViolationReported(violationCount, msg.sender, _name, _vehicleNumber, block.timestamp, _location, _date, _registeredBy, _contactNumber, _licenseNumber, ViolationType(_violationType), _details);
    }
    
    function resolveViolation(uint _id) public {
        require(_id <= violationCount, "Violation ID does not exist");
        require(violations[_id].complainant == msg.sender, "Only the complainant can resolve the violation");
        require(!violations[_id].resolved, "Violation is already resolved");
        
        violations[_id].resolved = true;
        emit ViolationResolved(_id);
    }
    
    function getAllViolationIds() public view returns (uint[] memory) {
        uint[] memory ids = new uint[](violationCount);
        for (uint i = 1; i <= violationCount; i++) {
            ids[i - 1] = i;
        }
        return ids;
    }
    
    function getViolationDetails(uint _id) public view returns (address, string memory, string memory, string memory, uint, string memory, string memory, string memory, string memory, ViolationType, bool, string memory) {
        require(_id <= violationCount, "Violation ID does not exist");
        Violation memory violation = violations[_id];
        return (violation.complainant, violation.name, violation.vehicleNumber, violation.location, violation.timestamp, violation.date, violation.registeredBy, violation.contactNumber, violation.licenseNumber, violation.violationType, violation.resolved, violation.details);
    }
    
    function getAllComplaints() public view returns (Violation[] memory) {
        Violation[] memory allComplaints = new Violation[](violationCount);
        for (uint i = 1; i <= violationCount; i++) {
            allComplaints[i - 1] = violations[i];
        }
        return allComplaints;
    }
}
