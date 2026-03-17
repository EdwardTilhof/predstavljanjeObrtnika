import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap"; 
import { Link } from "react-router-dom";
import { COMPANY_NAME, ROUTES } from "../../constants";

export default function NavBar({ theme, toggleTheme }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={ROUTES.home} style={{ cursor: "pointer" }}>
          {COMPANY_NAME}
        </Navbar.Brand>

        <div className="d-flex align-items-center">
          <Button
            variant="link"
            onClick={toggleTheme}
            className="me-2 text-decoration-none p-0 shadow-none" 
            style={{ fontSize: '1.2rem', color: 'inherit' }} 
            >
            {theme === 'light' ? '🌙' : '☀️'} 
          </Button>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={ROUTES.home}>
              Home page
            </Nav.Link>

            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={ROUTES.services}>
                Services
              </NavDropdown.Item>

              <NavDropdown.Divider />

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