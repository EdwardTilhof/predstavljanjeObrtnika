// company information
export const COMPANY_NAME = "Your Company name";
export const COMPANY_PHONE = "+385 xx xxx xxx";
export const COMPANY_EMAIL = "somethig@yourdomain.com";
export const COMPANY_ADDRESS = "Your company address, city, country";
export const COMPANY_WORKING_HOURS = "Monday - Friday: 9:00 AM - 5:00 PM";
export const COMPANY_CID = "xxxx-xxxx-xxxx"

// date and time formats
export const CURRENT_YEAR = new Date().getFullYear();

export const ROUTES = {
  home: "/",
  about: "/about",
  CooperatingPartners: "/CooperatingPartners/CooperatingPartners-main",
  contact: "/contact",
  newCooperatingPartner: "/new-CooperatingPartner",
  ourProjects: "/ourProjects",
  changeCooperatingPartner: "/changeCooperatingPartner",
  contactUs: "/contactUs",
  login: "/login",
  register: "/register"
};

export const NAV_LINKS = [
  { label: "Home", path: ROUTES.home },
  { label: "About", path: ROUTES.about },
  { label: "CooperatingPartners", path: ROUTES.CooperatingPartners },
  { label: "Contact", path: ROUTES.contact },
  { label: "Add CooperatingPartner", path: ROUTES.newCooperatingPartner },
  { label: "Our Projects", path: ROUTES.ourProjects },
  { label: "Change CooperatingPartner", path: ROUTES.changeCooperatingPartner },
  { label: "Contact Us", path: ROUTES.contactUs },
  { label: "Login", path: ROUTES.login },
  { label: "Register", path: ROUTES.register }
];

