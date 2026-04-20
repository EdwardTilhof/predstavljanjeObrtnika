import React, { useState, Suspense, useEffect } from "react";
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './colorsAndDesign/OurProjects.css';
import './colorsAndDesign/ColorsStyle.css';

import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { DataSourceProvider } from "./dataSource/DataSourceContext";
import NavBarMain from './crossPageComponents/navBar/NavBarMain';
import AboutUsFooter from "./crossPageComponents/footers/AboutUsFooter";
import { ROUTES } from "./Constants";

// Clerk & Permissions
import ClerkConfig from "./permissions/ClerkConfig";
import ProtectedRoute from "./permissions/ProtectedRoute";
import ClerkLayout from "./permissions/ClerkLayout";

//Home page
import Home from "./pages/Home";
// Our Projects imports
import OurProjectsMain from "./pages/relateToProjects/OurProjectsMain";
import ProjectGallery from "./pages/relateToProjects/ProjectGallery";
// Partner related imports
import CooperatingPartnersMain from "./pages/relateToPartners/CooperatingPartnersMain";
import AddPartnerPage from "./pages/relateToPartners/addPartnerPage";
import EditPartnerPage from "./pages/relateToPartners/editPartnerPage";
// Data editor imports
import DataEditor from "./pages/DataEditor";
import RegionManager from "../src/components/partners/RegionManager";
import CategoryManager from "../src/components/partners/CategoryManager";
// User management imports
import LoginPage from "./pages/relateToRegLogIn/LoginPage";
import RegisterPage from "./pages/relateToRegLogIn/RegisterPage";
import AdminPage from "./pages/relateToRegLogIn/AdminPage";

function App() {
  const isDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <DataSourceProvider>
      <ClerkConfig>
      <Container fluid className={`MainContainer ${isDevelopment ? 'dev-mode' : ''}`}>
        <NavBarMain theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
              <Route path={ROUTES.OUR_PROJECTS} element={<OurProjectsMain />} />
              <Route path={ROUTES.PROJECT_GALLERY} element={<ProjectGallery />} />
              <Route path={ROUTES.CooperatingPartners} element={<CooperatingPartnersMain />} />

              {/* EDITOR & ADMIN ROUTES */}
              <Route path={ROUTES.newCooperatingPartner} element={
                <ProtectedRoute roleRequired="editor"><AddPartnerPage /></ProtectedRoute>
              } />
              <Route path={ROUTES.changeCooperatingPartner} element={
                <ProtectedRoute roleRequired="editor"><EditPartnerPage /></ProtectedRoute>
              } />
              <Route path={ROUTES.dataEditor} element={
                <ProtectedRoute roleRequired="editor"><DataEditor /></ProtectedRoute>
              } />

              {/* ADMIN ONLY ROUTE */}
              <Route path={ROUTES.ADMIN} element={
                <ProtectedRoute roleRequired="admin"><AdminPage /></ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </main>
        <AboutUsFooter />
      </Container>
      </ClerkConfig>
    </DataSourceProvider>
  );
}

export default App;