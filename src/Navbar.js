import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown"; // Import Dropdown for language selection

import "./css/navbar.css";
import { isAdmin } from "./auth"; // Path to the isAdmin function

function NavBar({ onLangChange, generalDeclaration }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const storedGD = localStorage.getItem("general_declaration");

  const parsedGD = storedGD ? JSON.parse(storedGD) : null;
  const langs = parsedGD ? parsedGD.langs : {};

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
        </Nav>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Language
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.entries(langs).map(([langId, langName]) => (
                  <Dropdown.Item
                    key={langId}
                    onClick={() => onLangChange(langId)}
                  >
                    {langName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <Navbar.Text onClick={() => localStorage.clear()}>
            <Nav.Link href="/">Logout</Nav.Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
