import React, { useState } from "react";
import { login } from "../api";
import { Link } from "react-router-dom";
import "../css/login.css";

function Login({ setAccessToken, setRefreshToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      console.log(response.data);
      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <div className="login_page">
        <div className="login_header">Expense Tracker</div>
        <div className="login_body">
          <h2> Login </h2>
          <form id="loginForm" className="form">
            <div className="login_body_input">
              <input
                placeholder="Username"
                className="login_input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login_body_input">
              <input
                placeholder="Password"
                className="login_input"
                id="pass"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="login_buttom">
              <button
                type="submit"
                className="btn btn-outline-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                Login
              </button>
            </div>
          </form>

          <div id="notregistered">
            Not registered?&nbsp;
            <span>
              <Link to="/register" id="forRegister">
                click here
              </Link>
              &nbsp;to Register.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
