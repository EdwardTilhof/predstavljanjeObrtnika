// company information
export const COMPANY_NAME = "Real estate for real";
export const COMPANY_PHONE = "+385 99 245 406";
export const COMPANY_EMAIL = "somethig@yourdomain.com";
export const COMPANY_ADDRESS = "Ul. Republike 158, Osijek, Croatia 31000";
export const COMPANY_WORKING_HOURS = "Monday - Friday: 9:00 AM - 5:00 PM";
export const COMPANY_CID = "2592-3559-1504";

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
    EditPartner: "/partners/edit/:id",

    // Partner advertisement 
    PartnersAdv: "/partnersAdv/:id",
    PartnerDetailsAdv: "/partners/detail/:id",

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
    { name: "PartnersAdvertisement", path: ROUTES.PartnersAdv },
    { name: "Data Editor", path: ROUTES.dataEditor },
    { name: "Admin", path: ROUTES.ADMIN },
    { name: "Login", path: ROUTES.LOGIN },
    { name: "Registration", path: ROUTES.REGISTRATION }
];
export const DATA_SOURCE = 'localStorage';
// export const DATA_SOURCE = 'memory';