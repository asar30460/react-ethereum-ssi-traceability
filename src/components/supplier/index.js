import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import { Stack } from "@mui/material";

import Navbar from "./MainLayout/Navbar";
import SidebarSection from "./MainLayout/SidebarSection";
import Feed from "./Feed";
import SSI from "./SSI";
import Peoject from "./Project";

const SupplierPage = () => {
  const [selectedPage, setSelectedPage] = useState("");
  const [collapsed, setcollapsed] = useState(false);

  // useEffect(() => {
  //   console.log("" + selectedPage);
  // }, [selectedPage]);

  return (
    <>
      <Navbar setcollapsed={setcollapsed} collapsed={collapsed} />

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
          <Route path="" element={<Feed />} />
          <Route path="/ssi-management" element={<SSI />} />
          <Route path="/project" element={<Peoject />} />
        </Routes>
      </Stack>
    </>
  );
};

export default SupplierPage;
