// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const Forwarder = await hre.ethers.getContractFactory("Forwarder")
  const forwarderContract = await Forwarder.deploy();
  await forwarderContract.deployed();
  console.log("forwarderContract deployed to:", forwarderContract.address);

  const Number = await hre.ethers.getContractFactory("Number");
  const numberContractProxy = await hre.upgrades.deployProxy(
    Number,
    [42],
    { constructorArgs: [forwarderContract.address] }
  );
  await numberContractProxy.deployed();
  console.log(numberContractProxy.address," number(proxy) address")
  console.log(await hre.upgrades.erc1967.getImplementationAddress(numberContractProxy.address)," getImplementationAddress")
  console.log(await hre.upgrades.erc1967.getAdminAddress(numberContractProxy.address)," getAdminAddress")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
