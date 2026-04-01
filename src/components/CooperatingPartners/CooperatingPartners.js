import { CooperatingPartnersData as initialData } from "./CooperatingPartnersData";
import { STORAGE_KEY } from "../../constants";

const _getRawData = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
        const emptyArray = [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyArray));
        return initialData;
    }
    return JSON.parse(saved);
};

const _saveRawData = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

async function getCooperatingPartners() {
    return { data: _getRawData() };
}

async function getById(id) {
    const data = _getRawData();
    const CooperatingPartner = data.find(s => s.id === parseInt(id));
    return { data: CooperatingPartner };
}

async function create(newCooperatingPartner) {
    const data = _getRawData();
    const nextId = data.length > 0 ? Math.max(...data.map(s => s.id)) + 1 : 1;
    const CooperatingPartnerWithId = { ...newCooperatingPartner, id: nextId };
    
    data.push(CooperatingPartnerWithId);
    _saveRawData(data);
    return { success: true, data: CooperatingPartnerWithId };
}

async function update(id, updatedCooperatingPartner) {
    const data = _getRawData();
    const numericId = parseInt(id);
    const index = data.findIndex(s => s.id === numericId);
    
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedCooperatingPartner };
        _saveRawData(data);
        return { success: true, data: data[index] };
    }
    return { success: false, error: "CooperatingPartner not found" };
}

async function remove(id) {
    const data = _getRawData();
    const numericId = parseInt(id);
    const filtered = data.filter(s => s.id !== numericId);
    
    if (filtered.length !== data.length) {
        _saveRawData(filtered);
        return { success: true };
    }
    return { success: false, error: "CooperatingPartner not found" };
}

export default {
    getCooperatingPartners, 
    getById,
    update,
    remove,
    create
};