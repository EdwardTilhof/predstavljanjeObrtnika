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
  changeCooperatingPartner: "/changeCooperatingPartner/:id",
  contactUs: "/contactUs",
  vjezba01: "/vjezba01",
  login: "/login",
  registration: "/register",
  userProfile: "/userProfile",
  cooperatingPartersCategoyChange: "/cooperating-partners-category-change",
  addNewRegions: "/addNewRegions"
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
  { label: "Vjezba 01", path: ROUTES.vjezba01 },
  { label: "LogIn", path: ROUTES.login },
  { label: "Registration", path: ROUTES.registration },
  { label: "UserProfile", path: ROUTES.userProfile },
  { label: "Change Category", path: ROUTES.cooperatingPartersCategoyChange },
  { label: "Add Regions", path: ROUTES.addNewRegions }
];

// Data, Local storage

// export const DATA_SOURCE = 'localStorage';
export const DATA_SOURCE_TYPE = 'memory';