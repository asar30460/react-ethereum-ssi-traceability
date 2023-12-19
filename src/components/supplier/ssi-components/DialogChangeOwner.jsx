import { useState } from "react";
import { BaseContract } from "ethers";

import { ThemeProvider, createTheme } from "@mui/material";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
// Mui Dialog Component
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

// Material Icon
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

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
  },
});

const DialogChangeOwner = ({ ethersSigner, open, setOpen, docDID }) => {
  const [newOwner, setNewOwner] = useState();

  const changeOwner = async () => {
    const abi = ["function changeOwner(address identity, address newOwner)"];
    const contractAddress = process.env.REACT_APP_DID_REGISTRY;
    const contract = new BaseContract(contractAddress, abi, ethersSigner);
    // console.log(newOwner);
    // Send the transaction
    try {
      const tx = await contract.changeOwner(docDID, newOwner);
      await tx.wait();
      console.log(tx);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        PaperProps={{
          sx: {
            minWidth: { xs: "300px", sm: "480px" },
            backgroundColor: "#1b2a32",
            color: "#E0E0E0",
          },
        }}
      >
        <DialogContent>
          <Typography variant="subtitle1">變更身分擁有者</Typography>
          <Typography noWrap variant="body2" color="#AAAAAA" sx={{ mb: 2 }}>
            did:ethr:{docDID}
          </Typography>

          <TextField
            fullWidth
            required
            id="changeowner-did"
            label="轉讓對象（DID）"
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
              setNewOwner(e.target.value);
            }}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => {
              setOpen(false);
            }}
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
            onClick={() => {
              setOpen(false);
              changeOwner(ethersSigner);
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
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default DialogChangeOwner;
