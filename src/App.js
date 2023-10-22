import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSDK } from "@metamask/sdk-react";
import "./App.css";

import { Entrance, Header, Feed } from "./components";

const App = () => {
  const { connected } = useSDK();

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Entrance />} />
            <Route
              path="supplier"
              element={
                connected ? (
                  <>
                    <Header />
                    <Feed />
                  </>
                ) : (
                  <Navigate replace to=".." />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
};

export default App;
