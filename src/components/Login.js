import React, { useState } from "react";
import { login } from "../api";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function Login({ setAccessToken, setRefreshToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your username and password!
              </p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="username"
                id="formControlLg"
                type="email"
                size="lg"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="formControlLg"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                size="lg"
              />

              <button
                className="btn btn-outline-light mx-2 px-5"
                color="light"
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                Login
              </button>
              <div>
                <p className="mb-0">
                  Don't have an account?{" "}
                  <Link to="/register" class="text-white-50 fw-bold">
                    click here
                  </Link>
                  &nbsp;to Register.
                  {/* <a href="#!" class="text-white-50 fw-bold">
                    Sign Up
                  </a> */}
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
