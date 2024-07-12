import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
      {!token ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <div>
          <Home token={token} />
        </div>
      )}
    </div>
  );
}

export default App;
