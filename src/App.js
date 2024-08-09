import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  return (
    <div>
      {!accessToken ? (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  setAccessToken={setAccessToken}
                  setRefreshToken={setRefreshToken}
                />
              }
            ></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <div>
          <Home accessToken={accessToken} refreshToken={refreshToken} />
        </div>
      )}
    </div>
  );
}

export default App;
