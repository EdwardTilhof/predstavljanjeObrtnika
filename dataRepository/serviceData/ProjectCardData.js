import { createUniqueId } from "../UUIDGenerator";
import { regions } from "../../dataRepository/locations/RegionsData";

const generateMockProjects = (count) => {
  console.log(`[ProjectCardData] Initializing generation of ${count} randomized projects...`);

  const cities = ["Zagreb", "Split", "Osijek", "Rijeka", "Zadar", "Dubrovnik", "Pula", "Varaždin", "Šibenik"];
  const projectTypes = ["Apartment Building", "Luxury Villa", "Commercial Plaza", "Eco Home", "Industrial Warehouse", "Boutique Hotel", "Public Park", "Tech Hub", "Renovated Loft", "Solar Farm"];
  const adjectives = ["Modern", "Sustainable", "Premium", "Heritage", "Smart", "Coastal", "Urban", "Minimalist"];

  const descriptions = [
    "A state-of-the-art facility focused on energy efficiency and modern design aesthetics.",
    "Breathtaking views combined with high-end materials and smart home integration.",
    "Strategically located infrastructure designed to support high-traffic commercial activities.",
    "A blend of traditional architecture and modern technology for maximum comfort.",
    "Optimized industrial space with advanced logistics support and reinforced structural integrity."
  ];

  const data = Array.from({ length: count }, (_, i) => {
    const type = projectTypes[Math.floor(Math.random() * projectTypes.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomRegion = regions[Math.floor(Math.random() * regions.length)].name;
    // Generate a random date in 2023 or 2024
    const year = Math.random() > 0.5 ? 2023 : 2024;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;

    return {
      id: createUniqueId('ourprojectscard'),
      title: `${adj} ${type} ${100 + i}`,
      text: descriptions[Math.floor(Math.random() * descriptions.length)],
      location: randomRegion,
      date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
      investment: Math.floor(Math.random() * 450000) + 5000, // Range 5k to 455k
      image: `https://placehold.co/600x400?text=${randomRegion}+${type.replace(/\s/g, '+')}`,
      link: ""
    };
  });

  console.log("[ProjectCardData] Randomized generation complete.");
  return data;
};

export const PROJECT_CARD_DATA = generateMockProjects(40);