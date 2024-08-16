import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Register from "./components/Register";
import Expense from "./components/Expense";
import Login from "./components/Login";
import Home from "./components/Home";
import Categories from "./components/Categories";

function App() {
  // localStorage.clear();
  const storedAccessToken = localStorage.getItem("access_token");
  const storedRefreshToken = localStorage.getItem("refresh_token");
  const [accessToken, setAccessToken] = useState(storedAccessToken || "");
  const [refreshToken, setRefreshToken] = useState(storedRefreshToken || "");

  return (
    <>
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
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Home accessToken={accessToken} refreshToken={refreshToken} />
              }
            ></Route>
            <Route
              path="/category"
              element={
                <Categories
                  accessToken={accessToken}
                  refreshToken={refreshToken}
                />
              }
            ></Route>
            <Route
              path="/expense/:id"
              element={
                <Expense
                  accessToken={accessToken}
                  refreshToken={refreshToken}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
