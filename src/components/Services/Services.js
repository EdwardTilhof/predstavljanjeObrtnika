import { servicesData } from "./ServicesData";

async function getServices() {
    return { data: servicesData };
}

async function getById(id) {
    // FIX: Changed 'data' to 'servicesData'
    const service = servicesData.find(s => s.id === parseInt(id));
    return { data: service };
}

async function create(newService) {
    servicesData.push(newService);
    console.log("Service created in source:", newService);
    return { success: true, data: newService };
}

async function update(id, updatedService) {
    const numericId = parseInt(id);
    const index = servicesData.findIndex(s => s.id === numericId);
    
    if (index !== -1) {
        servicesData[index] = { ...servicesData[index], ...updatedService };
        return { success: true, data: servicesData[index] };
    }
    return { success: false, error: "Service not found" };
}

async function remove(id) {
    const numericId = parseInt(id);
    // FIX: Changed 'data' to 'servicesData'
    const index = servicesData.findIndex(s => s.id === numericId);

    if (index !== -1) {
        servicesData.splice(index, 1);
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