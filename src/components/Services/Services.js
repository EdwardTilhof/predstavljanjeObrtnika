import { servicesData as initialData } from "./ServicesData";
import { STORAGE_KEY } from "../../constants";

const _getRawData = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        return initialData;
    }
    return JSON.parse(saved);
};

const _saveRawData = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

async function getServices() {
    return { data: _getRawData() };
}

async function getById(id) {
    const data = _getRawData();
    const service = data.find(s => s.id === parseInt(id));
    return { data: service };
}

async function create(newService) {
    const data = _getRawData();
    data.push(newService);
    _saveRawData(data);
    return { success: true, data: newService };
}

async function update(id, updatedService) {
    const data = _getRawData();
    const numericId = parseInt(id);
    const index = data.findIndex(s => s.id === numericId);
    
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedService };
        _saveRawData(data);
        return { success: true, data: data[index] };
    }
    return { success: false, error: "Service not found" };
}

async function remove(id) {
    const data = _getRawData();
    const numericId = parseInt(id);
    const filtered = data.filter(s => s.id !== numericId);
    
    if (filtered.length !== data.length) {
        _saveRawData(filtered);
        return { success: true };
    }
    return { success: false, error: "Service not found" };
}

export default {
    getServices,
    getById,
    update,
    remove,
    create
};