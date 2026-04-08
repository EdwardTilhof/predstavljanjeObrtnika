import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";


// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import './components/colorSchemes/ColorsStyle.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);