import { createUniqueId } from "../UUIDGenerator";
import { mainCategories } from "./PartnersData";
import { regions } from "../locations/RegionsData";

const partnerNames = ["Web App", "Brand Refresh", "Network Security", "SEO Campaign", "Mobile App", "Data Migration"];
const companies = ["TechFlow Solutions", "PixelPerfect Studio", "SkyHigh Cloud", "RankBoosters", "Global Logic", "Creative Pulse"];
const contacts = ["contact@techflow.com", "info@pixel.io", "support@skyhigh.com", "hello@rank.net", "sales@global.com"];

export const generatePartnerItems = (count) => {
  console.log(`[PartnersData] Generating ${count} randomized partner items...`);

  const data = Array.from({ length: count }, (_, i) => {
    const category = mainCategories[Math.floor(Math.random() * mainCategories.length)];
    const randomRegions = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
      regions[Math.floor(Math.random() * regions.length)].id
    );

    const companyName = companies[Math.floor(Math.random() * companies.length)];
    const dynamicImagePartner = `https://placehold.co/600x400?text=${companyName.replace(/\s/g, '+')}+|+${category.name.replace(/\s/g, '+')}`;

    return {
      companyImage: dynamicImagePartner,
      id: createUniqueId('partner'),
      titles: [partnerNames[Math.floor(Math.random() * partnerNames.length)]],
      category: category.id,
      company: companies[Math.floor(Math.random() * companies.length)],
      cost: (Math.random() * 10000 + 500).toFixed(2),
      duration: Math.floor(Math.random() * 24) + 1,
      contact: contacts[Math.floor(Math.random() * contacts.length)],
      regions: randomRegions,
      description: "Automatically generated partner description for testing purposes.",
      importanceValue: Math.floor(Math.random() * 50) + 2
    };
  });

  console.log("[PartnersData] Randomized partner items ready.");
  return data;
};

export const MOCK_PARTNERS_DATA = {
  default: generatePartnerItems(300)
};