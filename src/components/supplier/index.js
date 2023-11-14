import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSDK } from "@metamask/sdk-react";
import { ethers } from "ethers";

import { Stack } from "@mui/material";

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

      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="flex-start"
        spacing={-1}
      >
        <SidebarSection
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          sidebarCollapsed={collapsed}
        />
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
      </Stack>
    </>
  );
};

export default SupplierPage;
