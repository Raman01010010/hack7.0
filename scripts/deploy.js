const { ethers } = require("hardhat");

async function main() {
  // Get the ContractFactory for AccidentRegistry
  const AccidentRegistry = await ethers.getContractFactory("Complaint");

  // Deploy the AccidentRegistry contract
  const accidentRegistry = await AccidentRegistry.deploy();
  await accidentRegistry.deployed();

  console.log("complain contract deployed to:", accidentRegistry.address);
}

// Execute the main function
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});



////////////////////////////
// const hre = require("hardhat");

// async function main() {
//   // Get the ContractFactory for Ram (assuming Ram is the voting contract)
//   const Ram = await hre.ethers.getContractFactory("ram");
  
//   const candidates = ['Candidate1', 'Candidate2', 'Candidate3'].map(name => ethers.utils.formatBytes32String(name));

//   // Deploy the Ram contract with the candidate list
//   const ram = await Ram.deploy(candidates);
//   await ram.deployed();
  
//   // Get the ContractFactory for Chai
//   const Chai = await hre.ethers.getContractFactory("chai");
  
//   // Deploy the Chai contract
//   // const chai = await Chai.deploy();
//   // await chai.deployed();
  
//    console.log("Deployed Ram contract address:", ram.address);
//   // console.log("Deployed Chai contract address:", chai.address);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
