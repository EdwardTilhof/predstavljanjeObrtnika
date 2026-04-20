import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { COMPANY_NAME, ROUTES } from '../../Constants';
// Import Clerk hooks and components
import { useUser, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

function NavBarMain({ theme, toggleTheme }) {
  const GITHUB_URL_VET = "https://github.com/EdwardTilhof";

  const { user, isLoaded } = useUser(); // Added isLoaded

  // 1. ADD THE DEV CHECK HERE
  const isDevAdmin = localStorage.getItem("dev_admin") === "true";

  // 2. UPDATE THE LOGIC to include isDevAdmin
  const userRole = user?.publicMetadata?.role;
  const isAdmin = isDevAdmin || userRole === "admin";
  const isEditor = isDevAdmin || userRole === "editor" || userRole === "admin";

  const handleDevLogin = () => {
    const pass = prompt("Enter Dev Password:");
    if (pass === "0000") {
      localStorage.setItem("dev_admin", "true");
      alert("Dev Admin Mode Active!");
      window.location.reload();
    } else {
      localStorage.removeItem("dev_admin");
      alert("Dev Mode Disabled.");
      window.location.reload();
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-navbar-padding">
      <Container className="bg-body-tertiary custom-navbar-container py-2">
        {/* Trigger dev login by clicking the Brand name */}
        <Navbar.Brand onClick={handleDevLogin} style={{ cursor: "pointer" }}>
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

          {/* CLERK USER BUTTON (Shows when logged in) */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* LOGIN BUTTON (Shows when logged out) */}
          <SignedOut>
            <Button as={Link} to={ROUTES.LOGIN} variant="outline-primary" size="sm" className="ms-2">
              Login
            </Button>
          </SignedOut>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.OUR_PROJECTS}>Our Projects</Nav.Link>

            {/* Now this will show if isDevAdmin is true */}
            {isEditor && (
              <>
                <Nav.Link as={Link} to={ROUTES.dataEditor}>Add or edit data</Nav.Link>
                <NavDropdown title="Partners" id="partners-nav-dropdown">
                  <NavDropdown.Item as={Link} to={ROUTES.CooperatingPartners} className="text-center">
                    Overview
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {/* Admin Only Link */}
            {isAdmin && (
              <Nav.Link as={Link} to={ROUTES.ADMIN} className="text-danger fw-bold">
                Admin Panel
              </Nav.Link>
            )}

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