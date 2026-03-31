import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import './components/colorSchemes/ColorsStyle.css';

import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import {
  COMPANY_NAME, ROUTES,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_WORKING_HOURS,
  CURRENT_YEAR,
  COMPANY_CID
} from "./constants";
import ServicesMain from "./pages/Services-Main";
import { NewService } from './components/Services/NewService';
import OurProjectsMain from './pages/OurProjectsMain';
import ChangeService from './components/Services/ChangeService';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ContactUs from './pages/ContactUs';

function App() {

  const isDevelopment =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Container className={`MainContainer ${isDevelopment ? 'dev-mode' : ''}`} fluid>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.services} element={<ServicesMain />} />
          <Route path={ROUTES.newService} element={<NewService />} />
          <Route path="/changeService/:id" element={<ChangeService />} />
          <Route path={ROUTES.ourProjects} element={<OurProjectsMain />} />
          <Route path={ROUTES.contactUs} element={<ContactUs />} />

        </Routes>
      </main>

      <hr />

      <footer className="site-footer mt-5 pb-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">

          <div className="footer-left">
            <h5>{COMPANY_NAME}</h5>
            <p className="mb-1">{COMPANY_ADDRESS}</p>
            <p className="text-muted">Working time: {COMPANY_WORKING_HOURS}</p>
            <p className="mb-1">Company CID: {COMPANY_CID}</p>
          </div>

          <div className="footer-right text-md-end">
            <h5>Contact</h5>
            <p className="mb-1">Phone: {COMPANY_PHONE}</p>
            <p>Email: <a href={`Mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a></p>
          </div>

        </div>

        {/* Full width copyright at the bottom */}
        <div className="text-center mt-4 border-top pt-3">
          <small className="text-secondary">
            &copy; {CURRENT_YEAR} {COMPANY_NAME}. All rights reserved.
          </small>
        </div>
      </footer>
    </Container>
  );
}

export default App;