import { useState, useEffect } from 'react';
import abi from "./contractJson/complain.json";
import { ethers } from "ethers";
import './App.css';

function Ram() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState('Not connected');
  const [name, setName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [date, setDate] = useState('');
  const [registeredBy, setRegisteredBy] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [violationLocation, setViolationLocation] = useState('');
  const [violationDescription, setViolationDescription] = useState('');
  const [violations, setViolations] = useState([]);

  useEffect(() => {
    const initializeContract = async () => {
      const contractAddress = "0x0572337d3C31653D71323B5A18FF177188408B41";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        const accounts = await ethereum.request({
          method: "eth_requestAccounts"
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        setAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setState({ provider, signer, contract });
      } catch (error) {
        console.error(error);
      }
    };

    initializeContract();
  }, []);

  const reportViolation = async () => {
    try {
      await state.contract.reportViolation(
        name,
        vehicleNumber,
        violationLocation,
        date,
        registeredBy,
        contactNumber,
        licenseNumber,
        0, // Example violation type; you can change it accordingly
        violationDescription
      );
      console.log("Violation reported successfully.");
    } catch (error) {
      console.error('Error reporting violation', error);
    }
  };

  const fetchViolations = async () => {
    try {
      const totalViolations = await state.contract.getAllViolationIds();
      const violationsData = await Promise.all(totalViolations.map(async (id) => {
        const violationDetails = await state.contract.getViolationDetails(id);
        return {
          id,
          complainant: violationDetails[0],
          name: violationDetails[1],
          vehicleNumber: violationDetails[2],
          timestamp: violationDetails[4], // Assuming timestamp is stored at index 4
          location: violationDetails[5],
          date: violationDetails[6],
          registeredBy: violationDetails[7],
          contactNumber: violationDetails[8],
          licenseNumber: violationDetails[9],
          description: violationDetails[10],
          resolved: violationDetails[11]
        };
      }));
      console.log("All violations:", violationsData);
      setViolations(violationsData);
    } catch (error) {
      console.error('Error fetching violations', error);
    }
  };

  return (
    <div className="App">
      <h1>Report Violation</h1>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Vehicle Number:
        <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Date:
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br />
      <label>
        Registered By:
        <input type="text" value={registeredBy} onChange={(e) => setRegisteredBy(e.target.value)} />
      </label>
      <br />
      <label>
        Contact Number:
        <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
      </label>
      <br />
      <label>
        License Number:
        <input type="text" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" value={violationLocation} onChange={(e) => setViolationLocation(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <input type="text" value={violationDescription} onChange={(e) => setViolationDescription(e.target.value)} />
      </label>
      <br />
      <button onClick={reportViolation}>Report Violation</button>

      <hr />

      <h1>All Violations</h1>
      <button onClick={fetchViolations}>Fetch Violations</button>
      <ul>
        {violations.map((violation) => (
          <li>
            Complainant: {violation.complainant}<br />
            Name: {violation.name}<br />
            Vehicle Number: {violation.vehicleNumber}<br />
           
            Location: {violation.location}<br />
            Date: {violation.date}<br />
            Registered By: {violation.registeredBy}<br />
            Contact Number: {violation.contactNumber}<br />
            License Number: {violation.licenseNumber}<br />
            Description: {violation.description}<br />
            Resolved: {violation.resolved ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ram;

////////////////
// import { useState, useEffect } from 'react';
// import abi from "./contractJson/complain.json";
// import { ethers } from "ethers";
// import './App.css';

// function App() {
//   const [state, setState] = useState({
//     provider: null,
//     signer: null,
//     contract: null
//   });
//   const [account, setAccount] = useState('Not connected');
//   const [name, setName] = useState('');
//   const [vehicleNumber, setVehicleNumber] = useState('');
//   const [date, setDate] = useState('');
//   const [registeredBy, setRegisteredBy] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [licenseNumber, setLicenseNumber] = useState('');
//   const [violationLocation, setViolationLocation] = useState('');
//   const [violationDescription, setViolationDescription] = useState('');
//   const [violations, setViolations] = useState([]);

//   useEffect(() => {
//     const initializeContract = async () => {
//       const contractAddress = "0xb3987e23908b32F45FC145Ac10dA4784fEDF3B8C";
//       const contractABI = abi.abi;

//       try {
//         const { ethereum } = window;
//         const accounts = await ethereum.request({
//           method: "eth_requestAccounts"
//         });

//         window.ethereum.on("accountsChanged", () => {
//           window.location.reload();
//         });

//         setAccount(accounts[0]);
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();

//         const contract = new ethers.Contract(
//           contractAddress,
//           contractABI,
//           signer
//         );

//         setState({ provider, signer, contract });
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     initializeContract();
//   }, []);

//   const reportViolation = async () => {
//     try {
//       await state.contract.reportViolation(
//         name,
//         vehicleNumber,
//         date,
//         registeredBy,
//         contactNumber,
//         licenseNumber,
//         violationLocation,
//         violationDescription
//       );
//       console.log("Violation reported successfully.");
//     } catch (error) {
//       console.error('Error reporting violation', error);
//     }
//   };

//   const fetchViolations = async () => {
//     try {
//       const totalViolations = await state.contract.getAllViolationIds();
//       const violationsData = await Promise.all(totalViolations.map(async (id) => {
//         const violationDetails = await state.contract.getViolationDetails(id);
//         return {
//           id,
//           complainant: violationDetails[0],
//           name: violationDetails[1],
//           vehicleNumber: violationDetails[2],
//          // timestamp: new Date(violationDetails[3].toNumber() * 1000).toString(),
//           location: violationDetails[4],
//           date: violationDetails[5],
//           registeredBy: violationDetails[6],
//           contactNumber: violationDetails[7],
//           licenseNumber: violationDetails[8],
//           description: violationDetails[9],
//           resolved: violationDetails[10]
//         };
//       }));
//       console.log("All violations:", violationsData);
//       console.log(violationsData)
//       setViolations(violationsData);
//     } catch (error) {
//       console.error('Error fetching violations', error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Report Violation</h1>
//       <label>
//         Name:
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Vehicle Number:
//         <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Date:
//         <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Registered By:
//         <input type="text" value={registeredBy} onChange={(e) => setRegisteredBy(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Contact Number:
//         <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         License Number:
//         <input type="text" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Location:
//         <input type="text" value={violationLocation} onChange={(e) => setViolationLocation(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Description:
//         <input type="text" value={violationDescription} onChange={(e) => setViolationDescription(e.target.value)} />
//       </label>
//       <br />
//       <button onClick={reportViolation}>Report Violation</button>

//       <hr />

//       <h1>All Violations</h1>
//       <button onClick={fetchViolations}>Fetch Violations</button>
//       <ul>
//         {violations.map((violation, index) => (
//           <li key={index}>
           
//             Complainant: {violation.complainant}<br />
//             Name: {violation.name}<br />
//             Vehicle Number: {violation.vehicleNumber}<br />
//             Timestamp: {violation.timestamp}<br />
//             {/* Location: {violation.location}<br /> */}
//             Date: {violation.date}<br />
//             Registered By: {violation.registeredBy}<br />
//             Contact Number: {violation.contactNumber}<br />
//             License Number: {violation.licenseNumber}<br />
//             Description: {violation.description}<br />
//             Resolved: {violation.resolved ? 'Yes' : 'No'}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;



////////////////
// import { useState, useEffect } from 'react';
// import abi from "./contractJson/ram1.json";
// import { ethers } from "ethers";
// import './App.css';

// function App() {
//   const [state, setState] = useState({
//     provider: null,
//     signer: null,
//     contract: null
//   });
//   const [account, setAccount] = useState('Not connected');
//   const [candidateList, setCandidateList] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState('');
//   const [hasVoted, setHasVoted] = useState(false);

//   const [location, setLocation] = useState('');
//   const [description, setDescription] = useState('');
//   const [latitude, setLatitude] = useState(0);
//   const [longitude, setLongitude] = useState(0);
//   useEffect(() => {
//     const template = async () => {
//       const contractAddress = "0x5DEb8302299E0E957E0379B608D937b2593601F0";
//       const contractABI = abi.abi;

//       try {
//         const { ethereum } = window;
//         const account = await ethereum.request({
//           method: "eth_requestAccounts"
//         });

//         window.ethereum.on("accountsChanged", () => {
//           window.location.reload();
//         });

//         setAccount(account);
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();

//         const contract = new ethers.Contract(
//           contractAddress,
//           contractABI,
//           signer
//         );
// console.log(contract)
//         // const candidatesBytes32 = await contract.getCandidates();
//         // const candidates = candidatesBytes32.map(bytes32ToString);
//         // setCandidateList(candidates);

//         setState({ provider, signer, contract });
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     template();
//   }, []);

//   const bytes32ToString = (bytes32) => {
//     return ethers.utils.parseBytes32String(bytes32).replace(/\0/g, '');
//   };

//   const handleVote = async () => {
//     try {
//       await state.contract.vote(ethers.utils.formatBytes32String(selectedCandidate));
//       setHasVoted(true);
//     } catch (error) {
//       console.error('Error voting', error);
//     }
//   };


//   const addAccident = async () => {
//     try {
//       await state.contract.reportAccident(location, description, latitude, longitude);
//       console.log("Accident reported successfully.");
//     } catch (error) {
//       console.error('Error reporting accident', error);
//     }
//   };
//   const fetchAndLogAccidents = async (contract) => {
//     try {
//       const totalAccidents = await state.contract.getAllAccidents();
      
//       console.log("All accidents:", totalAccidents);
//       //setAccidents(allAccidents);
//     } catch (error) {
//       console.error('Error fetching accidents', error);
//     }
//   };

//   return (
//     <div className="App">
//       <button onClick={fetchAndLogAccidents}>Get All</button>
//     <h1>Report Accident</h1>
//     <label>
//       Location:
//       <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
//     </label>
//     <br />
//     <label>
//       Description:
//       <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
//     </label>
//     <br />
//     <label>
//       Latitude:
//       <input type="number" value={latitude} onChange={(e) => setLatitude(parseFloat(e.target.value))} />
//     </label>
//     <br />
//     <label>
//       Longitude:
//       <input type="number" value={longitude} onChange={(e) => setLongitude(parseFloat(e.target.value))} />
//     </label>
//     <br />
//     <button onClick={addAccident}>Report Accident</button>
//   </div>
//   );
// }

// export default App;




/////////////////////////

// import { useState, useEffect } from 'react';
// import abi from "./contractJson/ram1.json";
// import { ethers } from "ethers";
// import './App.css';

// function App() {
//   const [state, setState] = useState({
//     provider: null,
//     signer: null,
//     contract: null
//   });
//   const [account, setAccount] = useState('Not connected');
//   const [candidateList, setCandidateList] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState('');
//   const [hasVoted, setHasVoted] = useState(false);

//   const [location, setLocation] = useState('');
//   const [description, setDescription] = useState('');
//   const [latitude, setLatitude] = useState(0);
//   const [longitude, setLongitude] = useState(0);
//   useEffect(() => {
//     const template = async () => {
//       const contractAddress = "0x5DEb8302299E0E957E0379B608D937b2593601F0";
//       const contractABI = abi.abi;

//       try {
//         const { ethereum } = window;
//         const account = await ethereum.request({
//           method: "eth_requestAccounts"
//         });

//         window.ethereum.on("accountsChanged", () => {
//           window.location.reload();
//         });

//         setAccount(account);
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();

//         const contract = new ethers.Contract(
//           contractAddress,
//           contractABI,
//           signer
//         );
// console.log(contract)
//         // const candidatesBytes32 = await contract.getCandidates();
//         // const candidates = candidatesBytes32.map(bytes32ToString);
//         // setCandidateList(candidates);

//         setState({ provider, signer, contract });
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     template();
//   }, []);

//   const bytes32ToString = (bytes32) => {
//     return ethers.utils.parseBytes32String(bytes32).replace(/\0/g, '');
//   };

//   const handleVote = async () => {
//     try {
//       await state.contract.vote(ethers.utils.formatBytes32String(selectedCandidate));
//       setHasVoted(true);
//     } catch (error) {
//       console.error('Error voting', error);
//     }
//   };


//   const addAccident = async () => {
//     try {
//       await state.contract.reportAccident(location, description, latitude, longitude);
//       console.log("Accident reported successfully.");
//     } catch (error) {
//       console.error('Error reporting accident', error);
//     }
//   };
//   const fetchAndLogAccidents = async (contract) => {
//     try {
//       const totalAccidents = await state.contract.getAllAccidents();
      
//       console.log("All accidents:", totalAccidents);
//       //setAccidents(allAccidents);
//     } catch (error) {
//       console.error('Error fetching accidents', error);
//     }
//   };

//   return (
//     <div className="App">
//       <button onClick={fetchAndLogAccidents}>Get All</button>
//     <h1>Report Accident</h1>
//     <label>
//       Location:
//       <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
//     </label>
//     <br />
//     <label>
//       Description:
//       <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
//     </label>
//     <br />
//     <label>
//       Latitude:
//       <input type="number" value={latitude} onChange={(e) => setLatitude(parseFloat(e.target.value))} />
//     </label>
//     <br />
//     <label>
//       Longitude:
//       <input type="number" value={longitude} onChange={(e) => setLongitude(parseFloat(e.target.value))} />
//     </label>
//     <br />
//     <button onClick={addAccident}>Report Accident</button>
//   </div>
//   );
// }

// export default App;

//////////////////


// import { useState, useEffect } from 'react';
// import abi from "./contractJson/ram.json";
// import { ethers } from "ethers";
// import './App.css';

// function App() {
//   const [state, setState] = useState({
//     provider: null,
//     signer: null,
//     contract: null
//   });
//   const [account, setAccount] = useState('Not connected');
//   const [candidateList, setCandidateList] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState('');
//   const [hasVoted, setHasVoted] = useState(false);

//   useEffect(() => {
//     const template = async () => {
//       const contractAddress = "0xf919Ce0192ECCA6183F2AfD4bdEbE0E7b072B182";
//       const contractABI = abi.abi;

//       try {
//         const { ethereum } = window;
//         const account = await ethereum.request({
//           method: "eth_requestAccounts"
//         });

//         window.ethereum.on("accountsChanged", () => {
//           window.location.reload();
//         });

//         setAccount(account);
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();

//         const contract = new ethers.Contract(
//           contractAddress,
//           contractABI,
//           signer
//         );

//         const candidatesBytes32 = await contract.getCandidates();
//         const candidates = candidatesBytes32.map(bytes32ToString);
//         setCandidateList(candidates);

//         setState({ provider, signer, contract });
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     template();
//   }, []);

//   const bytes32ToString = (bytes32) => {
//     return ethers.utils.parseBytes32String(bytes32).replace(/\0/g, '');
//   };

//   const handleVote = async () => {
//     try {
//       await state.contract.vote(ethers.utils.formatBytes32String(selectedCandidate));
//       setHasVoted(true);
//     } catch (error) {
//       console.error('Error voting', error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Voting App</h1>
//       <p>{account ? `Connected Account: ${account}` : 'Not connected'}</p>
//       <p>Select Candidate:</p>
//       <select value={selectedCandidate} onChange={(e) => setSelectedCandidate(e.target.value)}>
//         <option value="">Select...</option>
//         {candidateList.map((candidate, index) => (
//           <option key={index} value={candidate}>{candidate}</option>
//         ))}
//       </select>
//       <button onClick={handleVote} disabled={!state.provider || !account || hasVoted || !selectedCandidate}>Vote</button>
//       {hasVoted && <p>You have already voted.</p>}
//     </div>
//   );
// }

// export default App;

///////////////////////////////

// import { useState, useEffect } from 'react';
// import abi from "./contractJson/ram.json";
// import { ethers } from "ethers";
// import './App.css';

// function App() {
//   const [state, setState] = useState({
//     provider: null,
//     signer: null,
//     contract: null
//   });
//   const [account, setAccount] = useState('Not connected');
//   const [candidateList, setCandidateList] = useState([]);

//   useEffect(() => {
//     const template = async () => {
//       const contractAddress = "0xf919Ce0192ECCA6183F2AfD4bdEbE0E7b072B182";
//       const contractABI = abi.abi;

//       try {
//         const { ethereum } = window;
//         const accounts = await ethereum.request({
//           method: "eth_requestAccounts"
//         });

//         window.ethereum.on("accountsChanged", () => {
//           window.location.reload();
//         });

//         setAccount(accounts[0]);
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();

//         const contract = new ethers.Contract(
//           contractAddress,
//           contractABI,
//           signer
//         );
// console.log(contract)
//         const [candidates, voteCounts] = await contract.getCandidatesWithVoteCount();
//         const formattedCandidates = candidates.map((candidate, index) => ({
//           name: ethers.utils.parseBytes32String(candidate),
//           votes: voteCounts[index]
//         }));
//         setCandidateList(formattedCandidates);

//         setState({ provider, signer, contract });
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     template();
//   }, []);

//   return (
//     <div className="App">
//       <h1>Voting App</h1>
//       <p>{account ? `Connected Account: ${account}` : 'Not connected'}</p>
//       <h2>Candidates and Vote Counts:</h2>
//       <ul>
//         {candidateList.map((candidate, index) => (
//           <li key={index}>{candidate.name} - Votes: {candidate.votes}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
