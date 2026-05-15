import React, { useState, Suspense, useEffect } from "react";
import dataFacade, { DATA_KEYS } from './services/dataFacade';
import bcrypt from 'bcryptjs';

// --- DATA GENERATOR IMPORTS ---
import { PROJECT_CARD_DATA } from "../dataRepository/serviceData/ProjectCardData";
import { MOCK_GALLERY_DATA, GALLERY_MAP_NAME } from "../dataRepository/serviceData/ProjectGalleryDataGen";
import { generateGalleryItems } from "../dataRepository/serviceData/ProjectGalleryDataGen"
import { mainCategories } from "../dataRepository/partnersData/PartnersData";
import { MOCK_PARTNERS_DATA } from "../dataRepository/partnersData/PartnersDataGen";
import { regions as defaultRegions } from "../dataRepository/locations/RegionsData";

import { Container, Spinner, Alert } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import NavBarMain from './crossPageComponents/navBar/NavBarMain';
import AboutUsFooter from "./crossPageComponents/footers/AboutUsFooter";
import { ROUTES } from "./constants";

// Lazy load all pages for code splitting (Performance optimization)
const Home = React.lazy(() => import("./pages/Home"));
const AboutUs = React.lazy(() => import("./pages/aboutUs/AboutUs"));
const ContactUs = React.lazy(() => import("./pages/contactUs/ContactUs"));
const OurProjectsMain = React.lazy(() => import("./pages/relateToServices/OurProjectsMain"));
const ProjectGallery = React.lazy(() => import("./pages/relateToServices/ProjectGallery"));
const CooperatingPartnersMain = React.lazy(() => import("./pages/relateToPartners/CooperatingPartnersMain"));
const AddPartnerPage = React.lazy(() => import("./pages/relateToPartners/addPartnerPage"));
const EditPartnerPage = React.lazy(() => import("./pages/relateToPartners/editPartnerPage"));
const PartnersAdv = React.lazy(() => import("./components/homePage/advertisement/PartnersAdv"));
const IndividualPartnerAdv = React.lazy(() => import("./pages/relateToAdv/IndividualPartnerAdv"));
const DataEditor = React.lazy(() => import("./pages/DataEditor"));
const RegionManager = React.lazy(() => import("../dataRepository/locations/RegionManager"));
const CategoryManager = React.lazy(() => import("./components/partners/CategoryManager"));
const AdminPage = React.lazy(() => import("./pages/relateToAuth/AdminPage"));
const LoginPage = React.lazy(() => import("./pages/relateToAuth/LoginPage"));
const RegistrationPage = React.lazy(() => import("./pages/relateToAuth/RegisterPage"));
const UserProfile = React.lazy(() => import("./pages/usersPages/UserProfile"));

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
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-bs-theme", theme);
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Error setting theme:", error);
      if (isDevelopment) {
        setInitError("Failed to set theme. localStorage may be unavailable.");
      }
    }
  }, [theme, isDevelopment]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const userRole = localStorage.getItem('user_role') || 'GUEST';
  const isAdmin = (ROLE_RANKS[userRole] || 0) >= (ROLE_RANKS.ADMIN || 3);

  useEffect(() => {
    const initializeData = async () => {
      try {
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
            password: bcrypt.hashSync('0000', 10),
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

        const projects = await dataFacade.getProjects();
        if (projects.length === 0) {
          for (const project of PROJECT_CARD_DATA) {
            await dataFacade.addProject(project);

            const images = generateGalleryItems(10); 
            
            for (const image of images) {
              await dataFacade.addGalleryImage(project.id, image);
            }
          }
        }
        setIsInitializing(false);
      } catch (error) {
        console.error("Failed to initialize application data:", error);
        setInitError(
          `Application initialization failed: ${error.message || 'Unknown error'}. Please refresh the page.`
        );
        setIsInitializing(false);
      }
    };
    initializeData();
  }, []);

  return (
    <>
      <Container className={`MainContainer ${isDevelopment ? 'dev-mode' : ''}`} fluid>
        <NavBarMain theme={theme} toggleTheme={toggleTheme} />

        <main role="main">
          {initError && (
            <Alert variant="danger" onClose={() => setInitError(null)} dismissible>
              <Alert.Heading>Error Loading Application</Alert.Heading>
              <p>{initError}</p>
            </Alert>
          )}
          
          {isInitializing ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
              <div className="text-center">
                <Spinner animation="border" variant="primary" role="status" aria-live="polite">
                  <span className="visually-hidden">Initializing application...</span>
                </Spinner>
                <p className="mt-3">Loading application...</p>
              </div>
            </div>
          ) : (
            <Suspense fallback={
              <div className="text-center mt-5">
                <Spinner animation="border" variant="primary" role="status" aria-live="polite">
                  <span className="visually-hidden">Loading page...</span>
                </Spinner>
                <p className="mt-3">Loading page...</p>
              </div>
            }>
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
                <Route path={ROUTES.PartnersAdv} element={<PartnersAdv />} />

                {/* Authentication */}
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />

                {/* User Routes */}
                <Route
                  path={ROUTES.USER_PROFILE}
                  element={<RoleCheck minRole="USER"><UserProfile /></RoleCheck>}
                />

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