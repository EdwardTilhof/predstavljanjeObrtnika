import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { COMPANY_NAME, ROUTES } from "../constants";

export default function NavBar({ theme, toggleTheme }) {
  return (
    <Navbar
      expand="lg"
      variant={theme === 'dark' ? 'dark' : 'light'}
      className="bg-body-tertiary shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to={ROUTES.home} style={{ cursor: "pointer" }}>
          {COMPANY_NAME}
        </Navbar.Brand>

        <div className="d-flex align-items-center order-lg-last">
          <Button
            variant="link"
            onClick={toggleTheme}
            className="me-2 text-decoration-none p-0 shadow-none"
            style={{ fontSize: '1.2rem', color: 'inherit' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
          {/* LogIn and register buttons*/}
          <Button
            as={Link}
            to={ROUTES.login}
            className="me-2 d-none d-sm-block btn-theme-outline"
          >
            Log In
          </Button>

          <Button
            as={Link}
            to={ROUTES.register}
            className="d-none d-sm-block btn-theme-solid"
          >
            Register
          </Button>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2 border-0">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={ROUTES.home}>Home</Nav.Link>

            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={ROUTES.CooperatingPartners}>Cooperating Partners</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={ROUTES.contactUs}>Contact us</NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item as={Link} to={ROUTES.login} className="d-sm-none">Log In</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={ROUTES.register} className="d-sm-none">Register</NavDropdown.Item>

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