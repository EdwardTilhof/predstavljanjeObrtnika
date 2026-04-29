// src/dataRepository/localStorage/localStorageProvider.js

const getItems = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Error getting items from localStorage for key "${key}":`, error);
        return [];
    }
};

const saveItems = (key, items) => {
    try {
        localStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
        console.error(`Error saving items to localStorage for key "${key}":`, error);
    }
};

const localStorageProvider = {
    // Generic CRUD operations
    getAll: (key) => {
        return Promise.resolve(getItems(key));
    },

    getById: (key, id) => {
        const items = getItems(key);
        return Promise.resolve(items.find(item => String(item.id) === String(id)));
    },

    add: (key, newItem) => {
        const items = getItems(key);
        const itemToAdd = { ...newItem, id: newItem.id || Date.now().toString() }; // Simple ID generation
        items.push(itemToAdd);
        saveItems(key, items);
        return Promise.resolve(itemToAdd);
    },

    update: (key, id, updatedItem) => {
        let items = getItems(key);
        items = items.map(item => (String(item.id) === String(id) ? { ...item, ...updatedItem } : item));
        saveItems(key, items);
        return Promise.resolve(updatedItem);
    },

    remove: (key, id) => {
        let items = getItems(key);
        items = items.filter(item => String(item.id) !== String(id));
        saveItems(key, items);
        return Promise.resolve();
    },
};

export default localStorageProvider;