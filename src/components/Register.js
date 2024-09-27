// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { register } from "../api";
// import "../css/login.css";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
// const navigate = useNavigate();

// const handleRegister = async () => {
//   try {
//     const response = await register(username, password);
//     console.log(response.data);
//     navigate("/");
//   } catch (error) {
//     console.error(error);
//   }
// };

//   return (
//     <div className="login">
//       <div className="login_page">
//         <div className="login_header">Expense Tracker</div>
//         <div className="login_body">
//           <h2> Register </h2>
//           <form id="loginForm" className="form">
//             <div className="login_body_input">
//               <input
//                 placeholder="Username"
//                 className="login_input"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div className="login_body_input">
//               <input
//                 placeholder="Password"
//                 className="login_input"
//                 id="pass"
//                 type="password"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="login_buttom">
//               <button
//                 type="submit"
//                 className="btn btn-outline-secondary"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleRegister();
//                 }}
//               >
//                 Login
//               </button>
//             </div>
//           </form>

//           <div id="notregistered">
//             Already registered?&nbsp;
//             <span>
//               <Link to="/" id="forRegister">
//                 click here
//               </Link>
//               &nbsp;to Login.
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

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
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
              <p className="text-white-50 mb-5">
                Please enter username and password!
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
                  handleRegister();
                }}
              >
                Register
              </button>
              <div>
                <p className="mb-0">
                  Already have an account?{" "}
                  <Link to="/" class="text-white-50 fw-bold">
                    click here
                  </Link>
                  &nbsp;to Login.
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
