import { CooperatingPartnersData } from "./CooperatingPartnersData/CooperatingPartnersData";

let partners = [...CooperatingPartnersData];

async function getCooperatingPartners() {
    return { success: true, data: [...partners] };
}

async function getById(id) {
    const partner = partners.find(p => p.id === parseInt(id));
    return { success: true, data: partner };
}

async function create(partner) {
    const nextId = partners.length > 0 ? Math.max(...partners.map(p => p.id)) + 1 : 1;
    const newPartner = { ...partner, id: nextId };
    partners.push(newPartner);
    return { success: true, data: newPartner };
}

async function update(id, partner) {
    const index = partners.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        partners[index] = { ...partners[index], ...partner };
        return { success: true, data: partners[index] };
    }
    return { success: false, error: "Not found" };
}

async function remove(id) {
    const index = partners.findIndex(p => p.id === parseInt(id));
    if (index > -1) {
        partners.splice(index, 1);
        return { success: true };
    }
    return { success: false };
}

export default { getCooperatingPartners, getById, create, update, remove };