import { servicesData } from "./ServicesData";
import { mainCategories } from "./ServicesMainCategoriesData";

async function getServices() {
    return { data: servicesData };
}

async function getCategories() {
    return { data: mainCategories };
}

export default {
    getServices,
    getCategories
};