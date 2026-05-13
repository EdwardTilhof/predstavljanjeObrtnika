import { Link } from "react-router-dom";
import { 
  COMPANY_NAME, 
  COMPANY_ADDRESS, 
  COMPANY_WORKING_HOURS, 
  COMPANY_CID, 
  COMPANY_PHONE, 
  COMPANY_EMAIL, 
  CURRENT_YEAR, 
  ROUTES
} from "../../constants";
import { Nav } from "react-bootstrap";
import "../../pages/aboutUs/AboutUs"

export default function AboutUsFooter() {
  return (
    <footer className="site-footer mt-5 pb-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
        <div className="footer-left">
          <h5>{COMPANY_NAME}</h5>
          <p className="mb-1">{COMPANY_ADDRESS}</p>
          <p className="text-muted">Working time: {COMPANY_WORKING_HOURS}</p>
          <p className="mb-1">Company CID: {COMPANY_CID}</p>
        </div>

        <div className="footer-right text-md-end">
          <h5><Nav.Link as={Link} to={ROUTES.CONTACT_US} 
          title="Contact us"
          className="dynamic-heading fw-bold mb-1">
            Contact
          </Nav.Link></h5>
          <p className="mb-1">Phone: {COMPANY_PHONE}</p>
          <p>
            Email: <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
          </p>
        </div>
      </div>

      <div className="text-center mt-4 border-top pt-3">
        <small className="text-secondary">
          &copy; {CURRENT_YEAR} {COMPANY_NAME}. All rights reserved.
        </small>
      </div>
    </footer>
  );
}