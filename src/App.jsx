import React, { useState, Suspense, useEffect } from "react";
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './colorsAndDesign/OurProjects.css';
import './colorsAndDesign/ColorsStyle.css';
import './crossPageComponents/datePicker/DatePickerStyle.css'

import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { DataSourceProvider } from "./dataSource/DataSourceContext";
import NavBarMain from './crossPageComponents/navBar/NavBarMain';
import AboutUsFooter from "./crossPageComponents/footers/AboutUsFooter";
import { ROUTES } from "./constants";

//Home page
import Home from "./pages/Home";

// Our Projects imports
import OurProjectsMain from "./pages/relateToServices/OurProjectsMain";
import ProjectGallery from "./pages/relateToServices/ProjectGallery";

// Partner related imports
import CooperatingPartnersMain from "./pages/relateToPartners/CooperatingPartnersMain";
import AddPartnerPage from "./pages/relateToPartners/addPartnerPage";
import EditPartnerPage from "./pages/relateToPartners/editPartnerPage";

// Advertisements
import PartnersAdv from "./components/homePage/advertisement/PartnersAdv";
import IndividualPartnerAdv from "./pages/relateToAdv/IndividualPartnerAdv"

// Data editor imports
import DataEditor from "./pages/DataEditor";
import RegionManager from "../dataRepository/locations/RegionManager";
import CategoryManager from "../src/components/partners/CategoryManager";
import AdminPage from "./pages/relateToAuth/AdminPage";
import LoginPage from "./pages/relateToAuth/LoginPage";
import RegistrationPage from "./pages/relateToAuth/RegisterPage";
import { ROLE_RANKS } from "./Permissions/PermissonsConst";
import RoleCheck from "./Permissions/RoleCheck";


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

  const userRole = localStorage.getItem('user_role') || 'GUEST';
  const isAdmin = ROLE_RANKS[userRole] >= ROLE_RANKS.ADMIN;

  return (
    <DataSourceProvider>
      <Container className={`MainContainer ${isDevelopment ? 'dev-mode' : ''}`} fluid>
        <NavBarMain theme={theme} toggleTheme={toggleTheme} />

        <main>
          <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
            <Routes>
              {/* Public Routes ("GUEST") */}
              <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.PartnerDetailsAdv} element={<IndividualPartnerAdv />} />
              // Our projects
              <Route path={ROUTES.OUR_PROJECTS} element={<OurProjectsMain />} />
              <Route path={ROUTES.PROJECT_GALLERY} element={<ProjectGallery />} />
              
              // Partners
              <Route path={ROUTES.CooperatingPartners} element={<CooperatingPartnersMain />} />
              <Route path= {ROUTES.PartnersAdv} element={<PartnersAdv/>}/>

              // Authentication 
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />

              {/* Moderator Routes */}
              
              // Partner editors
              <Route
                path={ROUTES.newCooperatingPartner}
                element={<RoleCheck minRole="MODERATOR"><AddPartnerPage /></RoleCheck>}
              />
              <Route
                path={ROUTES.EditPartner}
                element={<RoleCheck minRole="MODERATOR"><EditPartnerPage /></RoleCheck>}
              />
             
              // Data editors
              <Route
                path={ROUTES.dataEditor}
                element={<RoleCheck minRole="MODERATOR"><DataEditor /></RoleCheck>}
              />
              <Route
                path={ROUTES.regionEditor}
                element={<RoleCheck minRole="MODERATOR"><RegionManager /></RoleCheck>}
              />
              <Route
                path={ROUTES.categoryEditor}
                element={<RoleCheck minRole="MODERATOR"><CategoryManager /></RoleCheck>}
              />

              {/* Admin Route (Strict ADMIN rank) */}
              <Route
                path={ROUTES.ADMIN}
                element={isAdmin ? <AdminPage /> : <LoginPage />}
              />
            </Routes>
          </Suspense>
        </main>

        <hr />
        <AboutUsFooter />
      </Container>
    </DataSourceProvider>
  );
}

export default App;