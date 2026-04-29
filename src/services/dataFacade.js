// src/services/dataFacade.js

import { dataProvider } from '../dataRepository';

// Define keys for different data entities
export const DATA_KEYS = {
    PARTNERS: 'partners',
    REGIONS: 'regions',
    CATEGORIES: 'categories',
    PROJECTS: 'projects',
    USERS: 'users', // New: Key for user data
    // Add other data keys as needed
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
    getGallery: (projectId) => dataProvider.getAll(`gallery_${projectId}`),
    addGalleryImage: (projectId, image) => dataProvider.add(`gallery_${projectId}`, image),
    updateGalleryImage: (projectId, imageId, image) => dataProvider.update(`gallery_${projectId}`, imageId, image),
    deleteGalleryImage: (projectId, imageId) => dataProvider.remove(`gallery_${projectId}`, imageId),

    // Users
    getUsers: () => dataProvider.getAll(DATA_KEYS.USERS),
    getUserByUsername: (username) => dataProvider.getAll(DATA_KEYS.USERS).then(users => users.find(u => u.username === username)),
    addUser: (user) => dataProvider.add(DATA_KEYS.USERS, user),
    updateUser: (id, user) => dataProvider.update(DATA_KEYS.USERS, id, user),
    deleteUser: (id) => dataProvider.remove(DATA_KEYS.USERS, id),
};

export default dataFacade;