import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Box, Typography } from "@mui/material";

function createData(name, value, func) {
  return { name, value, func };
}

const rows = [
  createData("Identifier", "did:ether:0000"),
  createData("Identity Owner", "did:ether:0000", "Change Owner"),
];

const SSI = () => {
  return (
    <div style={{ width: "100%", zIndex: 3 }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          borderRadius: 2,
          backgroundColor: "#223540",
          height: { xs: "90vh", md: "90vh" },
          width: { xs: "90%", md: "96%" },
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ px: 1, backgroundColor: "#1b2a32", width: "98%" }}
        >
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
                  <TableCell align="right">{row.func}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default SSI;
