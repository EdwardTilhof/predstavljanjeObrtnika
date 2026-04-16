import { createUniqueId } from "../UUIDGenerator";
import { regions } from "../locations/RegionsData";

const osijekId = regions.find(region => region.name === "Osijek")?.id;

// 1. Generate unique IDs for the Work Sectors
const idIT = createUniqueId('worksector');
const idDesign = createUniqueId('worksector');
const idInfra = createUniqueId('worksector'); 
const idMarketing = createUniqueId('worksector');

export const mainCategories = [
  { id: idIT, name: "IT & Software" },
  { id: idDesign, name: "Design" },
  { id: idInfra, name: "Infrastructure" },
  { id: idMarketing, name: "Marketing" }
];

// 2. Generate data for the partners
export const CooperatingPartnersData = [
  {
    id: createUniqueId('ourProjectsCard'),
    title: ["Web Development"],
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
    title: ["UI/UX Design"],
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
    title: ["Cloud Architecture"],
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
    title: ["SEO Optimization"],
    category: idMarketing, 
    company: "RankBoosters",
    cost: 800.0,
    duration: 4,
    contact: "hello@rankboosters.net",
    regions: [osijekId],
    description: "Strategic search engine optimization."
  }
];