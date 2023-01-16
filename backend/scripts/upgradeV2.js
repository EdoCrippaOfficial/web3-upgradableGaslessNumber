const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");

const proxyAddress = '0x180e0496e6ca844D65829260cdaEDaA874D40b6D'
const forwarderAddress = "0xaBf6e4bAAd731687FC1A78Ea363316B457dDd1c3"

async function main() {
  console.log(proxyAddress," original Number(proxy) address")
  const NumberV2 = await ethers.getContractFactory("NumberV2")
  console.log("upgrade to NumberV2...")
  const numberV2 = await upgrades.upgradeProxy(
    proxyAddress,
    NumberV2,
    { constructorArgs: [forwarderAddress] }
  );

  await numberV2.deployed();

  console.log(numberV2.address," NumberV2 address(should be the same)")

  console.log(await upgrades.erc1967.getImplementationAddress(numberV2.address)," getImplementationAddress")
  console.log(await upgrades.erc1967.getAdminAddress(numberV2.address), " getAdminAddress")
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
