import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSDK } from "@metamask/sdk-react";

import { Entrance, SupplierPage } from "./components";

const App = () => {
  const { connected } = useSDK();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route
          path="supplier/*"
          element={connected ? <SupplierPage /> : <Navigate replace to=".." />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
