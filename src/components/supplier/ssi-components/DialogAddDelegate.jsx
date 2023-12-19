import { useState } from "react";
import { BaseContract, solidityPackedKeccak256 } from "ethers";
import { queryDIDDelegateChangedEvents } from "./documentResolver";

import { ThemeProvider, createTheme } from "@mui/material";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

// Mui Dialog Component
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

const addDelegate = async (
  signer,
  identity,
  delegateType,
  delegate,
  validity
) => {
  const byteDelegateType = solidityPackedKeccak256(
    ["string", "uint"],
    [delegateType, 777]
  );
  console.log({
    identity: identity,
    delegateType: byteDelegateType,
    delegate: delegate,
    validity: Number(validity),
  });

  // Check whether the "delegate" have been delegating to the "identity"
  // and validation is not expired.
  // If true, Not allow to add delegate
  let result = await queryDIDDelegateChangedEvents(signer, identity);
  for (let i = 0; i < result.length; i++) {
    if (result[i].delegate > Date.now()) {
      alert(
        "無法執行此操作：此DID委任至" +
          result[i].delegate +
          "尚未到期。\n到期時間為：" +
          result[i].validTo
      );
      return;
    }
  }

  const abi = [
    "function addDelegate(address identity, bytes32 delegateType, address delegate, uint validity)",
  ];
  const contractAddress = process.env.REACT_APP_DID_REGISTRY;
  const contract = new BaseContract(contractAddress, abi, signer);
  try {
    const tx = await contract.addDelegate(
      identity,
      byteDelegateType,
      delegate,
      Number(validity)
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

const DialogAddDelegate = ({ open, setOpen, ethersSigner, docDID }) => {
  const [loading, setLoading] = useState(false);
  const [delegateType, setDelegateType] = useState("");
  const [delegate, setDelegate] = useState("");
  const [validity, setValidity] = useState();

  const customizeFontStyle = {
    styleOverrides: {
      root: {
        fontFamily: "Noto Serif TC",
        fontSize: "14px",
      },
    },
  };
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
            minWidth: "256px",
            label: {
              color: "#E0E0E0",
              fontSize: "14px",
              fontFamily: "Noto Serif TC",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          underline: {
            "&&:before": {
              borderColor: "#ff9800",
            },
            "&&:hover::before": {
              borderColor: "#ff9800",
            },
          },
          input: {
            color: "#E0E0E0",
            fontSize: "14px",
            fontFamily: "Noto Serif TC",
          },
        },
      },
      MuiInputLabel: customizeFontStyle,
      MuiMenuItem: customizeFontStyle,
      MuiSelect: customizeFontStyle,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#1b2a32",
            color: "#E0E0E0",
          },
        }}
      >
        <DialogContent>
          <Typography variant="subtitle1">新增委任權限</Typography>
          <Typography noWrap variant="body2" color="#AAAAAA" sx={{ mb: 1 }}>
            did:ethr:{docDID}
          </Typography>
          <FormControl
            sx={{
              my: 2,
              minWidth: 80,
              borderRadius: "3px",
            }}
          >
            <InputLabel
              id="delegate-type-select-label"
              sx={{
                backgroundColor: "#1b2a32",
                color: "#E0E0E0",
                "&.Mui-focused": {
                  color: "#ED6C02",
                },
              }}
            >
              類別
            </InputLabel>
            <Select
              required
              labelId="delegate-type-select-label"
              id="delegate-type-select"
              value={delegateType}
              // disabled={}
              onChange={(e) => {
                setDelegateType(e.target.value);
              }}
              sx={{
                width: { xs: "256px", sm: "380px" },
                color: "#E0E0E0",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#848280",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FF9800",
                  borderRadius: "3px",
                  borderWidth: "0.1rem",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ED6C02",
                },
                ".MuiSelect-icon": {
                  color: "#E0E0E0",
                },
              }}
            >
              <MenuItem value={"veriKey"}>
                veriKey(EcdsaSecp256k1RecoveryMethod2020)
              </MenuItem>
              <MenuItem value={"sigAuth"}>
                sigAuth(Secp256k1SignatureAuthentication2020)
              </MenuItem>
            </Select>
          </FormControl>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                id="delegate-did"
                label="委任對象（DID）"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="body2" color={"#E0E0E0"}>
                        did:ethr:
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setDelegate(e.target.value);
                }}
                sx={{ width: { sm: "350px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="delegate-valid"
                label="委任時長（秒）"
                onChange={(e) => {
                  setValidity(e.target.value);
                }}
                sx={{ minWidth: { sm: "150px" } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            disabled={loading}
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: "transparent",
              color: "#1E88E5",
              borderColor: "#1E88E5",
              "&:hover": {
                backgroundColor: "#1E88E5",
                color: "#FFF",
                borderColor: "#1E88E5",
              },
            }}
          >
            取消
          </Button>
          <Button
            variant="outlined"
            endIcon={<SendIcon />}
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await addDelegate(
                ethersSigner,
                docDID,
                delegateType,
                delegate,
                validity
              );
              setOpen(false);
              setLoading(false);
            }}
            sx={{
              backgroundColor: "transparent",
              color: "#FF4719",
              borderColor: "#D84315",
              "&:hover": {
                backgroundColor: "#D84315",
                color: "#FFF",
                borderColor: "#D84315",
              },
            }}
          >
            交易
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: "#FFF",
                position: "fixed",
                mb: 2,
                mr: 6,
              }}
            />
          )}
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default DialogAddDelegate;
