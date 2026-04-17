import { createUniqueId } from "../UUIDGenerator";

export const MOCK_GALLERY_DATA = [
  {
    id: createUniqueId('galleryitem'),
    url: "https://placehold.co/600x400/34495e/white?text=Foundation+Work",
    title: "Excavation & Foundation",
    description: "This phase involved the deep excavation of the site and the pouring of reinforced concrete foundations. We ensured all structural standards were met before proceeding to the vertical construction."
  },
  {
    id: createUniqueId('galleryitem'),
    url: "https://placehold.co/600x400/2c3e50/white?text=Main+Structure",
    title: "Main Steel Framework",
    description: "The installation of the primary steel framework. This is a critical stage where the skeleton of the building takes shape. Our team worked with high-precision cranes to align the beams according to the architectural blueprints. This structure provides the necessary support for the upcoming five floors and the specialized glass facade that will be installed in the next phase of the project."
  },
  {
    id: createUniqueId('galleryitem'),
    url: "https://placehold.co/600x400/95a5a6/white?text=Interior+View",
    title: "Interior Rendering",
    description: "A preview of the open-concept lobby design."
  },
  {
    id: createUniqueId('galleryitem'),
    url: "https://placehold.co/600x400/7f8c8d/white?text=Roof+Installation",
    title: "Sustainable Roofing",
    description: "" // Testing the "No description" placeholder
  }
];