import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { Header, Entrance, Home } from "./components";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          {/* {window.location.pathname === "/" ? (
          ) : ()} */}
          <Header />
          <Routes>
            <Route path="/" element={<Entrance />} />
            <Route path="/supplier" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
};

export default App;
