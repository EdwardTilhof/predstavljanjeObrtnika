import { Container, Navbar, Nav, NavDropdown, Button, Form, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { COMPANY_NAME, ROUTES } from "../constants";
import { useDataSource } from "../DataSource/DataSourceContext";

export default function NavBar({ theme, toggleTheme }) {
  const { dataSource, setDataSource, currentUser, logoutUser } = useDataSource();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate(ROUTES.home);
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={ROUTES.home} style={{ cursor: "pointer" }}>
          {COMPANY_NAME}
        </Navbar.Brand>

        <div className="d-flex align-items-center order-lg-3">

          {/* 1. STORAGE SWITCHER */}
          <Stack direction="horizontal" gap={2} className="me-2 border-end pe-2">
            <span className="small fw-bold text-muted" style={{ fontSize: '0.6rem' }}>D Base:</span>
            <Form.Check
              type="radio" label="Mem" name="st" id="n-m"
              checked={dataSource === 'memory'}
              onChange={() => setDataSource('memory')}
              style={{ fontSize: '0.7rem' }}
            />
            <Form.Check
              type="radio" label="Local" name="st" id="n-l"
              checked={dataSource === 'localStorage'}
              onChange={() => setDataSource('localStorage')}
              style={{ fontSize: '0.7rem' }}
            />
          </Stack>

          {/* 2. USER SECTION */}
          <div className="d-flex align-items-center me-2">
            {currentUser ? (
              <Stack direction="horizontal" gap={2}>
                <span className="fw-bold text-primary small d-flex align-items-center">
                  <Button as={Link} to={ROUTES.userProfile}
                    variant="primary"
                    size="sm"
                    className="bi bi-person-circle me-1">
                  </Button>
                  <span className="d-none d-sm-inline">{currentUser.username}</span>
                </span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                  style={{ fontSize: '0.65rem', padding: '2px 5px' }}
                >
                  Logout
                </Button>
              </Stack>
            ) : (
              <Button as={Link} to={ROUTES.login} variant="primary" size="sm" className="fw-bold">
                Login
              </Button>
            )}
          </div>

          {/* 3. THEME TOGGLE */}
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

        {/* 4. COLLAPSIBLE MENU */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Nav.Link as={Link} to={ROUTES.home}>Home page</Nav.Link>
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={ROUTES.cooperatingPartersCategoyChange}>CooperatingPartners category edit</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={ROUTES.addNewRegions}>Add new regions</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={ROUTES.CooperatingPartners}>CooperatingPartners</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={ROUTES.contactUs}>Contact us</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Vjezbanje" id="vjezbanje-nav-dropdown">
              <NavDropdown.Item href="/vjezba01/index.html" target="_blank" rel="noopener noreferrer">Vjezba 01</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://github.com/EdwardTilhof" target="_blank" rel="noopener noreferrer">GitHub</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}