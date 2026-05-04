import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { COMPANY_NAME, ROUTES } from '../../Constants';
import { logout } from "../../Permissions/AuthService";
import { ROLE_RANKS } from "../../Permissions/PermissonsConst";

function NavBarMain({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const GITHUB_URL_VET = "https://github.com/EdwardTilhof";

  // Get current user info from localStorage
  const currentRole = localStorage.getItem('user_role') || 'GUEST';
  const userName = localStorage.getItem('user_name') || 'Guest';

  const userRank = ROLE_RANKS ? (ROLE_RANKS[currentRole] || 0) : 0;
  const requiredRank = ROLE_RANKS ? (ROLE_RANKS.USER || 2) : 2;

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };



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

          {/* AUTH SECTION */}
          {currentRole === 'GUEST' ? (
            <Button as={Link} to={ROUTES.LOGIN} variant="outline-primary" size="sm" className="me-2">
              Login
            </Button>
          ) : (
            <NavDropdown title={`Hi, ${userName}`} id="user-dropdown" align="end">
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto mt-3 mt-lg-0 gap-4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, max-content)",
              alignItems: "center"
            }}
          >
            <Nav.Link as={Link} to={ROUTES.HOME} title="Home">
              <i className="bi bi-house-door fs-5"></i>
            </Nav.Link>

            <Nav.Link as={Link} to={ROUTES.OUR_PROJECTS} title="Our Projects">
              <i className="bi bi-briefcase fs-5"></i>
            </Nav.Link>

            <Nav.Link as={Link} to={ROUTES.CONTACT_US} title="Contact Us">
              <i className="bi bi-envelope fs-5"></i>
            </Nav.Link>

            <NavDropdown
              title={<i className="bi bi-people fs-5" title="Partners"></i>}
              id="partners-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to={ROUTES.CooperatingPartners} className="text-center">
                Overview
              </NavDropdown.Item>
            </NavDropdown>

            {userRank >= requiredRank && (
              <Nav.Link as={Link} to={ROUTES.USER_PROFILE} title="Your Profile">
                <i className="bi bi-person-circle fs-5"></i>
              </Nav.Link>
            )}

            {userRank >= ROLE_RANKS.MODERATOR && (
              <Nav.Link as={Link} to={ROUTES.dataEditor} title="Add or edit data">
                <i className="bi bi-database-gear fs-5"></i>
              </Nav.Link>
            )}

            {userRank >= ROLE_RANKS.ADMIN && (
              <Nav.Link as={Link} to="/admin" className="text-danger" title="Admin Page">
                <i className="bi bi-shield-lock-fill fs-5"></i>
              </Nav.Link>
            )}



            <Nav.Link
              href={GITHUB_URL_VET}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <i className="bi bi-github fs-5"></i>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarMain;