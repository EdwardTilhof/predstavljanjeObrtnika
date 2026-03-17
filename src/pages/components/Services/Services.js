import { servicesData } from "./ServicesData";

async function get(){
  return {data: servicesData}
}

export default{
    get
}