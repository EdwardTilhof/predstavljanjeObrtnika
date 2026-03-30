import { servicesData } from "./ServicesData";

async function getServices() {
return { data: [...servicesData] };
}

async function getById(id) {
    const service = servicesData.find(s => s.id === parseInt(id));
    return { data: service };
}

async function update(id, updatedService) {
    const index = servicesData.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
        servicesData[index] = { ...servicesData[index], ...updatedService };
        console.log("Service updated:", servicesData[index]);
        return { success: true, data: servicesData[index] };
    }
    return { success: false, error: "Service not found" };
}

async function remove(id) {
    const numericId = parseInt(id);
    const index = servicesData.findIndex(s => s.id === numericId);

    if (index !== -1) {
        servicesData.splice(index, 1);
        console.log(`Deleted ID: ${numericId}. Remaining:`, servicesData.length);
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