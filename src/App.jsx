import React, { useState, Suspense, useEffect } from "react";
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './colorsAndDesign/OurProjects.css';

import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { DataSourceProvider } from "./dataSource/DataSourceContext";
import NavBarMain from './crossPageComponents/navBar/NavBarMain';
import AboutUsFooter from "./crossPageComponents/footers/AboutUsFooter";
import { ROUTES } from "./Constants";

//Home page
import Home from "./pages/Home";

// Our Projects imports
import OurProjectsMain from "./pages/relateToServices/OurProjectsMain";
import ProjectGallery from "./pages/relateToServices/ProjectGallery";

// Partner related imports
import CooperatingPartnersMain from "./pages/relateToPartners/CooperatingPartnersMain";
import AddPartnerPage from "./pages/relateToPartners/addPartnerPage";
import EditPartnerPage from "./pages/relateToPartners/editPartnerPage";

// Data editor imports
import DataEditor from "./pages/DataEditor";
import RegionManager from "../src/components/partners/RegionManager";
import CategoryManager from "../src/components/partners/CategoryManager";

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
      <Container className={`MainContainer ${isDevelopment ? 'dev-mode' : ''}`} fluid>
        <NavBarMain theme={theme} toggleTheme={toggleTheme} />

        <main>
          <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              
              {/* Our Projects Route */}
              <Route path={ROUTES.OUR_PROJECTS} element={<OurProjectsMain />} />
              <Route path={ROUTES.PROJECT_GALLERY} element={<ProjectGallery />} />
              {/* Added Partner Routes */}
              <Route path={ROUTES.CooperatingPartners} element={<CooperatingPartnersMain />} />
              <Route path={ROUTES.newCooperatingPartner} element={<AddPartnerPage />} />
              <Route path={ROUTES.changeCooperatingPartner} element={<EditPartnerPage />} />

              {/* Data Editor Route */}
              <Route path={ROUTES.dataEditor} element={<DataEditor />} />
              <Route path={ROUTES.regionEditor} element={<RegionManager />} />
              <Route path={ROUTES.categoryEditor} element={<CategoryManager />} />
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