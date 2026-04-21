import { createUniqueId } from "../UUIDGenerator";
import { regions } from "../locations/RegionsData";

const osijekId = regions.find(region => region.name === "Osijek")?.id;

// 1. Use hardcoded, stable IDs for static data so they don't regenerate on refresh
const idIT = 'worksector_it';
const idDesign = 'worksector_design';
const idInfra = 'worksector_infra'; 
const idMarketing = 'worksector_marketing';

export const mainCategories = [
  { id: idIT, name: "IT & Software" },
  { id: idDesign, name: "Design" },
  { id: idInfra, name: "Infrastructure" },
  { id: idMarketing, name: "Marketing" }
];

export const CooperatingPartnersData = [
  {
    id: createUniqueId('ourProjectsCard'),
    titles: ["Web Development"],
    category: idIT, 
    company: "TechFlow Solutions",
    cost: 2500.0,
    duration: 8,
    contact: "contact@techflow.com",
    regions: [osijekId],
    description: "Custom web applications built with modern technologies."
  },
  {
    id: createUniqueId('ourProjectsCard'),
    titles: ["UI/UX Design"],
    category: idDesign, 
    company: "PixelPerfect Studio",
    cost: 1200.0,
    duration: 2,
    contact: "design@pixelperfect.io",
    regions: [osijekId],
    description: "Beautiful and intuitive user interfaces designed for optimal user experience."
  },
  {
    id: createUniqueId('ourProjectsCard'),
    titles: ["Cloud Architecture"],
    category: idInfra, 
    company: "SkyHigh Cloud",
    cost: 5000.0,
    duration: 0,
    contact: "support@skyhigh.com",
    regions: [osijekId],
    description: "Scalable and secure cloud infrastructure setup."
  },
  {
    id: createUniqueId('ourProjectsCard'),
    titles: ["SEO Optimization"],
    category: idMarketing, 
    company: "RankBoosters",
    cost: 800.0,
    duration: 4,
    contact: "hello@rankboosters.net",
    regions: [osijekId],
    description: "Strategic search engine optimization."
  }
];