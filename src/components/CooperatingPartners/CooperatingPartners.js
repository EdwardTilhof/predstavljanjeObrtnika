import CooperatingPartnersLocalStorage from "./CooperatingPartnersLocalStorage";
import CooperatingPartnersMemory from "./CooperatingPartnersMemory";

const getService = (source) => {
  return source === 'localStorage' ? CooperatingPartnersLocalStorage : CooperatingPartnersMemory;
};

const CooperatingPartnerLogic = {
  getAll: async (source) => {
    const data = await getService(source).getCooperatingPartners();
    return { success: true, data: data || [] };
  },
  getCooperatingPartners: async (source) => {
    const data = await getService(source).getCooperatingPartners();
    return { success: true, data: data || [] };
  },
 getById: async (id, source, partners) => {
    if (source === 'memory') {
        const result = await CooperatingPartnersMemory.getById(id, partners);
        return result; 
    }
    
    try {
        const response = await getService(source).getById(id);
        return { 
            success: true, 
            data: response.data?.data || response.data || response 
        };
    } catch (error) {
        return { success: false, data: null };
    }
},
  create: async (p, source) => {
    const result = await getService(source).create(p);
    return { success: true, data: result };
  }, update: async (id, p, source) => {
    const result = await getService(source).update(id, p);
    return { success: true, data: result };
  }, remove: async (id, source) => {
    const result = await getService(source).remove(id);
    return { success: true, data: result };
  }
};

export default CooperatingPartnerLogic;