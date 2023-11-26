import React, { useState, useEffect } from "react";
import { Contract } from "ethers";
import { DialogCreateSSI, documentResolver } from "./ssi-components";

// Materials
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

// Mui Table Component
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

function createData(name, value, func) {
  return { name, value, func };
}

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

  const rows = [
    createData("身分擁有者", ethersSigner["address"]),
    createData("身分", identity, "Change Owner"),
  ];

  return identity === ethersSigner["address"] ? (
    <TableContainer component={Paper} sx={{ backgroundColor: "#1b2a32" }}>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "#1b2a32",
              }}
            >
              <TableCell component="th" scope="row">
                <Typography fontWeight={"bold"} variant="subtitle1">
                  {row.name}
                </Typography>
                {row.value}
              </TableCell>
              <TableCell align="right">
                {/* {row.func} */}
                {row.name === "身分" ? (
                  <>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setOpenDialogCreateSSI(true);
                      }}
                      size="large"
                      sx={{
                        pl: 2,
                        backgroundColor: "#456B80",
                        borderColor: "#456B80",
                        color: "#FFF",
                        "&:hover": {
                          backgroundColor: "#1b2a32",
                          borderColor: "#456B80",
                          color: "#eeeeee",
                        },
                      }}
                    >
                      <EditIcon />
                      <Typography
                        fontWeight={"bold"}
                        variant="subtitle1"
                        sx={{
                          ml: 1,
                        }}
                      >
                        變更身分擁有者
                      </Typography>
                    </Button>
                    <DialogCreateSSI
                      openDialogCreateSSI={openDialogCreateSSI}
                      setOpenDialogCreateSSI={setOpenDialogCreateSSI}
                      ethersSigner={ethersSigner}
                    />
                  </>
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        alignContent={"center"}
        sx={{ p: 2 }}
      >
        <ReportProblemIcon color="warning" fontSize="large" />
        <Container>
          <Typography fontWeight={"bold"} variant="subtitle1">
            未擁有去中心化身分
          </Typography>
          <Typography variant="subtitle2">
            Decentralized Identity NOT Found
          </Typography>
        </Container>
      </Stack>
      <Divider
        variant="middles"
        sx={{ backgroundColor: "#E0E0E0", mt: -1, mb: 1 }}
      />
      <Container>
        <Typography variant="text">
          你已將自身預設的身分擁有者轉移給下方的EOA
        </Typography>
      </Container>
    </Stack>
  );
};

export default SSI;
