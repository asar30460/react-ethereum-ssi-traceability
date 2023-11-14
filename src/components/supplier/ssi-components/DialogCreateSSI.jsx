import { useState } from "react";
import { BaseContract, ethers } from "ethers";

import { Button, TextField, Grid, Typography } from "@mui/material";
// Mui Dialog Component
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Material Icon
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

const ripemd160 = (str) => {
  const timeNow = new Date().getTime();
  const strTimeNow = timeNow.toString();

  let hexStr = "0x";

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    const hexValue = charCode.toString(16);

    hexStr += hexValue.padStart(2, "0");
  }

  // Strings are assumed to be DataHexString, otherwise it will
  // throw. To hash UTF-8 data, see the note above.
  const hash = ethers.ripemd160(new Uint8Array([strTimeNow, hexStr]));
  return hash;
};

const DialogCreateSSI = ({
  openDialogCreateSSI,
  setOpenDialogCreateSSI,
  ethersSigner,
}) => {
  const [newOwner, setNewOwner] = useState();

  const changeOwner = async () => {
    const abi = ["function changeOwner(address identity, address newOwner)"];
    const contractAddress = process.env.REACT_APP_DID_REGISTRY;
    const contract = new BaseContract(contractAddress, abi, ethersSigner);
    // console.log(newOwner);
    // Send the transaction
    try {
      const tx = await contract.changeOwner(ethersSigner["address"], newOwner);
      await tx.wait();
      console.log(tx);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={openDialogCreateSSI}
      onClose={() => {
        setOpenDialogCreateSSI(false);
      }}
    >
      <DialogTitle sx={{ mb: -2.5 }}>變更身分擁有者</DialogTitle>

      <DialogContent>
        <Typography fontWeight={"bold"} variant="subtitle2">
          Change decentralized identifier (DID)
        </Typography>
        <DialogContentText sx={{ mt: 1, mb: 3 }}>
          請輸入新擁有者的EOA地址
        </DialogContentText>
        <Grid container spacing={1} justifyContent="flex-start">
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="eoa-address"
              label="EOA address"
              onChange={(e) => {
                setNewOwner(e.target.value);
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled
              required
              id="identity"
              label="Identifier"
              defaultValue={ethersSigner["address"]}
              variant="standard"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => {
            setOpenDialogCreateSSI(false);
          }}
          sx={{
            backgroundColor: "transparent",
            color: "#2196F3",
            borderColor: "#2196F3",
            "&:hover": {
              backgroundColor: "#2196F3",
              color: "#FFF",
              borderColor: "#2196F3",
            },
          }}
        >
          取消
        </Button>
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          onClick={() => {
            setOpenDialogCreateSSI(false);
            changeOwner(ethersSigner);
          }}
          sx={{
            backgroundColor: "transparent",
            color: "#F44336",
            borderColor: "#F44336",
            "&:hover": {
              backgroundColor: "#F44336",
              color: "#FFF",
              borderColor: "#F44336",
            },
          }}
        >
          交易
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCreateSSI;
