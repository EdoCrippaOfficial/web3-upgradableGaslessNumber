const { ethers } = require('hardhat');
const { signMetaTxRequest } = require('./signer');
const { readFileSync, writeFileSync } = require('fs');

async function main() {
  const forwarder = await ethers.getContractAt(
    "Forwarder",
    "0xaBf6e4bAAd731687FC1A78Ea363316B457dDd1c3"
  );
  const numberProxy = await ethers.getContractAt(
    "NumberV2",
    "0x180e0496e6ca844D65829260cdaEDaA874D40b6D"
  );

  const { PRIVATE_KEY: signer } = process.env;
  const number = 256
  const from = new ethers.Wallet(signer).address;
  console.log(`Signing registering of ${number} as ${from}...`);
  const data = numberProxy.interface.encodeFunctionData('store', [number]);
  const result = await signMetaTxRequest(signer, forwarder, {
    to: numberProxy.address, from, data
  });

  result.forwarderAddress = "0x04e73DFbB70b46FEfe035457EDaE39815B43Cd57"
  result.type= "forward"

  writeFileSync('tmp/request.json', JSON.stringify(result, null, 2));
  console.log(`Signature: `, result.signature);
  console.log(`Request: `, result.request);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}
