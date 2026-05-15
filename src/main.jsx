import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// CSS imports - Centralized for better performance
import 'bootstrap/dist/css/bootstrap.min.css'; // Framework first
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap icons
import './index.css'; // Global resets
import './App.css'; // Layout
import './colorsAndDesign/ColorsStyle.css'; // Custom colors
import './colorsAndDesign/OurProjects.css'; // Projects styling
import './crossPageComponents/datePicker/DatePickerStyle.css'; // Date picker styling

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />  
  </BrowserRouter>
);