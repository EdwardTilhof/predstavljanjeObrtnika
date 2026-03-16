import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'

import NavBar from "./pages/components/NavBar"
import Home from "./pages/Home"
import { BRAND_NAME, NAV_LINKS, ROUTES } from "./constants";
import ServicesMain from "./pages/components/Services/Services-Main"

function App() {
  return (
    <Container>
      <NavBar />

      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.services} element={<ServicesMain />} />
      </Routes>

      <hr />

      <footer>
        &copy; {BRAND_NAME} YEAR. All rights reserved.
      </footer>
    </Container>
  );
}

export default App;