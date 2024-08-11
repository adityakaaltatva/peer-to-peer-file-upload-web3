const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const Upload = await hre.ethers.getContractFactory("Upload");

  const upload = await Upload.deploy();

  await upload.deployTransaction.wait();

  console.log("Upload contract deployed to:", upload.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


//0x5fbdb2315678afecb367f032d93f642f64180aa3
