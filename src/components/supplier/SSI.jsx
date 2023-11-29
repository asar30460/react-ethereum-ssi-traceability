import React, { useState, useEffect } from "react";
import {
  queryDIDOwnerChangedEvents,
  queryDIDDelegateChangedEvents,
  documentResolver,
} from "./ssi-components";

// Materials
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";

// Mui Table Component
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const SSI = ({ ethersSigner }) => {
  const [openDialogCreateSSI, setOpenDialogCreateSSI] = useState(false);
  const [mode, setMode] = useState("default");
  const [optionlist, setoptionlist] = useState([
    { did: `did:ethr:${ethersSigner["address"]}` },
  ]);
  const [docDID, setDocDID] = useState("");

  useEffect(() => {
    async function getDocument() {
      const response = await documentResolver(ethersSigner);
      console.log(response);
    }
    getDocument();
  }, []);

  useEffect(() => {
    let list = [];
    switch (mode) {
      case "default":
        list = [{ did: `did:ethr:${ethersSigner["address"]}` }];
        setoptionlist(list);
        setDocDID(list[0].did);
        break;
      case "others":
        async function isOwnerChange() {
          const result = await queryDIDOwnerChangedEvents(ethersSigner);
          setoptionlist(result);
          setDocDID(result[0].did);
        }
        isOwnerChange();
        break;
      case "delegate":
        async function queryDIDDelegate() {
          const result = await queryDIDDelegateChangedEvents(ethersSigner);
          setoptionlist(result);
          setDocDID(result[0].did);
        }
        queryDIDDelegate();
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

  const [docId, setDocId] = useState("");
  const [docVerificationMethod, setDocVerificationMethod] = useState("");
  const [docAuthentication, setDocAuthentication] = useState("");
  const DIDDocument = {
    id: "did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a",
    verificationMethod: [
      {
        id: "did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a#controller",
        type: "EcdsaSecp256k1RecoveryMethod2020",
        controller: "did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a",
        blockchainAccountId:
          "eip155:1:0xb9c5714089478a327f09197987f16f9e5d936e8a",
      },
    ],
    authentication: [
      "did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a#controller",
    ],
  };

  return (
    <Stack gap={1} alignItems="flex-start">
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
        &nbsp;&nbsp;&nbsp;SSI Document來源
      </Stack>
      <Grid container sx={{ ml: 6 }}>
        {SSIDocSource.map((source) => (
          <Button
            key={source.mode}
            size="large"
            onClick={() => setMode(source.mode)}
            sx={{
              backgroundColor: "#1B2A32",
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
        &nbsp;&nbsp;&nbsp;選擇SSI
      </Stack>
      <FormControl
        sx={{
          ml: 6,
          backgroundColor: "#1B2A32",
        }}
      >
        <InputLabel
          sx={{
            color: "#E0E0E0",
          }}
        >
          DID
        </InputLabel>
        <Select
          label="DID"
          value={docDID}
          onChange={(e) => {
            setDocDID(e.target.value);
          }}
          sx={{
            color: "#E0E0E0",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderRadius: "0px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
              borderRadius: "0px",
              borderWidth: "0.15rem",
            },
          }}
        >
          {optionlist.map((opt) => (
            <MenuItem key={opt.did} value={opt.did}>
              {opt.did}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography fontSize="20px" fontWeight="bold">
        DID Document
      </Typography>
      {(optionlist[0].did === "無委任資料") |
      (optionlist[0].did === "無其它DID資料") ? (
        <Box display="flex" sx={{ backgroundColor: "#1b2a32" }}>
          <Stack>
            <Stack
              direction="row"
              alignItems="center"
              alignContent={"center"}
              sx={{ p: 2 }}
            >
              <ReportProblemIcon
                color="warning"
                fontSize="large"
                sx={{ mr: 2 }}
              />
              <Box>
                <Typography fontWeight={"bold"} variant="subtitle1">
                  未授權的DID
                </Typography>
                <Typography variant="subtitle2">
                  Decentralized Identity NOT Authorized
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: "#1b2a32" }}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: "#1b2a32",
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography
                    fontWeight={"bold"}
                    variant="subtitle2"
                    sx={{ mb: 1 }}
                  >
                    @context
                  </Typography>
                  <div>{"https://www.w3.org/ns/did/v1"}</div>
                  {"https://w3id.org/security/suites/secp256k1recovery-2020/v2"}
                </TableCell>
                <TableCell align="right">123</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: "#1b2a32",
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography
                    fontWeight={"bold"}
                    variant="subtitle2"
                    sx={{ mb: 1 }}
                  >
                    id
                  </Typography>
                  {docDID}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: "#1b2a32",
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography
                    fontWeight={"bold"}
                    variant="subtitle2"
                    sx={{ mb: 1 }}
                  >
                    verificationMethod
                  </Typography>
                  <div>
                    {DIDDocument.verificationMethod.map(
                      (idx) => `id: ${idx.id}`
                    )}
                  </div>
                  <div>
                    {DIDDocument.verificationMethod.map(
                      (idx) => `type: ${idx.type}`
                    )}
                  </div>
                  <div>
                    {DIDDocument.verificationMethod.map(
                      (idx) => `controller: ${idx.controller}`
                    )}
                  </div>
                  <div>
                    {DIDDocument.verificationMethod.map(
                      (idx) => `blockchainAccountId: ${idx.blockchainAccountId}`
                    )}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: "#1b2a32",
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography
                    fontWeight={"bold"}
                    variant="subtitle2"
                    sx={{ mb: 1 }}
                  >
                    authentication
                  </Typography>
                  {JSON.stringify(DIDDocument.authentication, null, 2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default SSI;
