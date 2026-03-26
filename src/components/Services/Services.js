import { servicesData } from "./ServicesData";
import { mainCategories } from "./ServicesMainCategoriesData";

async function getServices() {
    return { data: servicesData };
}

async function getById(id) {
    const service = servicesData.find(s => s.id === parseInt(id));
    return { data: service };
}

async function update(id, updatedService) {
    console.log("Updating service ID:", id, "with data:", updatedService);
    return { success: true };
}

export default {
    getServices,
    getById,
    update
};