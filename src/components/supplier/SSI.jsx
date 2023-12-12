import React, { useState, useEffect } from "react";
import {
  UnselectedSSI,
  queryIdentityOwner,
  queryDIDOwnerChangedTo,
  queryDIDDelegateTo,
  queryDIDDelegateChangedEvents,
  documentResolver,
} from "./ssi-components";

// Materials
import {
  Box,
  Button,
  CircularProgress,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Grid,
  LinearProgress,
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

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";

const SSI = ({ ethersSigner }) => {
  const [openDialogCreateSSI, setOpenDialogCreateSSI] = useState(false);
  const [mode, setMode] = useState("default");
  const [optionlist, setoptionlist] = useState([
    { did: `did:ethr:${ethersSigner["address"]}` },
  ]);
  const [loading, setLoading] = useState(false);
  const [docDID, setDocDID] = useState("");
  const [isOwnerChanged, setIsOwnerChanged] = useState(false);
  const [docVerificationMethod, setDocVerificationMethod] = useState("");
  const [docAuthentication, setDocAuthentication] = useState("");

  const delay = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      await delay(650);
      let list = [];
      switch (mode) {
        case "default":
          list = [ethersSigner["address"]];
          setoptionlist(list);
          setDocDID(list[0]);
          queryIdentityOwner(ethersSigner, ethersSigner["address"]).then(
            (result) => {
              if (result !== ethersSigner["address"]) {
                setIsOwnerChanged(true);
              }
              setDocAuthentication(result);
            }
          );
          break;
        case "others":
          queryDIDOwnerChangedTo(ethersSigner).then((result) => {
            setoptionlist(result);
            setDocDID(result[0]);
          });
          break;
        case "delegate":
          queryDIDDelegateTo(ethersSigner).then((result) => {
            setoptionlist(result);
            setDocDID(result[0]);
          });
          break;
        default:
          break;
      }
      await delay(50);
      setLoading(false);
    };

    fetchData();
  }, [mode]);

  useEffect(() => {
    queryDIDDelegateChangedEvents(ethersSigner, docDID).then((result) => {
      if (result.length > 0) setDocVerificationMethod(result);
      console.log(docVerificationMethod);
    });
  }, [docDID]);

  const SSIDocSource = [
    { text: "預設DID", mode: "default" },
    { text: "來自其它EOA轉讓的DID", mode: "others" },
    { text: "受委任DID", mode: "delegate" },
  ];

  const DIDDocument = {
    verificationMethod: [
      {
        id: "did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a#controller",
        type: "EcdsaSecp256k1RecoveryMethod2020",
        controller: "did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a",
        blockchainAccountId:
          "eip155:1:0xb9c5714089478a327f09197987f16f9e5d936e8a",
      },
    ],
  };

  return (
    <Stack gap={1} alignItems="flex-start">
      <Divider
        sx={{
          minWidth: { sx: "100%", md: "744px" },
          width: "100%",
          "&::before, &::after": {
            borderColor: "#E0E0E0",
          },
        }}
      >
        <Chip
          icon={<FilterAltIcon color="info" />}
          label="篩選條件"
          sx={{
            p: 1,
            backgroundColor: "#1F1F1F",
            color: "#E0E0E0",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        />
      </Divider>
      <Stack direction="row" alignItems="center">
        <Box
          sx={{
            px: 1,
            py: 0.5,
            backgroundColor: "#1F1F1F",
            borderRadius: "3px",
          }}
        >
          <Typography fontWeight="bold" fontSize="12px">
            STEP&nbsp;01
          </Typography>
        </Box>
        &nbsp;DID Document來源
      </Stack>
      <Grid container sx={{ mb: 1 }}>
        {SSIDocSource.map((source) => (
          <Button
            key={source.mode}
            disabled={loading}
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
        <Box
          sx={{
            px: 1,
            py: 0.5,
            backgroundColor: "#1F1F1F",
            borderRadius: "3px",
          }}
        >
          <Typography fontWeight="bold" fontSize="12px">
            STEP&nbsp;02
          </Typography>
        </Box>
        &nbsp;選擇DID
      </Stack>
      <FormControl
        sx={{
          display: "flex",
          alignItems: "flex-end",
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
          disabled={loading}
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
            ".MuiSelect-icon": {
              color: loading ? "#1B2A32" : "#E0E0E0",
            },
          }}
        >
          {optionlist[0] === "無委任資料" ||
          optionlist[0] === "無其它DID資料" ? (
            <MenuItem key={optionlist[0]} value={optionlist[0]}>
              {optionlist[0]}
            </MenuItem>
          ) : (
            optionlist.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {`did:ethr:${opt}`}
              </MenuItem>
            ))
          )}
        </Select>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: "#FFF",
              position: "absolute",
              mt: 2,
              mr: 2,
            }}
          />
        )}
      </FormControl>
      <Divider
        sx={{
          mt: 2,
          mb: 1,
          width: "100%",
          "&::before, &::after": {
            borderColor: "#E0E0E0",
          },
        }}
      >
        <Chip
          icon={<RecentActorsIcon color="info" />}
          label="&nbsp;DID文件"
          sx={{
            p: 1,
            backgroundColor: "#1F1F1F",
            color: "#E0E0E0",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        />
      </Divider>
      <TableContainer component={Paper} sx={{ backgroundColor: "#1b2a32" }}>
        {loading ? (
          <LinearProgress />
        ) : (
          <Box sx={{ minHeight: "4px", width: "100%" }}></Box>
        )}
        <Table aria-label="simple table">
          {(optionlist[0] === "無委任資料") |
          (optionlist[0] === "無其它DID資料") ? (
            <UnselectedSSI />
          ) : (
            <>
              {isOwnerChanged && mode === "default" ? (
                <Box
                  display="inline-flex"
                  direction="row"
                  alignItems="center"
                  borderRadius="3px"
                  sx={{ p: 1, mb: 1, backgroundColor: "#A13210" }}
                >
                  <InfoIcon />
                  <Typography variant="body2">
                    &nbsp;你已將該DID控制權轉移，該身分目前的認證方式請參閱下方對應欄位。
                  </Typography>
                </Box>
              ) : null}

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
                      sx={{
                        mt: -0.5,
                        mb: 1,
                      }}
                    >
                      @context
                    </Typography>
                    <div>{"https://www.w3.org/ns/did/v1"}</div>
                    {
                      "https://w3id.org/security/suites/secp256k1recovery-2020/v2"
                    }
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
                      id
                    </Typography>
                    {docDID}
                  </TableCell>
                  <TableCell align="right" />
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
                        (idx) =>
                          `blockchainAccountId: ${idx.blockchainAccountId}`
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <Stack spacing={1} justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        startIcon={<SearchIcon />}
                        // disabled={loading}
                        // onClick={onClick}
                        sx={{
                          mr: -1,
                          backgroundColor: "#1b2a32",
                          color: "#E0E0E0",
                          borderColor: "#1C7AC7",
                          "&:hover": {
                            backgroundColor: "#1C7AC7",
                            color: "#FFF",
                            borderColor: "#1C7AC7",
                          },
                        }}
                      >
                        查看歷史紀錄
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<SendIcon />}
                        // disabled={loading}
                        // onClick={onClick}
                        sx={{
                          mr: -1,
                          backgroundColor: "#1b2a32",
                          color: "#E0E0E0",
                          borderColor: "#D84315",
                          "&:hover": {
                            backgroundColor: "#D84315",
                            color: "#FFF",
                            borderColor: "#D84315",
                          },
                        }}
                      >
                        新增委任權限
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      authentication
                    </Typography>
                    {`${docAuthentication}#controller`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default SSI;
