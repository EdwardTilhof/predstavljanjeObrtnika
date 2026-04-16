import React, { useState, useEffect, Suspense, lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import './components/colorSchemes/ColorsStyle.css';
import { useDataSource, DataSourceProvider } from "./DataSource/DataSourceContext";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import {
  COMPANY_NAME, ROUTES,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_WORKING_HOURS,
  CURRENT_YEAR,
  COMPANY_CID
} from "./constants";
import CooperatingPartnersMain from "./pages/CooperatingPartnersMain";
import { NewCooperatingPartner } from './components/CooperatingPartners/NewCooperatingPartner';
import CooperatingPartnersCategoryChange from './pages/CooperatingPartnersCategoryChange';
import ChangeCooperatingPartner from './components/CooperatingPartners/ChangeCooperatingPartner';
import OurProjectsMain from './pages/OurProjectsMain';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ContactUs from './pages/ContactUsMain';
import LogInPage from './UserData/LogInComponent';
import RegistrationPage from './UserData/RegistrationComponent';
import UserProfileMain from './pages/UserProfileMain';

/* data generator for mock data */
import { mainCategories } from './components/CooperatingPartners/CooperatingPartnersData/CooperatingPartnersMainCategoriesData';
import { CooperatingPartnersData } from './components/CooperatingPartners/CooperatingPartnersData/CooperatingPartnersData';
import { generateMockPartners } from './DataSource/dataGenerator';

/* Regions add imports */
const RegionsCategoryAdd = lazy(() => import('./pages/RegionsCategoryAdd'));


function DataInitializer() {
  const { partners, setPartners, dataSource } = useDataSource(); // Removed setDataSource

  useEffect(() => {
    if (dataSource === 'memory' && partners.length === 0) {
      console.log("Injecting fresh mock data...");
      const fullData = generateMockPartners(CooperatingPartnersData, mainCategories, 15);
      setPartners(fullData);
    }
  }, [dataSource, partners.length, setPartners]); 

  return null;
}

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
    <DataSourceProvider>
      <DataInitializer />
      
      <Container className={`MainContainer ${isDevelopment ? 'dev-mode' : ''}`} fluid>
        <NavBar theme={theme} toggleTheme={toggleTheme} />
        
        <main>
          <Suspense fallback={<div className="text-center mt-5">Loading Page...</div>}>
            <Routes>
              <Route path={ROUTES.home} element={<Home />} />
              <Route path={ROUTES.CooperatingPartners} element={<CooperatingPartnersMain />} />
              <Route path={ROUTES.newCooperatingPartner} element={<NewCooperatingPartner />} />
              <Route path={ROUTES.changeCooperatingPartner} element={<ChangeCooperatingPartner />} />
              <Route path={ROUTES.ourProjects} element={<OurProjectsMain />} />
              <Route path={ROUTES.contactUs} element={<ContactUs />} />
              <Route path={ROUTES.login} element={<LogInPage />} />
              <Route path={ROUTES.registration} element={<RegistrationPage />} />
              <Route path={ROUTES.userProfile} element={<UserProfileMain />} />
              <Route path={ROUTES.cooperatingPartersCategoyChange} element={<CooperatingPartnersCategoryChange />} />
              <Route path={ROUTES.addNewRegions} element={<RegionsCategoryAdd />} />
            </Routes>
          </Suspense>
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
              <p>Email: <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a></p>
            </div>
          </div>

          <div className="text-center mt-4 border-top pt-3">
            <small className="text-secondary">
              &copy; {CURRENT_YEAR} {COMPANY_NAME}. All rights reserved.
            </small>
          </div>
        </footer>
      </Container>
    </DataSourceProvider>
  );
}

export default App;