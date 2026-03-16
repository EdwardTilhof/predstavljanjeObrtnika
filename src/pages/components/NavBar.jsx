import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BRAND_NAME } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          {BRAND_NAME}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link onClick={() => navigate("/")}>
              Home page
            </Nav.Link>

            <NavDropdown title="Izbornik" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate("/services/services-main")}>
                Services
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                href="https://github.com/EdwardTilhof"
                target="_blank"
              >
                GitHub
              </NavDropdown.Item>

            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}