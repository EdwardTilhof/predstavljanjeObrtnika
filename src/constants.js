// company information
export const COMPANY_NAME = "Your Company name";
export const COMPANY_PHONE = "+385 xx xxx xxx";
export const COMPANY_EMAIL = "somethig@yourdomain.com";
export const COMPANY_ADDRESS = "Your company address, city, country";
export const COMPANY_WORKING_HOURS = "Monday - Friday: 9:00 AM - 5:00 PM";

// date and time formats
export const CURRENT_YEAR = new Date().getFullYear();

export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services/services-main",
  contact: "/contact",
  newService: "/new-service",
  ourProjects: "/ourProjects"
};

export const NAV_LINKS = [
  { label: "Home", path: ROUTES.home },
  { label: "About", path: ROUTES.about },
  { label: "Services", path: ROUTES.services },
  { label: "Contact", path: ROUTES.contact },
  { label: "Add Service", path: ROUTES.newService },
  { label: "Our Projects", path: ROUTES.ourProjects }
];

