// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import SideBar from "./Sidebar";
import Profile from "./components/Profile";
import Insights from "./components/Insights";

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

  useEffect(() => {
    const fetchGD = async () => {
      try {
        const filters = {};
        if (langID) {
          filters["lang_id"] = langID;
        }
        get_gd(filters).then((value) => {
          setGeneralDeclaration(value);
          localStorage.setItem("general_declaration", JSON.stringify(value));
          localStorage.setItem(
            "translations",
            JSON.stringify(value.translations)
          );
          localStorage.setItem("lang_id", value.lang_id);
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (!generalDeclaration) {
      fetchGD();
    }
  }, [generalDeclaration]);

  const handleLogout = () => {
    localStorage.clear();

    setAccessToken("");
    setRefreshToken("");
    // Optionally redirect to the login page or perform any other actions needed
  };
  const handleLangChange = async (newLangId) => {
    try {
      get_gd({ lang_id: newLangId }).then((value) => {
        setGeneralDeclaration(value);
        setLangID(newLangId);
        localStorage.setItem("general_declaration", JSON.stringify(value));
        localStorage.setItem(
          "translations",
          JSON.stringify(value.translations)
        );
        localStorage.setItem("lang_id", value.lang_id);
      });
    } catch (error) {
      console.error(
        "Error fetching general declaration for new language:",
        error
      );
    }
  };

  return (
    <BrowserRouter>
      {" "}
      {/* Use a single BrowserRouter to wrap everything */}
      {!accessToken ? (
        <Routes>
          <Route
            path="/"
            element={
              <Login
                setAccessToken={setAccessToken}
                setRefreshToken={setRefreshToken}
                onLangChange={handleLangChange}
              />
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <>
          <div style={{ display: "flex" }}>
            <SideBar
              onLangChange={handleLangChange}
              generalDeclaration={generalDeclaration}
              onLogout={handleLogout}
            />
            <div style={{ flex: 1, padding: "20px", marginLeft: "80px" }}>
              <Routes>
                <Route
                  path="/profile"
                  element={
                    <Profile
                      onLangChange={handleLangChange}
                      setAccessToken={setAccessToken}
                      setRefreshToken={setRefreshToken}
                    />
                  }
                />

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
                  path="/insights"
                  element={
                    <Insights
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
            </div>
          </div>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
