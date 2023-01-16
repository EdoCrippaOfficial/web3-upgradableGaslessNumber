import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import "../styles/globals.css"
import variables from "../resources/variables.json"

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;
const relayerForwarderAddress = variables.CONTRACT_FORWARDER_ADDRESS
const relayerUrl = "https://api.defender.openzeppelin.com/autotasks/c17984aa-cf64-4c8d-b9c1-977cd0561493/runs/webhook/598f0539-a18f-427a-85cf-86ac6c4e6c89/TZdMNsNgePyUff6z8Phpj7"

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      desiredChainId={activeChainId}
      sdkOptions={{
        gasless: {
          openzeppelin: {
            relayerForwarderAddress,
            relayerUrl
          },
        },
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp
