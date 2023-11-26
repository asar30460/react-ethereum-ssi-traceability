import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSDK } from "@metamask/sdk-react";
import { ethers } from "ethers";

import { Box } from "@mui/material";

import Navbar from "./MainLayout/Navbar";
import SidebarSection from "./MainLayout/SidebarSection";
import Feed from "./Feed";
import SSI from "./SSI";
import Peoject from "./Project";
import Dev from "./Dev";

const SupplierPage = () => {
  const [selectedPage, setSelectedPage] = useState("");
  const [collapsed, setcollapsed] = useState(false);

  const { chainId } = useSDK();
  const [ethersProvider, setEthersProvider] = useState("尚未連線");
  const [ethersSigner, setEthersSigner] = useState("尚未連線");
  const [ethersInfo, setethersInfo] = useState([]);

  function createData(title, value) {
    return { title, value };
  }

  const getAccount = async () => {
    let provider;
    let signer;

    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    }
    setEthersProvider(provider);
    setEthersSigner(signer);

    setethersInfo([
      createData("RPC 伺服器", "Localhost:8545"),
      createData(
        "連線帳戶",
        `${signer["address"].slice(1, 6)}...${signer["address"].slice(-5, -1)}`
      ),
      createData("Chain ID", parseInt(chainId, 16)),
    ]);
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <>
      <Navbar
        setcollapsed={setcollapsed}
        collapsed={collapsed}
        setSelectedPage={setSelectedPage}
      />
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            height: `calc(100vh - 64px)`,
          }}
        >
          <SidebarSection
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            sidebarCollapsed={collapsed}
          />
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              zIndex: 3,
              p: 2,
              borderRadius: 3,
              backgroundColor: selectedPage === "dev" ? "#1B2A32" : "#223540",
              border: selectedPage === "dev" ? "1px solid #7D231E" : "0px",
            }}
          >
            <Routes>
              <Route path="" element={<Feed ethersInfo={ethersInfo} />} />
              <Route
                path="/ssi-management"
                element={<SSI ethersSigner={ethersSigner} />}
              />
              <Route path="/project" element={<Peoject />} />
              <Route
                path="/dev"
                element={
                  <Dev
                    ethersSigner={ethersSigner}
                    ethersProvider={ethersProvider}
                  />
                }
              />
            </Routes>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default SupplierPage;
