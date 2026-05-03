import React, { useState, Suspense, useEffect } from "react";
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './colorsAndDesign/OurProjects.css';
import './colorsAndDesign/ColorsStyle.css';
import './crossPageComponents/datePicker/DatePickerStyle.css'
import dataFacade, { DATA_KEYS } from './services/dataFacade';

// --- DATA GENERATOR IMPORTS ---
import { PROJECT_CARD_DATA } from "../dataRepository/serviceData/ProjectCardData";
import { MOCK_GALLERY_DATA } from "../dataRepository/serviceData/ProjectGalleryDataGen";
import { mainCategories } from "../dataRepository/partnersData/PartnersData"; 
import { MOCK_PARTNERS_DATA } from "../dataRepository/partnersData/PartnersDataGen"; 
import { regions as defaultRegions } from "../dataRepository/locations/RegionsData";

import { Container, Spinner } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import NavBarMain from './crossPageComponents/navBar/NavBarMain';
import AboutUsFooter from "./crossPageComponents/footers/AboutUsFooter";
import { ROUTES } from "./constants";

//Home page and about us
import Home from "./pages/Home";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contactUs/ContactUs";

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
import CategoryManager from "./components/partners/CategoryManager";
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
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const userRole = localStorage.getItem('user_role') || 'GUEST';
  const isAdmin = (ROLE_RANKS[userRole] || 0) >= (ROLE_RANKS.ADMIN || 3);

  // Database Seeder
  useEffect(() => {
    const initializeData = async () => {
      const categories = await dataFacade.getCategories();
      if (categories.length === 0) {
        for (const cat of mainCategories) {
          await dataFacade.addCategory(cat);
        }
      }

      const regions = await dataFacade.getRegions();
      if (regions.length === 0) {
        for (const reg of defaultRegions) {
          await dataFacade.addRegion(reg);
        }
      }

      const users = await dataFacade.getUsers();
      if (users.length === 0) {
        await dataFacade.addUser({
          id: 'admin-user',
          username: 'admin',
          password: btoa('0000'), // Hash the password
          role: 'ADMIN',
        });
      }

      const partners = await dataFacade.getPartners();
      if (partners.length === 0) {
        const generatedPartners = MOCK_PARTNERS_DATA.default;
        if (typeof generatedPartners !== 'undefined') {
          for (const partner of generatedPartners) {
            await dataFacade.addPartner(partner);
          }
        }
      }

      // 4. Seed Projects
      const projects = await dataFacade.getProjects();
      if (projects.length === 0) {
        for (const project of PROJECT_CARD_DATA) {
          await dataFacade.addProject(project);
          
          // 5. Seed Gallery Images for this project (50 per project)
          const images = MOCK_GALLERY_DATA[project.id] || MOCK_GALLERY_DATA["default"] || [];
          for (const image of images) {
            await dataFacade.addGalleryImage(project.id, image);
          }
        }
      }
      setIsInitializing(false);
    };
    initializeData();
  }, []);

  return (
    <>
      <Container className={`MainContainer ${isDevelopment ? 'dev-mode' : ''}`} fluid>
        <NavBarMain theme={theme} toggleTheme={toggleTheme} />

        <main>
          {isInitializing ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
          <Suspense fallback={<div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>}>
            <Routes>
              {/* Public Routes ("GUEST") */}
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.ABOUTUS} element={<AboutUs />} />
              <Route path={ROUTES.CONTACT_US} element={<ContactUs />} />
            <Route path={ROUTES.PartnerDetailsAdv} element={<IndividualPartnerAdv />} />
              {/* Our projects */}
              <Route path={ROUTES.OUR_PROJECTS} element={<OurProjectsMain />} />
              <Route path={ROUTES.PROJECT_GALLERY} element={<ProjectGallery />} />
              
              {/* Partners */}
              <Route path={ROUTES.CooperatingPartners} element={<CooperatingPartnersMain />} />
              <Route path= {ROUTES.PartnersAdv} element={<PartnersAdv/>}/>

              {/* Authentication */}
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />

              {/* Moderator Routes */}
              
              {/* Partner editors */}
              <Route
                path={ROUTES.newCooperatingPartner}
                element={<RoleCheck minRole="MODERATOR"><AddPartnerPage /></RoleCheck>}
              />
              <Route
                path={ROUTES.EditPartner}
                element={<RoleCheck minRole="MODERATOR"><EditPartnerPage /></RoleCheck>}
              />
             
              {/* Data editors */}
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
          )}
        </main>

        <hr />
        <AboutUsFooter />
      </Container>
    </>
  );
}

export default App;