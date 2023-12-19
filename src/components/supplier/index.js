import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

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

  const [ethersProvider, setEthersProvider] = useState("尚未連線");
  const [ethersSigner, setEthersSigner] = useState("尚未連線");

  const [isInitCompeleted, setIsInitCompeleted] = useState(false);

  let provider;
  let signer;
  useEffect(() => {
    const init = async () => {
      try {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
      } catch (error) {
        provider = ethers.getDefaultProvider();
        console.log("MetaMask not installed; using read-only defaults");
      }
      setEthersProvider(provider);
      setEthersSigner(signer);
      setIsInitCompeleted(true);
    };
    init();
  }, [selectedPage]);

  return isInitCompeleted ? (
    <>
      <Navbar
        ethersSigner={ethersSigner["address"]}
        setcollapsed={setcollapsed}
        collapsed={collapsed}
        setSelectedPage={setSelectedPage}
      />
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            height: { xs: `calc(100vh - 56px)`, sm: `calc(100vh - 64px)` },
          }}
        >
          <SidebarSection
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            sidebarCollapsed={collapsed}
          />
          <Box
            alignItems="flex-start"
            sx={{
              display: "flex",
              justifyContent: "center",
              zIndex: 3,
              flexGrow: { xs: 1, sm: 0.94, md: 0.96, lg: 0.98 },
              overflow: "auto",
              p: 3,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: selectedPage === "dev" ? "#1B2A32" : "#223540",
              border: selectedPage === "dev" ? "1px solid #7D231E" : "0px",
              "&::-webkit-scrollbar": {
                width: 12,
              },
              "&::-webkit-scrollbar-track": {
                borderTopRightRadius: 10,
                backgroundColor: "#162229",
              },
              "&::-webkit-scrollbar-thumb": {
                borderTopRightRadius: 10,
                backgroundColor: "#2B4452",
              },
            }}
          >
            <Routes>
              <Route
                path=""
                element={
                  <Feed
                    ethersProvider={ethersProvider}
                    ethersSigner={ethersSigner}
                  />
                }
              />
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
  ) : (
    <div>Loading...</div>
  );
};

export default SupplierPage;
