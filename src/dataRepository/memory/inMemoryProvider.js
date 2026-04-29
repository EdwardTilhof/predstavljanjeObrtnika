// src/dataRepository/memory/inMemoryProvider.js

// A simple in-memory store
const inMemoryStore = {};

const inMemoryProvider = {
    // Generic CRUD operations
    getAll: (key) => {
        inMemoryStore[key] = inMemoryStore[key] || [];
        return Promise.resolve([...inMemoryStore[key]]);
    },

    getById: (key, id) => {
        inMemoryStore[key] = inMemoryStore[key] || [];
        return Promise.resolve(inMemoryStore[key].find(item => String(item.id) === String(id)));
    },

    add: (key, newItem) => {
        inMemoryStore[key] = inMemoryStore[key] || [];
        const itemToAdd = { ...newItem, id: newItem.id || Date.now().toString() }; // Simple ID generation
        inMemoryStore[key].push(itemToAdd);
        return Promise.resolve(itemToAdd);
    },

    update: (key, id, updatedItem) => {
        inMemoryStore[key] = inMemoryStore[key] || [];
        inMemoryStore[key] = inMemoryStore[key].map(item => (String(item.id) === String(id) ? { ...item, ...updatedItem } : item));
        return Promise.resolve(updatedItem);
    },

    remove: (key, id) => {
        inMemoryStore[key] = inMemoryStore[key] || [];
        inMemoryStore[key] = inMemoryStore[key].filter(item => String(item.id) !== String(id));
        return Promise.resolve();
    },
};

export default inMemoryProvider;