import { useState, useEffect } from "react";
import {
  UnselectedSSI,
  DialogChangeOwner,
  DialogAddDelegate,
  queryIdentityOwner,
  queryDIDOwnerChangedTo,
  queryDIDDelegateTo,
  queryDIDDelegateChangedEvents,
} from "./ssi-components";

// Materials
import {
  Box,
  Button,
  CircularProgress,
  Chip,
  Divider,
  FormControl,
  IconButton,
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
import TableRow from "@mui/material/TableRow";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import InfoIcon from "@mui/icons-material/Info";
import SendIcon from "@mui/icons-material/Send";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

const SSI = ({ ethersSigner }) => {
  const [mode, setMode] = useState("default"); //SSI resource
  const [optionlist, setoptionlist] = useState([
    { did: `did:ethr:${ethersSigner["address"]}` },
  ]);
  const [loading, setLoading] = useState(false);
  const [docDID, setDocDID] = useState("");
  const [isOwnerChanged, setIsOwnerChanged] = useState(false);
  const [docAuthentication, setDocAuthentication] = useState("");
  const [docVerificationMethod, setDocVerificationMethod] = useState([]);
  const [idx_veri, setIdx_veri] = useState(0);
  const [loading_veri, setLoading_veri] = useState(true);

  // Config for dialog
  const [openChangeOwner, setOpenChangeOwner] = useState(false);
  const [openDelegate, setOpenDelegate] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      setIdx_veri(0);
      let list = [];
      switch (mode) {
        case "default":
          list = [ethersSigner["address"]];
          setoptionlist(list);
          setDocDID(list[0]);
          await queryIdentityOwner(ethersSigner, ethersSigner["address"]).then(
            (result) => {
              if (result !== ethersSigner["address"]) {
                setIsOwnerChanged(true);
              }
            }
          );
          break;
        case "others":
          await queryDIDOwnerChangedTo(ethersSigner).then((result) => {
            setoptionlist(result);
            setDocDID(result[0]);
          });
          break;
        case "delegate":
          await queryDIDDelegateTo(ethersSigner).then((result) => {
            setoptionlist(result);
            setDocDID(result[0]);
          });
          break;
        default:
          break;
      }
      setLoading(false);
    };

    fetchData();
  }, [mode]);

  useEffect(() => {
    setLoading_veri(true);
    setIdx_veri(0);

    const fetchData = async () => {
      await queryIdentityOwner(ethersSigner, docDID).then((result) => {
        setDocAuthentication(result);
      });

      await queryDIDDelegateChangedEvents(ethersSigner, docDID).then(
        (result) => {
          setDocVerificationMethod(result);
        }
      );
      setLoading_veri(false);
    };

    fetchData();
  }, [docDID]);

  const SSIDocSource = [
    { text: "預設DID", mode: "default" },
    { text: "來自其它EOA轉讓的DID", mode: "others" },
    { text: "受委任DID", mode: "delegate" },
  ];

  return (
    <Stack gap={1} alignItems="flex-start">
      <Divider
        sx={{
          minWidth: { sx: "100%", md: "720px" },
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
              borderRadius: "3px",
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
            zIndex: 2,
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
          borderRadius: "3px",
        }}
      >
        <InputLabel
          id="did-select-label"
          sx={{
            display: "flex",
            backgroundColor: "#223540",
            color: "#E0E0E0",
          }}
        >
          DID
        </InputLabel>
        <Select
          labelId="did-select-label"
          id="did-select"
          value={docDID}
          disabled={loading}
          onChange={(e) => {
            setDocDID(e.target.value);
          }}
          sx={{
            color: "#E0E0E0",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
              borderRadius: "3px",
              borderWidth: "0.1rem",
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

      <Paper
        sx={{
          backgroundColor: "#1b2a32",
          color: "#E0E0E0",
          width: "100%",
        }}
      >
        {loading ? (
          <LinearProgress
            sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
          />
        ) : (
          <Box sx={{ minHeight: "4px", width: "100%" }} />
        )}
        <Box sx={{ opacity: loading || loading_veri ? 0.5 : 1 }}>
          {(optionlist[0] === "無委任資料") |
          (optionlist[0] === "無其它DID資料") ? (
            <UnselectedSSI />
          ) : (
            <>
              {isOwnerChanged && mode === "default" ? (
                <Box
                  display="inline-flex"
                  borderRadius="3px"
                  sx={{ p: 1, mx: 3, mt: 1, backgroundColor: "#A13210" }}
                >
                  <InfoIcon />
                  <Typography variant="body2">
                    &nbsp;你已將該DID控制權轉移，該身分目前的認證方式請參閱下方對應欄位。
                  </Typography>
                </Box>
              ) : null}

              <Box sx={{ px: 3, py: 2 }}>
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
                <Typography variant="body2">
                  https://www.w3.org/ns/did/v1
                </Typography>
                <Typography variant="body2">
                  https://w3id.org/security/suites/secp256k1recovery-2020/v2
                </Typography>
              </Box>
              <Divider sx={{ border: "2px solid #223540" }} />
              <Box sx={{ px: 3, py: 2 }}>
                <Typography
                  fontWeight={"bold"}
                  variant="subtitle2"
                  sx={{ mb: 1 }}
                >
                  id
                </Typography>
                <Typography variant="body2">did:ethr:{docDID}</Typography>
              </Box>
              <Divider sx={{ border: "2px solid #223540" }} />
              <Box sx={{ px: 3, py: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: "bold" }}
                >
                  authentication
                </Typography>
                <Typography variant="body2">
                  {`${docAuthentication}#controller`}
                </Typography>
              </Box>
              <Divider sx={{ border: "2px solid #223540" }} />
              <Box
                display="flex"
                flexDirection="column"
                minHeight={"304px"}
                sx={{ px: 3, py: 2 }}
              >
                <Stack direction={"row"} justifyContent="space-between">
                  <Typography
                    fontWeight={"bold"}
                    variant="subtitle2"
                    sx={{ mb: 1 }}
                  >
                    verificationMethod
                  </Typography>
                  <Box display="flex" alignItems={"center"} sx={{ mt: -1 }}>
                    <IconButton
                      aria-label="lastpage"
                      size="small"
                      disabled={idx_veri === 0}
                      onClick={() => {
                        setIdx_veri(idx_veri - 1);
                      }}
                      sx={{
                        backgroundColor: "#223540",
                        color: "#E0E0E0",
                        "&:hover": {
                          backgroundColor: "#223540",
                          color: "#FFF",
                        },
                        "&.Mui-disabled": {
                          color: "#707070",
                        },
                      }}
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      項目{idx_veri + 1}，總共{docVerificationMethod.length}
                      &nbsp;&nbsp;
                    </Typography>
                    <IconButton
                      aria-label="nextpage"
                      size="small"
                      color="info"
                      disabled={idx_veri === docVerificationMethod.length - 1}
                      onClick={() => {
                        setIdx_veri(idx_veri + 1);
                      }}
                      sx={{
                        backgroundColor: "#223540",
                        color: "#E0E0E0",
                        "&:hover": {
                          backgroundColor: "#223540",
                          color: "#FFF",
                        },
                        "&.Mui-disabled": {
                          color: "#707070",
                        },
                      }}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </Box>
                </Stack>

                <Table>
                  {loading_veri ? (
                    <TableBody>
                      <TableRow>
                        <TableCell>Loading...</TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {idx_veri === 0 ? (
                        <>
                          <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>{docVerificationMethod[0].id}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>type</TableCell>
                            <TableCell>
                              {docVerificationMethod[0].type}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>controller</TableCell>
                            <TableCell>
                              {docVerificationMethod[0].controller}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              blockchain
                              <br />
                              -AccountId
                            </TableCell>
                            <TableCell>
                              {docVerificationMethod[0].blockchainAccountId}
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <>
                          <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>
                              did:ethr:
                              {docVerificationMethod[idx_veri].identity}
                              -delagate
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>type</TableCell>
                            <TableCell>
                              {docVerificationMethod[
                                idx_veri
                              ].delegateType.charAt(3) === "6"
                                ? "veriKey"
                                : "sigAuth"}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>controller</TableCell>
                            <TableCell>
                              did:ethr:
                              {docVerificationMethod[idx_veri].controller}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              blockchain
                              <br />
                              -AccountId
                            </TableCell>
                            <TableCell>
                              eip155:1:
                              {docVerificationMethod[idx_veri].controller}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>validTo</TableCell>
                            <TableCell>
                              {docVerificationMethod[idx_veri].validTo}
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  )}
                </Table>
              </Box>
            </>
          )}
        </Box>
      </Paper>
      {mode !== "delegate" ? (
        <>
          <Divider
            sx={{
              my: 1,
              zIndex: 1,
              minWidth: "100%",
              "&::before, &::after": {
                borderColor: "#E0E0E0",
              },
            }}
          >
            <Chip
              icon={<PriorityHighIcon color="#E0E0E0" />}
              label="身分相關功能異動"
              sx={{
                p: 1,
                backgroundColor: "#7D231E",
                color: "#E0E0E0",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />
          </Divider>
          <Stack direction={"row"} gap={2}>
            <Box>
              <Button
                variant="outlined"
                endIcon={<SendIcon />}
                disabled={loading}
                onClick={() => {
                  setOpenChangeOwner(true);
                }}
                sx={{
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
                變更身分擁有者
              </Button>
              <DialogChangeOwner
                ethersSigner={ethersSigner}
                open={openChangeOwner}
                setOpen={setOpenChangeOwner}
                docDID={docDID}
              />
            </Box>
            <Box>
              <Button
                variant="outlined"
                endIcon={<SendIcon />}
                disabled={loading}
                onClick={() => {
                  setOpenDelegate(true);
                }}
                sx={{
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
              <DialogAddDelegate
                ethersSigner={ethersSigner}
                open={openDelegate}
                setOpen={setOpenDelegate}
                docDID={docDID}
              />
            </Box>
          </Stack>
        </>
      ) : null}
    </Stack>
  );
};

export default SSI;
