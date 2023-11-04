import { useSDK } from "@metamask/sdk-react";

import React, { useState, useEffect } from "react";

import { ethers, Contract } from "ethers";
import { contractInfo } from "../../contracts";

import { Box, Divider, Grid, Stack, Typography } from "@mui/material";

const readOnlyMethods = async () => {
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");

  // The contract ABI (fragments we care about)
  const abi = ["function balanceOf(address account) view returns (uint)"];

  // Create a contract; connected to a Provider, so it may
  // only access read-only methods (like view and pure)
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const contract = new Contract(contractAddress, abi, provider);

  // Read the token balance for an account
  const ownerAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
  const balance = await contract.balanceOf(ownerAddress);
  console.log("Balance:", balance, "MHT");
};

const deployContract = async (Abi, bytecode, signer) => {
  const ethereumDIDRegistryFactory = new ethers.ContractFactory(
    Abi,
    bytecode,
    signer
  );
  const ethereumDIDRegistryContract = await ethereumDIDRegistryFactory.deploy();
  const result = await ethereumDIDRegistryContract.deploymentTransaction();
  console.log(result);
};

const changeOwner = async (signer) => {
  // The contract ABI (fragments we care about)
  const abi = ["function changeOwner(address identity, address newOwner)"];

  // Connected to a Signer; can make state changing transactions,
  // which will cost the account ether
  const contractAddress = "0xb7f8bc63bbcad18155201308c8f3540b07f84f5e";
  const contract = new Contract(contractAddress, abi, signer);

  // Send the transaction
  const identity = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const newOwner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const tx = await contract.changeOwner(identity, newOwner);
  // Currently the transaction has been sent to the mempool,
  // but has not yet been included.
  // So, we wait for the transaction to be included.
  await tx.wait();
};

const sendTransaction = async (provider) => {
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

    // setResponse(txHash);
  } catch (e) {
    console.log(e);
  }
};

const sign = async (provider) => {
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
    // setResponse(resp);
  } catch (e) {
    console.log(e);
  }
};

function createData(title, value) {
  return { title, value };
}

const Feed = () => {
  const { connected, connecting, chainId } = useSDK();
  const [response, setResponse] = useState("");
  const [ethersSigner, setEthersSigner] = useState("尚未連線");
  const [ethersInfo, setethersInfo] = useState([]);
  const getAccount = async () => {
    let provider;
    let signer;

    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    }
    setEthersSigner(signer);

    setethersInfo([
      createData("RPC 伺服器", "Localhost:8545"),
      createData(
        "連線帳戶",
        `${signer["address"].slice(1, 6)}...${signer["address"].slice(-5, -1)}`
      ),
      createData("Chain ID", parseInt(chainId, 16)),
    ]);
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <div style={{ width: "100%", zIndex: 3 }}>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: "#223540",
          height: { xs: "90vh", md: "90vh" },
          width: { xs: "90%", md: "96%" },
        }}
      >
        <Grid container spacing={1} justifyContent="center">
          {ethersInfo.map((item) => (
            <Grid item xs={12} md={3.9}>
              <Box
                sx={{
                  py: 1,
                  px: 2,
                  backgroundColor: "#1b2a32",
                  color: "#E0E0E0",
                  // border: "1px solid #697586",
                  borderRadius: "5px",
                }}
              >
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  alignItems="flex-end"
                  spacing={0.5}
                >
                  <Typography fontWeight={"bold"} variant="subtitle2">
                    {item.title}:
                  </Typography>
                  <Typography>{item.value}</Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Divider variant="middle" sx={{ backgroundColor: "#E0E0E0", my: 2 }} />
        <Box>
          <div className="App">
            <div className="sdkConfig">
              {connecting && (
                <div>Waiting for Metamask to link the connection...</div>
              )}
            </div>

            <div>
              <button
                style={{ padding: 10, margin: 10 }}
                onClick={() =>
                  deployContract(
                    contractInfo.ethereumDIDRegistryAbi,
                    contractInfo.ethereumDIDRegistryBytecode,
                    ethersSigner
                  )
                }
              >
                depoly contract
              </button>
              <button
                style={{ padding: 10, margin: 10 }}
                onClick={() => changeOwner(ethersSigner)}
              >
                change owner
              </button>

              <button
                style={{ padding: 10, margin: 10 }}
                onClick={() => sendTransaction(ethersSigner)}
              >
                Send transaction
              </button>

              <button
                style={{ padding: 10, margin: 10 }}
                onClick={() => sign(ethersSigner)}
              >
                Sign
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
