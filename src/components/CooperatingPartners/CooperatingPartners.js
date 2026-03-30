import { CooperatingPartnersData } from "./CooperatingPartnersData";

let data = [...CooperatingPartnersData];

async function getCooperatingPartners() {
return { data: [...data] };
}

async function getById(id) {
    const CooperatingPartner = data.find(s => s.id === parseInt(id));
    return { data: CooperatingPartner };
}

async function update(id, updatedCooperatingPartner) {
    const index = data.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedCooperatingPartner };
        console.log("CooperatingPartner updated:", data[index]);
        return { success: true, data: data[index] };
    }
    return { success: false, error: "CooperatingPartner not found" };
}

async function remove(id) {
    const numericId = parseInt(id);
    const index = data.findIndex(s => s.id === numericId);

    if (index !== -1) {
        data.splice(index, 1);
        console.log(`Deleted ID: ${numericId}. Remaining:`, data.length);
        return { success: true };
    }
    return { success: false, error: "CooperatingPartner not found" };
}

export default {
    getCooperatingPartners,
    getById,
    update,
    remove
};