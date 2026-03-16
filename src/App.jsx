import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'

import NavBar from "./pages/components/NavBar"
import Home from "./pages/Home"
import {
  BRAND_NAME, ROUTES,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_WORKING_HOURS,
  CURRENT_YEAR
} from "./constants";
import ServicesMain from "./pages/components/Services/Services-Main"

function App() {
  return (
    <Container className='MainContainer'>
      <NavBar />

      <main>
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.services} element={<ServicesMain />} />
        </Routes>
      </main>

      <hr />

     <footer className="site-footer mt-5 pb-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
          
          <div className="footer-left">
            <h5>{BRAND_NAME}</h5>
            <p className="mb-1">{COMPANY_ADDRESS}</p>
            <p className="text-muted">Working time: {COMPANY_WORKING_HOURS}</p>
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
            &copy; {CURRENT_YEAR} {BRAND_NAME}. All rights reserved.
          </small>
        </div>
      </footer>
    </Container>
  );
}

export default App;