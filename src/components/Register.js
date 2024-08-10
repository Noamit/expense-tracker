import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { register } from "../api";
import "../css/login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await register(username, password);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <div className="login_page">
        <div className="login_header">Expense Tracker</div>
        <div className="login_body">
          <h2> Register </h2>
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
                  handleRegister();
                }}
              >
                Login
              </button>
            </div>
          </form>

          <div id="notregistered">
            Already registered?&nbsp;
            <span>
              <Link to="/" id="forRegister">
                click here
              </Link>
              &nbsp;to Login.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
