import { createUniqueId} from "../UUIDGenerator";

export const PROJECT_CARD_DATA = [
  {
    id:  createUniqueId('ourprojectscard'),
    title: "Apartman building 205",
    text: "seven story building",
    location: "Zagreb",
    date: "xx/xx/xxxx",
    investment: 3000,
    image: "https://placehold.co/120x240",
    link: ""
  },
  {
    id:  createUniqueId('ourprojectscard'),
    title: "Hotel silvanija",
    text: "where guests can enjoy the sea",
    location: "Split",
    date: "xx/xx/xxxx",
    investment: 5000,
    image: "https://placehold.co/400x600",
    link: ""
  },
  {
    id:  createUniqueId('ourprojectscard'),
    title: "Tech building of the future",
    text: "Exo friendly self efficient one family home.",
    location: "Split",
    date: "xx/xx/xxxx",
    investment: 3000,
    image: "https://placehold.co/100x120",
    link: ""
  },
];