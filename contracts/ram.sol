pragma solidity >=0.7.0 <0.9.0;
// SPDX-License-Identifier: MIT



contract ram{
    
    mapping(address => bool) public hasVoted;
    mapping(bytes32 => uint256) public votesReceived;

    bytes32[] public candidateList;

    event VoteCast(address indexed voter, bytes32 indexed candidate);

    constructor(bytes32[] memory _candidateList) {
        candidateList = _candidateList;
    }

    function vote(bytes32 _candidate) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(isValidCandidate(_candidate), "Invalid candidate.");

        votesReceived[_candidate]++;
        hasVoted[msg.sender] = true;

        emit VoteCast(msg.sender, _candidate);
    }

    function isValidCandidate(bytes32 _candidate) public view returns (bool) {
        for (uint256 i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == _candidate) {
                return true;
            }
        }
        return false;
    }

    function 
    getCandidates() public view returns (bytes32[] memory) {
        return candidateList;
    }
  function getCandidatesWithVoteCount() public view returns (bytes32[] memory, uint256[] memory) {
        uint256 length = candidateList.length;
        bytes32[] memory candidates = new bytes32[](length);
        uint256[] memory voteCounts = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            candidates[i] = candidateList[i];
            voteCounts[i] = votesReceived[candidateList[i]];
        }

        return (candidates, voteCounts);
    }
}

