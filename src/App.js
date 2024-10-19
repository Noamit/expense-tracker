import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Register from "./components/Register";
import Expense from "./components/Expense";
import InsertExpense from "./components/InsertExpense";
import Category from "./components/Category";
import Login from "./components/Login";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Langs from "./components/Langs";
import Translates from "./components/Translates";
import Translate from "./components/Translate";
import InsertTranslate from "./components/InsertTranslate";
import { isAdmin } from "./auth"; // Path to the isAdmin function
import { get_gd } from "./api";
import NavBar from "./Navbar";

function App() {
  const storedAccessToken = localStorage.getItem("access_token");
  const storedRefreshToken = localStorage.getItem("refresh_token");
  const storedGD = JSON.parse(localStorage.getItem("general_declaration"));
  // const storedTranslations = JSON.parse(localStorage.getItem("translations"));

  const [accessToken, setAccessToken] = useState(storedAccessToken || "");
  const [refreshToken, setRefreshToken] = useState(storedRefreshToken || "");
  const [langID, setLangID] = useState(null);
  const [generalDeclaration, setGeneralDeclaration] = useState(
    storedGD || null
  );

  // Fetch GD API when app loads
  useEffect(() => {
    const fetchGD = async () => {
      try {
        const filters = {};
        if (langID) {
          filters["lang_id"] = langID;
        }
        get_gd(filters).then((value) => {
          setGeneralDeclaration(value);
          localStorage.setItem("general_declaration", JSON.stringify(value)); // Save GD in localStorage
          localStorage.setItem(
            "translations",
            JSON.stringify(value.translations)
          );
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (!generalDeclaration) {
      fetchGD();
    }
  }, [generalDeclaration]);

  const handleLangChange = async (newLangId) => {
    try {
      get_gd({ lang_id: newLangId }).then((value) => {
        setGeneralDeclaration(value);
        setLangID(newLangId);
        localStorage.setItem("general_declaration", JSON.stringify(value)); // Save GD in localStorage
        localStorage.setItem(
          "translations",
          JSON.stringify(value.translations)
        );
      });
    } catch (error) {
      console.error(
        "Error fetching general declaration for new language:",
        error
      );
    }
  };

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
        <>
          <NavBar
            onLangChange={handleLangChange}
            generalDeclaration={generalDeclaration}
          />
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
              {isAdmin(accessToken) && (
                <Route
                  path="/translate"
                  element={
                    <InsertTranslate
                      setAccessToken={setAccessToken}
                      setRefreshToken={setRefreshToken}
                    />
                  }
                />
              )}
              {isAdmin(accessToken) && (
                <Route
                  path="/translate/:id"
                  element={
                    <Translate
                      setAccessToken={setAccessToken}
                      setRefreshToken={setRefreshToken}
                    />
                  }
                />
              )}
              {isAdmin(accessToken) && (
                <Route
                  path="/langs"
                  element={
                    <Langs
                      setAccessToken={setAccessToken}
                      setRefreshToken={setRefreshToken}
                    />
                  }
                />
              )}
              {isAdmin(accessToken) && (
                <Route
                  path="/translates"
                  element={
                    <Translates
                      setAccessToken={setAccessToken}
                      setRefreshToken={setRefreshToken}
                    />
                  }
                />
              )}
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
        </>
      )}
    </>
  );
}

export default App;
