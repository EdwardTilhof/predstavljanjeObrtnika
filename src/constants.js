// company information
export const COMPANY_NAME = "Your Company name";
export const COMPANY_PHONE = "+385 xx xxx xxx";
export const COMPANY_EMAIL = "somethig@yourdomain.com";
export const COMPANY_ADDRESS = "Your company address, city, country";
export const COMPANY_WORKING_HOURS = "Monday - Friday: 9:00 AM - 5:00 PM";
export const COMPANY_CID = "xxxx-xxxx-xxxx";

// date and time formats
export const CURRENT_YEAR = new Date().getFullYear();

// placeholder for cards
export const PLACEHOLDER_IMAGE = "https://placehold.co/120x240";

export const ROUTES = {
    HOME: "/",
    ABOUT: "/about",
    // routes related to services
    OUR_PROJECTS: "/ourProjects",
    PROJECT_GALLERY: "/ourProjects/gallery/:id",
    // Partner Routes
    CooperatingPartners: "/partners",
    newCooperatingPartner: "/partners/new",
    changeCooperatingPartner: "/partners/edit/:id",

    // Data Editor and other routes dependant of the editor
    dataEditor: "/dataEditor",
    regionEditor: "/dataEditor/regions",
    categoryEditor: "/dataEditor/categories",

    // Authentication and Admin routes
    LOGIN: "/login",
    REGISTRATION: "/register",
    ADMIN: "/admin",
};

export const NAV_LINKS = [
    { name: "Home", path: ROUTES.HOME },
    { name: "About", path: ROUTES.ABOUT },
    { name: "Our Projects", path: ROUTES.OUR_PROJECTS },
    { name: "Partners", path: ROUTES.CooperatingPartners },
    { name: "Data Editor", path: ROUTES.dataEditor },
    { name: "Admin", path: ROUTES.admin },
    { name: "Login", path: ROUTES.login },
    { name: "Registration", path: ROUTES.registration }
];

export const DATA_SOURCE = 'localStorage';
// export const DATA_SOURCE = 'memory';