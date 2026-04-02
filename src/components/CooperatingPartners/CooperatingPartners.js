import CooperatingPartnersLocalStorage from "./CooperatingPartnersLocalStorage";
import CooperatingPartnersMemory from "./CooperatingPartnersMemory";

const getService = (source) => {
  return source === 'localStorage' ? CooperatingPartnersLocalStorage : CooperatingPartnersMemory;
};

const CooperatingPartnerLogic = {
  getCooperatingPartners: (source) => getService(source).getCooperatingPartners(),
  getById: (id, source) => getService(source).getById(id),
  create: (p, source) => getService(source).create(p),
  update: (id, p, source) => getService(source).update(id, p),
  remove: (id, source) => getService(source).remove(id),
};

export default CooperatingPartnerLogic;