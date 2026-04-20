import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import 'bootstrap/dist/css/bootstrap.min.css'; // 1. Framework first
import './index.css';                         // 2. Global resets
import './App.css';                           // 3. Layout
import './colorsAndDesign/ColorsStyle.css'; // 4. Custom colors (The winner)

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter must be the top-most wrapper for useNavigate to work */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);