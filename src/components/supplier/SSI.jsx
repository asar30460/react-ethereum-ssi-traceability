import React, { useState, useEffect } from "react";
import { Contract } from "ethers";
import {
  DialogCreateSSI,
  queryDIDOwnerChangedEvents,
  documentResolver,
} from "./ssi-components";

// Materials
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditIcon from "@mui/icons-material/Edit";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

// Mui Table Component
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

const SSI = ({ ethersSigner }) => {
  const [openDialogCreateSSI, setOpenDialogCreateSSI] = useState(false);
  const [identity, setIdentity] = useState(false);

  useEffect(() => {
    async function identityOwner() {
      const abi = [
        "function identityOwner(address identity) view returns(address)",
      ];
      const contractAddress = process.env.REACT_APP_DID_REGISTRY;
      const contract = new Contract(contractAddress, abi, ethersSigner);
      const result = await contract.identityOwner(ethersSigner["address"]);
      setIdentity(result);
    }
    async function getDocument() {
      const response = await documentResolver(ethersSigner);
      console.log(response);
    }
    identityOwner();
    getDocument();
  }, []);

  const [mode, setMode] = useState("default");
  const [optionlist, setoptionlist] = useState([
    { did: ethersSigner["address"] },
  ]);
  useEffect(() => {
    switch (mode) {
      case "default":
        let list = [];
        async function isOwnerChange() {
          const result = {
            did: `你已將身分轉移給:${await queryDIDOwnerChangedEvents(
              ethersSigner
            )}`,
          };
          list.push(result);
          setoptionlist(list);
        }
        isOwnerChange();
        break;
      default:
        break;
    }
  }, [mode]);

  const SSIDocSource = [
    { text: "預設SSI", mode: "default" },
    { text: "來自其它EOA轉讓的SSI", mode: "others" },
    { text: "受委任SSI", mode: "delegate" },
  ];

  return (
    <Stack gap={1}>
      <Stack direction="row" alignItems="center">
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "#1B2A32",
            border: "2px solid #E0E0E0",
          }}
        >
          1
        </Avatar>
        <Typography variant="subtitle1">&nbsp;選擇SSI Document來源</Typography>
      </Stack>

      <Grid container sx={{ ml: 5 }}>
        {SSIDocSource.map((source) => (
          <Button
            size="large"
            onClick={() => setMode(source.mode)}
            sx={{
              backgroundColor: source.mode === mode ? "#223540" : "#1B2A32",
              color: source.mode === mode ? "#E0E0E0" : "grey",
              borderRadius: "0px",
              border: source.mode === mode ? "1px solid #1976d2" : "",
              "&:hover": {
                backgroundColor: "#1B2A32",
                color: "#E0E0E0",
              },
            }}
          >
            {source.text}
          </Button>
        ))}
      </Grid>
      <Stack direction="row" alignItems="center">
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "#1B2A32",
            border: "2px solid #E0E0E0",
          }}
        >
          2
        </Avatar>
        <Typography variant="subtitle1">&nbsp;選擇SSI</Typography>
      </Stack>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">選擇</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value=""
          label="Age"
          onChange={""}
        >
          {optionlist.map((opt) => (
            <MenuItem value={opt.did}>{opt.did}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <Autocomplete
        disablePortal
        popupIcon={<ArrowDropDownIcon color="info" />}
        id="combo-box-demo"
        options={optionlist}
        sx={{
          ml: 5,
          ".MuiAutocomplete-inputRoot": {
            backgroundColor: "#1B2A32",
            "&:hover": { border: "1px solid #1976d2" },
          },
        }}
        renderInput={(params) => (
          <TextField
            disabled
            {...params}
            label="點擊開啟下拉式選單"
            sx={{
              label: {
                color: "#E0E0E0",
              },
            }}
          />
        )}
      /> */}
    </Stack>
  );
  // identity === ethersSigner["address"] ? (
  //   <TableContainer component={Paper} sx={{ backgroundColor: "#1b2a32" }}>
  //     <Table aria-label="simple table">
  //       <TableBody>
  //         {rows.map((row) => (
  //           <TableRow
  //             key={row.name}
  //             sx={{
  //               "&:last-child td, &:last-child th": { border: 0 },
  //               backgroundColor: "#1b2a32",
  //             }}
  //           >
  //             <TableCell component="th" scope="row">
  //               <Typography fontWeight={"bold"} variant="subtitle1">
  //                 {row.name}
  //               </Typography>
  //               {row.value}
  //             </TableCell>
  //             <TableCell align="right">
  //               {/* {row.func} */}
  //               {row.name === "身分" ? (
  //                 <>
  //                   <Button
  //                     variant="outlined"
  //                     onClick={() => {
  //                       setOpenDialogCreateSSI(true);
  //                     }}
  //                     size="large"
  //                     sx={{
  //                       pl: 2,
  //                       backgroundColor: "#456B80",
  //                       borderColor: "#456B80",
  //                       color: "#FFF",
  //                       "&:hover": {
  //                         backgroundColor: "#1b2a32",
  //                         borderColor: "#456B80",
  //                         color: "#eeeeee",
  //                       },
  //                     }}
  //                   >
  //                     <EditIcon />
  //                     <Typography
  //                       fontWeight={"bold"}
  //                       variant="subtitle1"
  //                       sx={{
  //                         ml: 1,
  //                       }}
  //                     >
  //                       變更身分擁有者
  //                     </Typography>
  //                   </Button>
  //                   <DialogCreateSSI
  //                     openDialogCreateSSI={openDialogCreateSSI}
  //                     setOpenDialogCreateSSI={setOpenDialogCreateSSI}
  //                     ethersSigner={ethersSigner}
  //                   />
  //                 </>
  //               ) : (
  //                 <></>
  //               )}
  //             </TableCell>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // ) : (
  //   <Stack>
  //     <Stack
  //       direction="row"
  //       alignItems="center"
  //       alignContent={"center"}
  //       sx={{ p: 2 }}
  //     >
  //       <ReportProblemIcon color="warning" fontSize="large" />
  //       <Container>
  //         <Typography fontWeight={"bold"} variant="subtitle1">
  //           未擁有去中心化身分
  //         </Typography>
  //         <Typography variant="subtitle2">
  //           Decentralized Identity NOT Found
  //         </Typography>
  //       </Container>
  //     </Stack>
  //     <Divider
  //       variant="middles"
  //       sx={{ backgroundColor: "#E0E0E0", mt: -1, mb: 1 }}
  //     />
  //     <Container>
  //       <Typography variant="text">
  //         你已將自身預設的身分擁有者轉移給下方的EOA
  //       </Typography>
  //     </Container>
  //   </Stack>
  // );
};

export default SSI;
