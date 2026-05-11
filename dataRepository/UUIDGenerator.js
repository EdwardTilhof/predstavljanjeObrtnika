import { v4 as uuidv4 } from 'uuid';

const existingIds = new Set();

const PREFIX_MAP = {

    // Main categories for partner types
    worksector: 'e.13wsector',

    // Specific Data Types
    region: 'e.13region',
    ourprojectscard: 'e.13oPCard',
    GalleryItem: 'e.13galleryitem',
};


const generateRawUUID = (category) => {
    const transformedCategory = category ? category.toLowerCase().replace(/\s/g, '') : 'gen';
    const prefix = PREFIX_MAP[transformedCategory] || 'gen';
    const uuid = uuidv4().replace(/-/g, '');
    return `${prefix}_${uuid}`;
};

export const createUniqueId = (category) => {
    let newId = generateRawUUID(category);

    let attempts = 0;
    while (existingIds.has(newId) && attempts < 100) {
        newId = generateRawUUID(category);
        attempts++;
    }

    existingIds.add(newId);
    return newId;
};


// import { createUniqueId } from './dataRepository/UUIDGenerator.js';

// const newRegionId = createUniqueId('region');
// const newProjectId = createUniqueId('ourprojectscard');

// console.log(newRegionId); // reg_...
// console.log(newProjectId); // oPCard_...