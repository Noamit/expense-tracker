import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./css/navbar.css";
import { isAdmin } from "./auth"; // Path to the isAdmin function

function NavBar() {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/category">Categories</Nav.Link>
          {isAdmin(accessToken) && <Nav.Link href="/langs">Langs</Nav.Link>}
          {isAdmin(accessToken) && (
            <Nav.Link href="/translates">Translates</Nav.Link>
          )}
          {/* <Nav.Link href="/study">Study Area</Nav.Link>
          <Nav.Link href="/games">Games Area</Nav.Link> */}
        </Nav>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Navbar.Text onClick={() => localStorage.clear()}>
            <Nav.Link href="/">Logout</Nav.Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
