import { createUniqueId } from "../UUIDGenerator";

const generateGalleryItems = (count) => {
  console.log(`[ProjectGalleryData] Generating ${count} randomized gallery items...`);
  
  const categories = [
    { name: "Foundation", color: "34495e" },
    { name: "Framing", color: "2c3e50" },
    { name: "Interior", color: "95a5a6" },
    { name: "Plumbing", color: "2980b9" },
    { name: "Electrical", color: "f1c40f" },
    { name: "Finishing", color: "27ae60" }
  ];

  const details = [
    "Close-up of the reinforced steel bars before pouring concrete.",
    "Checking the alignment of the primary support beams.",
    "Final inspection of the plumbing system in the main bathroom.Final inspection of the plumbing system in the main bathroom.Final inspection of the plumbing system in the main bathroom.Final inspection of the plumbing system in the main bathroom.Final inspection of the plumbing system in the main bathroom.",
    "A wide-angle shot of the living area after the first coat of paint.Final inspection of the plumbing system in the main bathroom.Final inspection of the plumbing system in the main bathroom.Final inspection of the plumbing system in the main bathroom.Final inspection of the plumbing system in the main bathroom.",
    "Installation of the double-glazed windows completed ahead of schedule.Final inspection of the plumbing system in the main bathroom.Final inspection of the plumbing system in the main bathroom.Final inspection of the plumbing system in the main bathroom.",
    "View from the rooftop showing the newly installed solar panel array."
  ];

  const data = Array.from({ length: count }, (_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const hasDescription = Math.random() > 0.2; // 80% chance to have a description

    return {
      id: createUniqueId('galleryitem'),
      url: `https://placehold.co/600x400/${category.color}/white?text=${category.name}+Detail+${i + 1}`,
      title: `${category.name} Phase - Item ${i + 1}`,
      description: hasDescription ? details[Math.floor(Math.random() * details.length)] : ""
    };
  });

  console.log("[ProjectGalleryData] Randomized gallery items ready.");
  return data;
};

export const MOCK_GALLERY_DATA = {
  "default": generateGalleryItems(50)
};