
pragma solidity >=0.7.0 <0.9.0;

contract complain1 {
    enum ViolationType { Speeding, RunningRedLight, IllegalParking, RecklessDriving }
    
    struct Violation {
        address complainant;
        uint timestamp;
        string location;
        ViolationType violationType;
        bool resolved;
    }
    
    mapping(uint => Violation) public violations;
    uint public violationCount;
    
    event ViolationReported(uint indexed id, address complainant, uint timestamp, string location, ViolationType violationType);
    event ViolationResolved(uint indexed id);
    
    constructor() {
        violationCount = 0;
    }
    
    function reportViolation(string memory _location, uint8 _violationType) public {
        require(_violationType < 4, "Invalid violation type");
        
        violationCount++;
        violations[violationCount] = Violation(msg.sender, block.timestamp, _location, ViolationType(_violationType), false);
        emit ViolationReported(violationCount, msg.sender, block.timestamp, _location, ViolationType(_violationType));
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
    
    function getViolationDetails(uint _id) public view returns (address, uint, string memory, ViolationType, bool) {
        require(_id <= violationCount, "Violation ID does not exist");
        Violation memory violation = violations[_id];
        return (violation.complainant, violation.timestamp, violation.location, violation.violationType, violation.resolved);
    }
}
