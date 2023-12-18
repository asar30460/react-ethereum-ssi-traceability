import { useState } from "react";

import { Button, ButtonBase, Stack, TextField } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CodeIcon from "@mui/icons-material/Code";
import SettingsIcon from "@mui/icons-material/Settings";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { CopyBlock, dracula } from "react-code-blocks";

import { Contract, solidityPackedKeccak256 } from "ethers";
import { RegistryContractParams } from "../";
import { FunctionCard } from "./dev-components";
import { ThemeProvider, createTheme } from "@mui/material";

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
  const abi = [
    "function identityOwner(address identity) view returns (address)",
  ];

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

const packedKeccak256 = async (keccak256Text) => {
  //veriKey:
  // ->0x62fbd41491e6e01d7f87c4ac77f4282ddac409adca4abf8e0c3a02839defcd1b
  //SigAuth:
  // ->0xcf933cb5a8eeb8a0765842723db654ad40b7f4db756e789518fbb2dc59f2f79e
  try {
    const hash = solidityPackedKeccak256(
      ["string", "uint"],
      [keccak256Text, 777]
    );
    console.log(hash);
  } catch (error) {
    console.log(error);
  }
};

const addDelegate = async (
  signer,
  identity,
  delegateType,
  delegate,
  validity
) => {
  console.log(identity);
  console.log(delegateType);
  console.log(delegate);
  console.log(validity);
  const abi = [
    "function addDelegate(address identity, bytes32 delegateType, address delegate, uint validity)",
  ];
  const contractAddress = process.env.REACT_APP_DID_REGISTRY;
  const contract = new Contract(contractAddress, abi, signer);
  try {
    const tx = await contract.addDelegate(
      identity,
      delegateType,
      delegate,
      validity
    );
    // Currently the transaction has been sent to the mempool,
    // but has not yet been included.
    // So, we wait for the transaction to be included.
    await tx.wait();
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
};

const Dev = ({ ethersSigner, ethersProvider }) => {
  const theme = createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Noto Serif TC",
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "standard",
          color: "warning",
        },
        styleOverrides: {
          root: {
            label: {
              color: "#E0E0E0",
              fontSize: "13px",
              fontFamily: "Noto Serif TC",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          underline: {
            "&&:hover::before": {
              borderColor: "#ff9800",
            },
          },
          input: {
            color: "#E0E0E0",
            borderBottom: "1px solid #E0E0E0",
            fontSize: "12px",
            fontFamily: "Noto Serif TC",
          },
        },
      },
    },
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [identityOwner, setIdentityOwner] = useState("");
  const [changeOwnerIdentity, setChangeOwnerIdentity] = useState("");
  const [changeOwnerNewOwner, setChangeOwnerNewOwner] = useState("");
  const [addDelegateIdentity, setAddDelegateIdentity] = useState("");
  const [addDelegateDelegateType, setAddDelegateDelegateType] = useState("");
  const [addDelegateDelegate, setAddDelegateDelegate] = useState("");
  const [addDelegateValidity, setAddDelegateValidity] = useState("");
  const [keccak256Text, setkeccak256Text] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" flexWrap="wrap" gap={2} alignItems="flex-start">
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
          isDIDFunction
          readOnly
          cardHeader={"查詢身分EOA address"}
          cardContent={
            <TextField
              onChange={(e) => {
                setIdentityOwner(e.target.value);
              }}
              label="identity(address)"
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
                onChange={(e) => {
                  setChangeOwnerIdentity(e.target.value);
                }}
                label="identity(address)"
              />
              <TextField
                onChange={(e) => {
                  setChangeOwnerNewOwner(e.target.value);
                }}
                label="newOwner(address)"
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
          cardContent={
            <TextField
              onChange={(e) => {
                setkeccak256Text(e.target.value);
              }}
              label="text(string)"
            />
          }
          onClick={async () => {
            setLoading(true);
            await packedKeccak256(keccak256Text);
            setLoading(false);
          }}
          loading={loading}
        />
        <FunctionCard
          isDIDFunction
          cardHeader={"委任控制權"}
          cardContent={
            <>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                flexWrap="wrap"
                justifyContent="start"
              >
                <TextField
                  onChange={(e) => {
                    setAddDelegateIdentity(e.target.value);
                  }}
                  label="identity(address)"
                  defaultValue="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
                />
                <TextField
                  onChange={(e) => {
                    setAddDelegateDelegateType(e.target.value);
                  }}
                  label="delegateType(bytes32)"
                  defaultValue="0x314aba0071cdf863dd1f6a6a233529173e0e26e5e294f1c4bb24575c8d38e8aa"
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 0, sm: 2 }}
                flexWrap="wrap"
                justifyContent="start"
              >
                <TextField
                  onChange={(e) => {
                    setAddDelegateDelegate(e.target.value);
                  }}
                  label="delegate(address)"
                  defaultValue="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
                />
                <TextField
                  onChange={(e) => {
                    setAddDelegateValidity(e.target.value);
                  }}
                  label="validity(uint)"
                />
              </Stack>
            </>
          }
          onClick={async () => {
            setLoading(true);
            await addDelegate(
              ethersSigner,
              addDelegateIdentity,
              addDelegateDelegateType,
              addDelegateDelegate,
              addDelegateValidity
            );
            setLoading(false);
          }}
          loading={loading}
        />
      </Stack>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent}
        <DialogActions>
          <Button onClick={() => setOpen(false)}>關閉</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Dev;
