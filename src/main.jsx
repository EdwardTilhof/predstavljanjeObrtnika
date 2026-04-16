import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// src/main.jsx
import 'bootstrap/dist/css/bootstrap.min.css'; // 1. Framework first
import './index.css';                         // 2. Global resets
import './App.css';                           // 3. Layout
import './colorsAndDesign/ColorsStyle.css'; // 4. Custom colors (The winner)

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />  
  </BrowserRouter>
);