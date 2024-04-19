
pragma solidity >=0.7.0 <0.9.0;

contract AccidentRegistry {
    struct Accident {
        uint256 timestamp;
        string location;
        string description;
        address reportedBy;
        int256 latitude; // New field for latitude
        int256 longitude; // New field for longitude
    }

    mapping(uint256 => Accident) public accidents;
    uint256 public totalAccidents;

    event AccidentReported(uint256 indexed accidentId, uint256 timestamp, string location, string description, address reportedBy, int256 latitude, int256 longitude);

    // Function to report a new accident
    function reportAccident(string memory _location, string memory _description, int256 _latitude, int256 _longitude) external {
        uint256 accidentId = totalAccidents++;
        accidents[accidentId] = Accident(block.timestamp, _location, _description, msg.sender, _latitude, _longitude);
        emit AccidentReported(accidentId, block.timestamp, _location, _description, msg.sender, _latitude, _longitude);
    }

    // Function to retrieve accident details
    function getAccident(uint256 _accidentId) external view returns (uint256 timestamp, string memory location, string memory description, address reportedBy, int256 latitude, int256 longitude) {
        Accident storage accident = accidents[_accidentId];
        return (accident.timestamp, accident.location, accident.description, accident.reportedBy, accident.latitude, accident.longitude);
    }

    // Function to get the total number of accidents stored
    function getTotalAccidents() external view returns (uint256) {
        return totalAccidents;
    }

    // Function to get array of all accident reports
    function getAllAccidents() external view returns (Accident[] memory) {
        Accident[] memory allAccidents = new Accident[](totalAccidents);
        for (uint256 i = 0; i < totalAccidents; i++) {
            allAccidents[i] = accidents[i];
        }
        return allAccidents;
    }
}
