import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Entrance, SupplierPage, InvalidAlert } from "./components";

const App = () => {
  const [properLogin, setProperLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Entrance setProperLogin={setProperLogin} />}
        />
        <Route
          path="supplier/*"
          element={
            properLogin ? (
              <SupplierPage />
            ) : (
              <Navigate replace to="../invalid-login" />
            )
          }
        />
        <Route path="/invalid-login" element={<InvalidAlert />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
