import {
  ConnectWallet,
  useAddress,
  Web3Button,
} from "@thirdweb-dev/react";
import {useRef, useState} from "react";
import styles from "../styles/Home.module.css";
import variables from "../resources/variables.json"

import numberV2 from "../resources/NumberV2.json"
import {BigNumber} from "ethers";

export default function Home() {
  const contractAddress = variables.CONTRACT_PROXY_ADDRESS
  const address = useAddress()
  const numberInput = useRef(null);
  const [currentNumber, setCurrentNumber] = useState(undefined)

  const getCurrentNumber = async (contract) => {
    const number = await contract.call("retrieve")
    setCurrentNumber(BigNumber.from(number).toNumber())
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        {address &&
          <>
            <div className={styles.card} style={{maxWidth: "100%", display: "flex", flexDirection: "column"}}>
              <input required={true} placeholder="Set the number" ref={numberInput}></input>
              <Web3Button
                contractAddress={contractAddress}
                contractAbi={numberV2.abi}
                action={(contract) => contract.call("store", numberInput.current.value)}
              >
                STORE NEW NUMBER
              </Web3Button>
            </div>

            <div className={styles.card} style={{maxWidth: "100%", display: "flex", flexDirection: "column"}}>
              <Web3Button
                contractAddress={contractAddress}
                contractAbi={numberV2.abi}
                action={getCurrentNumber}
              >
                GET CURRENT NUMBER
              </Web3Button>
              <h2 className={styles.description}>The number is: {currentNumber}</h2>
            </div>

            <div className={styles.card} style={{maxWidth: "100%", display: "flex", flexDirection: "column"}}>
              <h2>WARNING: only for version 2!</h2>

              <Web3Button
                contractAddress={contractAddress}
                contractAbi={numberV2.abi}
                action={(contract) => contract.call("increment")}
              >
                INCREMENT
              </Web3Button>
            </div>
          </>
        }


      </main>
    </div>
  );
}
