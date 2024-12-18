// Sidebar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import {
  FaList,
  FaUser,
  FaCog,
  FaHome,
  FaGlobe,
  FaBook,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";

import { isAdmin } from "./auth"; // Path to the isAdmin function

function SideBar({ onLangChange, generalDeclaration, onLogout }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const storedGD = localStorage.getItem("general_declaration");
  const navigate = useNavigate();
  const parsedGD = storedGD ? JSON.parse(storedGD) : null;
  const langs = parsedGD ? parsedGD.langs : {};
  return (
    <div style={styles.sidebar}>
      <Link to="/" style={styles.link}>
        <div style={styles.iconContainer}>
          <FaHome style={styles.icon} />
          <span>Home</span>
        </div>
      </Link>

      <Link to="/insights" style={styles.link}>
        <div style={styles.iconContainer}>
          <FaChartLine style={styles.icon} />
          <span>Insights</span>
        </div>
      </Link>
      <Link to="/category" style={styles.link}>
        <div style={styles.iconContainer}>
          <FaList style={styles.icon} />
          <span>Categories</span>
        </div>
      </Link>
      {isAdmin(accessToken) && (
        <Link to="/langs" style={styles.link}>
          <div style={styles.iconContainer}>
            <FaGlobe style={styles.icon} />
            <span>Langs</span>
          </div>
        </Link>
      )}
      {isAdmin(accessToken) && (
        <Link to="/translates" style={styles.link}>
          <div style={styles.iconContainer}>
            <FaBook style={styles.icon} />
            <span>Translates</span>
          </div>
        </Link>
      )}
      {/* 
      <div style={styles.iconContainer}>
        <FaCog style={styles.icon} />
        <span>Settings</span>
      </div> */}
      <Link to="/profile" style={styles.link}>
        <div style={styles.iconContainer}>
          <FaUser style={styles.icon} />
          <span>Profile</span>
        </div>
      </Link>
      <div
        style={styles.iconContainer}
        onClick={() => {
          navigate("/");
          onLogout();
        }}
      >
        <FaSignOutAlt style={styles.icon} />
        <span style={styles.link}>Logout</span>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    height: "100vh",
    width: "80px",
    backgroundColor: "#000000",
    color: "#ecf0f1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 0",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
    cursor: "pointer",
  },
  icon: {
    fontSize: "24px",
    marginBottom: "5px",
  },
  link: {
    textDecoration: "none",
    color: "#ecf0f1",
  },
};

export default SideBar;
