import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BRAND_NAME, ROUTES } from "../../constants";

export default function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Brand Name acting as a Home Link */}
        <Navbar.Brand as={Link} to={ROUTES.home} style={{ cursor: "pointer" }}>
          {BRAND_NAME}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            {/* Main Home Link */}
            <Nav.Link as={Link} to={ROUTES.home}>
              Home page
            </Nav.Link>

            <NavDropdown title="Menu" id="basic-nav-dropdown">
              
              {/* Services Dropdown Link */}
              <NavDropdown.Item as={Link} to={ROUTES.services}>
                Services
              </NavDropdown.Item>

              <NavDropdown.Divider />

              {/* External Link (for testing and show.) */}
              <NavDropdown.Item
                href="https://github.com/EdwardTilhof"
                target="_blank"
                rel="noopener noreferrer"
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