import { useState } from "react";

import { Box, Button, ButtonBase, Stack, TextField } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CodeIcon from "@mui/icons-material/Code";
import SettingsIcon from "@mui/icons-material/Settings";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { CopyBlock, dracula } from "react-code-blocks";

import { ethers, Contract } from "ethers";
import { RegistryContractParams } from "../";
import { FunctionCard } from "./dev-components";

const deployRegistryContract = async (abi, bytecode, signer) => {
  const ethereumDIDRegistryFactory = new ethers.ContractFactory(
    abi,
    bytecode,
    signer
  );
  try {
    const ethereumDIDRegistryContract =
      await ethereumDIDRegistryFactory.deploy();
    const result = await ethereumDIDRegistryContract.deploymentTransaction();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const identityOwnerQuery = async (provider, identity) => {
  // The contract ABI (fragments we care about)
  const abi = ["function identityOwner(address identity)"];

  // Connected to a Signer; can make state changing transactions,
  // which will cost the account ether
  const contractAddress = process.env.REACT_APP_DID_REGISTRY;
  try {
    const contract = new Contract(contractAddress, abi, provider);
    const result = await contract.identityOwner(identity);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const changeOwner = async (signer, identity, newOwner) => {
  const abi = ["function changeOwner(address identity, address newOwner)"];
  const contractAddress = process.env.REACT_APP_DID_REGISTRY;
  const contract = new Contract(contractAddress, abi, signer);
  try {
    const tx = await contract.changeOwner(identity, newOwner);
    // Currently the transaction has been sent to the mempool,
    // but has not yet been included.
    // So, we wait for the transaction to be included.
    await tx.wait();
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
};

const sendTransaction = async (provider) => {
  try {
    const tx = await provider.sendTransaction({
      to: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      value: ethers.parseEther("1.0"),
    });

    // Often you may wish to wait until the transaction is mined
    const receipt = await tx.wait();
    console.log(receipt);
  } catch (e) {
    console.log(e);
  }
};

const keccak256 = async (str) => {
  const timeNow = new Date().getTime();
  const strTimeNow = timeNow.toString();

  let hexStrTimeNow = "0x";
  let hexStr = "0x";

  for (let i = 0; i < strTimeNow.length; i++) {
    const charCode = strTimeNow.charCodeAt(i);
    const hexValue = charCode.toString(16);

    // Padding char to align format(e.g. 4->04(hex)).
    hexStrTimeNow += hexValue.padStart(2, "0");
  }

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    const hexValue = charCode.toString(16);

    hexStr += hexValue.padStart(2, "0");
  }

  // Strings are assumed to be DataHexString, otherwise it will
  // throw. To hash UTF-8 data, see the note above.
  const hash = ethers.keccak256(new Uint8Array([strTimeNow, hexStr]));
  console.log(hash);
};

const Dev = ({ ethersSigner, ethersProvider }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [identityOwner, setIdentityOwner] = useState("");
  const [changeOwnerIdentity, setChangeOwnerIdentity] = useState("");
  const [changeOwnerNewOwner, setChangeOwnerNewOwner] = useState("");

  return (
    <>
      <div style={{ width: "100%", zIndex: 3 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            border: "1px solid #4e3534",
            height: { xs: "90vh", md: "90vh" },
            width: { xs: "90%", md: "96%" },
          }}
        >
          <Stack direction="row" flexWrap="wrap" spacing={2}>
            <FunctionCard
              isDIDFunction
              cardHeader={"部署「DID Registry」合約"}
              cardContent={
                <>
                  <ButtonBase
                    onClick={() => {
                      setDialogTitle("Contract Ethereum DID Registry");
                      setDialogContent(
                        <DialogContent
                          style={{ fontFamily: "Roboto", fontSize: "12px" }}
                        >
                          <CopyBlock
                            text={RegistryContractParams["contractCode"]}
                            language={"javascript"}
                            showLineNumbers={true}
                            theme={dracula}
                            wrapLines={true}
                            codeBlock
                          />
                        </DialogContent>
                      );
                      setOpen(true);
                    }}
                    sx={{
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#2AA6BF",
                      },
                    }}
                  >
                    <ArticleIcon sx={{ pr: 1 }} />
                    檢視智慧合約
                  </ButtonBase>
                  <ButtonBase
                    onClick={() => {
                      setDialogTitle("bytecode");
                      setDialogContent(
                        <DialogContent
                          style={{ fontFamily: "Roboto", fontSize: "12px" }}
                        >
                          <CopyBlock
                            text={RegistryContractParams["bytecode"]}
                            language={"javascript"}
                            showLineNumbers={true}
                            theme={dracula}
                            wrapLines={true}
                            codeBlock
                          />
                        </DialogContent>
                      );
                      setOpen(true);
                    }}
                    sx={{
                      borderRadius: 1,
                      "&:hover": {
                        color: "#2AA6BF",
                      },
                    }}
                  >
                    <CodeIcon sx={{ pr: 1 }} />
                    檢視bytecode
                  </ButtonBase>
                  <ButtonBase
                    onClick={() => {
                      setDialogTitle(
                        "應用程式二進制介面(Application binary interface，Abi)"
                      );
                      setDialogContent(
                        <DialogContent
                          style={{ fontFamily: "Roboto", fontSize: "12px" }}
                        >
                          <CopyBlock
                            text={RegistryContractParams["abiPseudo"]}
                            language={"javascript"}
                            showLineNumbers={true}
                            theme={dracula}
                            wrapLines={true}
                            codeBlock
                          />
                        </DialogContent>
                      );
                      setOpen(true);
                    }}
                    sx={{
                      borderRadius: 1,
                      "&:hover": {
                        color: "#2AA6BF",
                      },
                    }}
                  >
                    <SettingsIcon sx={{ pr: 1 }} />
                    檢視abi
                  </ButtonBase>
                </>
              }
              onClick={async () => {
                setLoading(true);
                await deployRegistryContract(
                  RegistryContractParams["abi"],
                  RegistryContractParams["bytecode"],
                  ethersSigner
                );
                setLoading(false);
              }}
              loading={loading}
            />
            <FunctionCard
              cardHeader={"轉帳"}
              onClick={async () => {
                setLoading(true);
                await sendTransaction(ethersSigner);
                setLoading(false);
              }}
              loading={loading}
            />
            <FunctionCard
              isDIDFunction
              readOnly
              cardHeader={"查詢身分EOA address"}
              cardContent={
                <TextField
                  variant="standard"
                  color="warning"
                  onChange={(e) => {
                    setIdentityOwner(e.target.value);
                  }}
                  label="identity(address)"
                  sx={{
                    label: {
                      color: "#E0E0E0",
                      fontSize: "12px",
                      fontFamily: "Noto Serif TC",
                    },
                    input: {
                      color: "#E0E0E0",
                      borderBottom: "1px solid white",
                      fontSize: "12px",
                      fontFamily: "Noto Serif TC",
                    },
                  }}
                />
              }
              onClick={async () => {
                setLoading(true);
                identityOwnerQuery(ethersProvider, identityOwner);
                setLoading(false);
              }}
              loading={loading}
            />
            <FunctionCard
              isDIDFunction
              cardHeader={"變更所有權"}
              cardContent={
                <>
                  <TextField
                    variant="standard"
                    color="warning"
                    onChange={(e) => {
                      setChangeOwnerIdentity(e.target.value);
                    }}
                    label="identity(address)"
                    sx={{
                      label: {
                        color: "#E0E0E0",
                        fontSize: "12px",
                        fontFamily: "Noto Serif TC",
                      },
                      input: {
                        color: "#E0E0E0",
                        borderBottom: "1px solid white",
                        fontSize: "12px",
                        fontFamily: "Noto Serif TC",
                      },
                    }}
                  />
                  <TextField
                    variant="standard"
                    color="warning"
                    onChange={(e) => {
                      setChangeOwnerNewOwner(e.target.value);
                    }}
                    label="new owner(address)"
                    sx={{
                      label: {
                        color: "#E0E0E0",
                        fontSize: "12px",
                        fontFamily: "Noto Serif TC",
                      },
                      input: {
                        color: "#E0E0E0",
                        borderBottom: "1px solid white",
                        fontSize: "12px",
                        fontFamily: "Noto Serif TC",
                      },
                    }}
                  />
                </>
              }
              onClick={async () => {
                setLoading(true);
                await changeOwner(
                  ethersSigner,
                  changeOwnerIdentity,
                  changeOwnerNewOwner
                );
                setLoading(false);
              }}
              loading={loading}
            />
            <FunctionCard
              cardHeader={"keccak256雜湊函數"}
              onClick={async () => {
                setLoading(true);
                await keccak256("testjas;ldfjkl;aker");
                setLoading(false);
              }}
              loading={loading}
            />
          </Stack>
        </Box>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent}
        <DialogActions>
          <Button onClick={() => setOpen(false)}>關閉</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dev;
