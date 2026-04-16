import CooperatingPartnersLocalStorage from "./CooperatingPartnersLocalStorage";
import CooperatingPartnersMemory from "./CooperatingPartnersMemory";

const getService = (source) => {
  // Logic is now strictly tied to the string passed from Context
  return source === 'localStorage' ? CooperatingPartnersLocalStorage : CooperatingPartnersMemory;
};

const CooperatingPartnerLogic = {
  getAll: async (source) => {
    const data = await getService(source).getCooperatingPartners();
    return { success: true, data: data?.data || data || [] };
  },

  getById: async (id, source, partners) => {
    if (source === 'memory') {
        // Memory logic requires the partners array from Context
        return await CooperatingPartnersMemory.getById(id, partners);
    }
    return await CooperatingPartnersLocalStorage.getById(id);
  },

  create: async (partner, source) => {
    return await getService(source).create(partner);
  },

  update: async (id, updatedFields, source, currentPartners) => {
    if (source === 'memory') {
        return await CooperatingPartnersMemory.update(id, updatedFields, currentPartners);
    }
    return await CooperatingPartnersLocalStorage.update(id, updatedFields);
  },

  remove: async (id, source, currentPartners) => {
    if (source === 'memory') {
        return await CooperatingPartnersMemory.remove(id, currentPartners);
    }
    return await CooperatingPartnersLocalStorage.remove(id);
  }
};

export default CooperatingPartnerLogic;