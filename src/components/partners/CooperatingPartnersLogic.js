import { createUniqueId } from "../../../dataRepository/UUIDGenerator";
import { CooperatingPartnersData } from "../../../dataRepository/partnersData/PartnersData";
import { DATA_SOURCE } from "../../Constants";

const STORAGE_KEY = 'my_app_CooperatingPartners'; 

const _getLocalData = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : CooperatingPartnersData; 
};

const CooperatingPartnerLogic = {
    getAll: async (source = DATA_SOURCE) => {
        if (source === 'memory') {
            return { success: true, data: [...CooperatingPartnersData] };
        }
        return { success: true, data: _getLocalData() };
    },

    getById: async (id, source = DATA_SOURCE, partners = []) => {
        const list = source === 'memory' ? partners : _getLocalData();
        const found = list.find(p => String(p.id) === String(id));
        return { success: !!found, data: found };
    },

    create: async (partnerData, source = DATA_SOURCE) => {
        const newPartner = { 
            ...partnerData, 
            id: createUniqueId('partner') 
        };

        if (source === 'localStorage') {
            const data = _getLocalData();
            data.push(newPartner);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
        return { success: true, data: newPartner };
    },

    update: async (id, updatedFields, source = DATA_SOURCE, currentPartners = []) => {
        const list = source === 'memory' ? [...currentPartners] : _getLocalData();
        const index = list.findIndex(p => String(p.id) === String(id));

        if (index !== -1) {
            list[index] = { ...list[index], ...updatedFields };
            if (source === 'localStorage') {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
            }
            return { success: true, data: list };
        }
        return { success: false, error: "Partner not found" };
    },

    remove: async (id, source = DATA_SOURCE, currentPartners = []) => {
        if (source === 'memory') {
            const filtered = currentPartners.filter(p => String(p.id) !== String(id));
            return { success: true, data: filtered };
        } else {
            const data = _getLocalData().filter(p => String(p.id) !== String(id));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return { success: true, data };
        }
    }
};

export default CooperatingPartnerLogic;