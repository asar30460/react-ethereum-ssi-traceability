import { useSDK } from "@metamask/sdk-react";
import React, { useState } from "react";

import { Box } from "@mui/material";

const Feed = () => {
  const [response, setResponse] = useState("");
  const { connected, connecting, provider, chainId } = useSDK();

  const addEthereumChain = () => {
    if (!provider) {
      throw new Error(`invalid ethereum provider`);
    }

    provider
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            chainName: "Polygon",
            blockExplorerUrls: ["https://polygonscan.com"],
            nativeCurrency: { symbol: "MATIC", decimals: 18 },
            rpcUrls: ["https://polygon-rpc.com/"],
          },
        ],
      })
      .then((res) => console.log("add", res))
      .catch((e) => console.log("ADD ERR", e));
  };

  const sendTransaction = async () => {
    const to = "0x0000000000000000000000000000000000000000";
    const transactionParameters = {
      to, // Required except during contract publications.
      from: provider?.selectedAddress, // must match user's active address.
      value: "0x5AF3107A4000", // Only required to send ether to the recipient from the initiating external account.
    };

    try {
      // txHash is a hex string
      // As with any RPC call, it may throw an error
      const txHash = await provider?.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      setResponse(txHash);
    } catch (e) {
      console.log(e);
    }
  };

  const sign = async () => {
    const msgParams = JSON.stringify({
      domain: {
        // Defining the chain aka Rinkeby testnet or Ethereum Main Net
        chainId: parseInt(provider?.chainId ?? "", 16),
        // Give a user friendly name to the specific contract you are signing for.
        name: "Ether Mail",
        // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
        // Just let's you know the latest version. Definitely make sure the field name is correct.
        version: "1",
      },

      // Defining the message signing data content.
      message: {
        /*
         - Anything you want. Just a JSON Blob that encodes the data you want to send
         - No required fields
         - This is DApp Specific
         - Be as explicit as possible when building out the message schema.
        */
        contents: "Hello, Bob!",
        attachedMoneyInEth: 4.2,
        from: {
          name: "Cow",
          wallets: [
            "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
          ],
        },
        to: [
          {
            name: "Bob",
            wallets: [
              "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
              "0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57",
              "0xB0B0b0b0b0b0B000000000000000000000000000",
            ],
          },
        ],
      },
      // Refers to the keys of the *types* object below.
      primaryType: "Mail",
      types: {
        // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        // Not an EIP712Domain definition
        Group: [
          { name: "name", type: "string" },
          { name: "members", type: "Person[]" },
        ],
        // Refer to PrimaryType
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person[]" },
          { name: "contents", type: "string" },
        ],
        // Not an EIP712Domain definition
        Person: [
          { name: "name", type: "string" },
          { name: "wallets", type: "address[]" },
        ],
      },
    });

    let from = provider?.selectedAddress;

    console.debug(`sign from: ${from}`);
    try {
      if (!from || from === null) {
        alert(
          `Invalid account -- please connect using eth_requestAccounts first`
        );
        return;
      }

      const params = [from, msgParams];
      const method = "eth_signTypedData_v4";
      console.debug(`ethRequest ${method}`, JSON.stringify(params, null, 4));
      console.debug(`sign params`, params);
      const resp = await provider?.request({ method, params });
      setResponse(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const changeNetwork = async (hexChainId) => {
    console.debug(`switching to network chainId=${hexChainId}`);
    try {
      const response = await provider?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChainId }], // chainId must be in hexadecimal numbers
      });
      console.debug(`response`, response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ width: "100%", zIndex: 3 }}>
      <Box
        sx={{
          p: 1,
          borderRadius: 2,
          backgroundColor: "#223540",
          height: { xs: "91vh", md: "90vh" },
          width: { xs: "90%", md: "96%" },
        }}
      >
        <Box>
          <div className="App">
            <div className="sdkConfig">
              {connecting && (
                <div>Waiting for Metamask to link the connection...</div>
              )}
            </div>

            <div>
              <button style={{ padding: 10, margin: 10 }} onClick={sign}>
                Sign
              </button>

              <button
                style={{ padding: 10, margin: 10 }}
                onClick={sendTransaction}
              >
                Send transaction
              </button>

              <button
                style={{ padding: 10, margin: 10 }}
                onClick={() => changeNetwork("0x1")}
              >
                Switch Ethereum
              </button>

              <button
                style={{ padding: 10, margin: 10 }}
                onClick={() => changeNetwork("0x89")}
              >
                Switch Polygon
              </button>

              <button
                style={{ padding: 10, margin: 10 }}
                onClick={addEthereumChain}
              >
                Add ethereum chain
              </button>
            </div>

            {connected && (
              <div>
                <>
                  {chainId && `Connected chain: ${chainId}`}
                  <p></p>
                  {response && `Last request response: ${response}`}
                </>
              </div>
            )}
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Feed;
