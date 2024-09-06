import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Register from "./components/Register";
import Expense from "./components/Expense";
import InsertExpense from "./components/InsertExpense";
import Category from "./components/Category";
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
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setAccessToken={setAccessToken}
                  setRefreshToken={setRefreshToken}
                />
              }
            />
            <Route
              path="/category"
              element={
                <Categories
                  setAccessToken={setAccessToken}
                  setRefreshToken={setRefreshToken}
                />
              }
            />
            <Route
              path="/expense"
              element={
                <InsertExpense
                  setAccessToken={setAccessToken}
                  setRefreshToken={setRefreshToken}
                />
              }
            />
            <Route
              path="/expense/:id"
              element={
                <Expense
                  setAccessToken={setAccessToken}
                  setRefreshToken={setRefreshToken}
                />
              }
            />
            <Route
              path="/category/:id"
              element={
                <Category
                  setAccessToken={setAccessToken}
                  setRefreshToken={setRefreshToken}
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
