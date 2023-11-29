import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MetaMaskProvider } from "@metamask/sdk-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const styleOverrides = {
  font: {
    styleOverrides: {
      root: {
        fontFamily: "Noto Serif TC",
      },
    },
  },
  tableCell: {
    styleOverrides: {
      root: {
        color: "#E0E0E0",
        fontFamily: "Noto Serif TC",
        borderBottom: "1px solid #E0E0E0",
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
    MuiTableCell: styleOverrides.tableCell,
    MuiTextField: styleOverrides.textField,
    MuiInputLabel: styleOverrides.font,
    MuiMenuItem: styleOverrides.font,
    MuiSelect: styleOverrides.font,
  },
});

root.render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        logging: {
          developerMode: false,
        },
        communicationServerUrl: process.env.REACT_APP_COMM_SERVER_URL,
        checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
        dappMetadata: {
          name: "React Ethereum Traceability App",
          url: window.location.host,
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </MetaMaskProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
