
import { dataProvider } from '../dataRepository';

export const DATA_KEYS = {
    PARTNERS: 'e13.partners',
    REGIONS: 'e13.regions',
    CATEGORIES: 'e13.categories',
    PROJECTS: 'e13.projects',
    USERS: 'e13.users',
    QUESTIONS: 'e13.questions',
    GALLERY: 'e13.galleryItems',
};

const dataFacade = {
    // Partners
    getPartners: () => dataProvider.getAll(DATA_KEYS.PARTNERS),
    getPartnerById: (id) => dataProvider.getById(DATA_KEYS.PARTNERS, id),
    addPartner: (partner) => dataProvider.add(DATA_KEYS.PARTNERS, partner),
    updatePartner: (id, partner) => dataProvider.update(DATA_KEYS.PARTNERS, id, partner),
    deletePartner: (id) => dataProvider.remove(DATA_KEYS.PARTNERS, id),

    // Regions
    getRegions: () => dataProvider.getAll(DATA_KEYS.REGIONS),
    addRegion: (region) => dataProvider.add(DATA_KEYS.REGIONS, region),
    updateRegion: (id, region) => dataProvider.update(DATA_KEYS.REGIONS, id, region),
    deleteRegion: (id) => dataProvider.remove(DATA_KEYS.REGIONS, id),

    // Categories
    getCategories: () => dataProvider.getAll(DATA_KEYS.CATEGORIES),
    addCategory: (category) => dataProvider.add(DATA_KEYS.CATEGORIES, category),
    updateCategory: (id, category) => dataProvider.update(DATA_KEYS.CATEGORIES, id, category),
    deleteCategory: (id) => dataProvider.remove(DATA_KEYS.CATEGORIES, id),

    // Projects
    getProjects: () => dataProvider.getAll(DATA_KEYS.PROJECTS),
    getProjectById: (id) => dataProvider.getById(DATA_KEYS.PROJECTS, id),
    addProject: (project) => dataProvider.add(DATA_KEYS.PROJECTS, project),
    updateProject: (id, project) => dataProvider.update(DATA_KEYS.PROJECTS, id, project),
    deleteProject: (id) => dataProvider.remove(DATA_KEYS.PROJECTS, id),

    // Gallery (dynamic key per project)
    getGallery: async (projectId) => {
        const allImages = await dataProvider.getAll(DATA_KEYS.GALLERY);
        return allImages.filter(img => String(img.projectId) === String(projectId));
    },
    addGalleryImage: async (projectId, image) => {
        const imageWithProjectId = { ...image, projectId: String(projectId) };
        return dataProvider.add(DATA_KEYS.GALLERY, imageWithProjectId);
    },
    updateGalleryImage: async (projectId, imageId, image) => {
        const imageWithProjectId = { ...image, projectId: String(projectId) };
        return dataProvider.update(DATA_KEYS.GALLERY, imageId, imageWithProjectId);
    },
    deleteGalleryImage: (projectId, imageId) => {
        return dataProvider.remove(DATA_KEYS.GALLERY, imageId);
    },

    // Users
    getUsers: () => dataProvider.getAll(DATA_KEYS.USERS),
    getUserByUsername: (username) => dataProvider.getAll(DATA_KEYS.USERS).then(users => users.find(u => u.username === username)),
    addUser: (user) => dataProvider.add(DATA_KEYS.USERS, user),
    updateUser: (id, user) => dataProvider.update(DATA_KEYS.USERS, id, user),
    deleteUser: (id) => dataProvider.remove(DATA_KEYS.USERS, id),

    // Contact Us
    getQuestions: () => dataProvider.getAll(DATA_KEYS.QUESTIONS),
    addQuestion: (question) => dataProvider.add(DATA_KEYS.QUESTIONS, question),
    updateQuestion: (id, question) => dataProvider.update(DATA_KEYS.QUESTIONS, id, question),
    deleteQuestion: (id) => dataProvider.remove(DATA_KEYS.QUESTIONS, id),
};

export default dataFacade;