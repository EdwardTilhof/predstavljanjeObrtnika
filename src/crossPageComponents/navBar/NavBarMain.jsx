import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { COMPANY_NAME, ROUTES } from '../../Constants';

function NavBarMain({ theme, toggleTheme }) {
  // Fix 1: Define the missing variable
  const GITHUB_URL_VET = "https://github.com/EdwardTilhof";

  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-navbar-padding">
      <Container className="bg-body-tertiary custom-navbar-container py-2">
        <Navbar.Brand as={Link} to={ROUTES.HOME} style={{ cursor: "pointer" }}>
          {COMPANY_NAME}
        </Navbar.Brand>

        <div className="d-flex align-items-center order-lg-3">
          {/* THEME TOGGLE */}
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
          <Nav className="me-auto align-items-center">
            {/* Standard Links */}
            <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.OUR_PROJECTS}>Our Projects</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.dataEditor}>Add or edit data
            </Nav.Link>

            {/* Partners Dropdown */}
            <NavDropdown
              title="Partners"
              id="partners-nav-dropdown"
              className="justify-content-center"
            >
              <NavDropdown.Item as={Link} to={ROUTES.CooperatingPartners}
                className="fw-normal centered-dropdown-item text-center">
                Overview
              </NavDropdown.Item>

            </NavDropdown>

            <Nav.Link
              href={GITHUB_URL_VET}
              target="_blank"
              rel="noopener noreferrer"
              className="fw-bold"
            >
              GitHub
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarMain;