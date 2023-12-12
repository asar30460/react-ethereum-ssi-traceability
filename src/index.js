import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

const styleOverrides = {
  font: {
    styleOverrides: {
      root: {
        fontFamily: "Noto Serif TC",
      },
    },
  },
  tableRow: {
    styleOverrides: {
      root: {
        borderBottom: "3px solid #223540",
      },
    },
  },
  tableCell: {
    styleOverrides: {
      root: {
        color: "#E0E0E0",
        fontFamily: "Noto Serif TC",
        borderBottom: "3px solid #223540",
      },
    },
  },
  textField: {
    styleOverrides: {
      root: {
        label: {
          fontFamily: "Noto Serif TC",
        },
        input: {
          fontFamily: "Noto Serif TC",
        },
      },
    },
  },
};
const theme = createTheme({
  components: {
    MuiTypography: styleOverrides.font,
    MuiButton: styleOverrides.font,
    MuiTableRow: styleOverrides.tableRow,
    MuiTableCell: styleOverrides.tableCell,
    MuiTextField: styleOverrides.textField,
    MuiInputLabel: styleOverrides.font,
    MuiMenuItem: styleOverrides.font,
    MuiSelect: styleOverrides.font,
    MuiChip: styleOverrides.font,
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
