import { CooperatingPartnersData } from "./CooperatingPartnersData/CooperatingPartnersData";

let partners = [...CooperatingPartnersData];

async function getCooperatingPartners() {
    return { success: true, data: [...partners] };
}

export const CooperatingPartnersMemory = {
    getById: async (id, partners) => {
        if (!partners || !Array.isArray(partners)) {
            console.error("Memory Service: No partners array provided.");
            return { success: false, data: undefined };
        }

        const found = partners.find(p => String(p.id) === String(id));

        console.log(`Searching for ID: ${id} (Type: ${typeof id})`);
        console.log("Found:", found);

        return {
            success: !!found,
            data: found
        };
    }
};

async function create(partner) {
    const nextId = partners.length > 0 ? Math.max(...partners.map(p => p.id)) + 1 : 1;
    const newPartner = { ...partner, id: nextId };
    partners.push(newPartner);
    return { success: true, data: newPartner };
}

async function update(id, updatedFields, currentPartners) {
    const numericId = isNaN(id) ? id : parseInt(id);
    const index = currentPartners.findIndex(p => String(p.id) === String(id));
    
    if (index !== -1) {
        const newList = [...currentPartners];
        newList[index] = { ...newList[index], ...updatedFields };
        return { success: true, data: newList };
    }
    return { success: false, error: "Not found" };
}

async function remove(id, currentPartners) {
    const index = currentPartners.findIndex(p => String(p.id) === String(id));
    
    if (index > -1) {
        const newList = currentPartners.filter(p => String(p.id) !== String(id));
        return { success: true, data: newList };
    }
    return { success: false, error: "Partner not found" };
}

export default { 
    getCooperatingPartners, 
    getById: CooperatingPartnersMemory.getById, 
    create, 
    update, 
    remove 
};