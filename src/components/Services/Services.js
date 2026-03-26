import { servicesData } from "./ServicesData";

let data = [...servicesData];

async function getServices() {
return { data: [...data] };
}

async function getById(id) {
    const service = data.find(s => s.id === parseInt(id));
    return { data: service };
}

async function update(id, updatedService) {
    const index = data.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedService };
        console.log("Service updated:", data[index]);
        return { success: true, data: data[index] };
    }
    return { success: false, error: "Service not found" };
}

async function remove(id) {
    const numericId = parseInt(id);
    const index = data.findIndex(s => s.id === numericId);

    if (index !== -1) {
        data.splice(index, 1);
        console.log(`Deleted ID: ${numericId}. Remaining:`, data.length);
        return { success: true };
    }
    return { success: false, error: "Service not found" };
}

export default {
    getServices,
    getById,
    update,
    remove
};