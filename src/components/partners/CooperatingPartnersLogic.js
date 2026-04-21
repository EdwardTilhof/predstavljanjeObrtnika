import { createUniqueId } from "../../../dataRepository/UUIDGenerator";
import { DATA_SOURCE } from "../../Constants";
import { MOCK_PARTNERS_DATA } from "../../../dataRepository/partnersData/PartnersDataGen";

const STORAGE_KEY = 'my_app_CooperatingPartners';

const _getLocalData = () => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
        console.log(`[Data Origin] Pulling from LocalStorage (Key: ${STORAGE_KEY})`);
        return JSON.parse(saved);
    } else {
        console.log("[Data Origin] LocalStorage is empty. Pulling from MOCK_PARTNERS_DATA fallback.");
        return (MOCK_PARTNERS_DATA?.default || []);
    }
};

const CooperatingPartnerLogic = {
    getAll: async (source = DATA_SOURCE) => {
        console.log(`[Logic Call] getAll requested via source: ${source}`);

        const data = source === 'memory'
            ? (MOCK_PARTNERS_DATA?.default || [])
            : _getLocalData();

        return { success: true, data: data };
    },
    getById: async (id, source = DATA_SOURCE, partners = []) => {
        const list = source === 'memory' ? partners : _getLocalData();
        const found = list.find(p => String(p.id) === String(id));
        return { success: !!found, data: found };
    },

    create: async (partnerData, source = DATA_SOURCE) => {
        const newPartner = { ...partnerData, id: createUniqueId('partner') };
        if (source === 'localStorage') {
            const data = _getLocalData();
            data.push(newPartner);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
        return { success: true, data: newPartner };
    },

    update: async (id, updatedFields, source = DATA_SOURCE) => {
        const list = _getLocalData();
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

    remove: async (id, source = DATA_SOURCE) => {
        const data = _getLocalData().filter(p => String(p.id) !== String(id));
        if (source === 'localStorage') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
        return { success: true, data: data };
    }
};

export default CooperatingPartnerLogic;