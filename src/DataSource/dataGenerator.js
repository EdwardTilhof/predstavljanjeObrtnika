import { regions } from "../DataSource/regionData";

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const titles = [
    "Full-Stack Web App", "High-Fidelity Prototyping", "Hybrid Cloud Migration", "Content Lifecycle Mgmt",
    "API Gateway Integration", "Motion Graphics Design", "Server Rack Optimization", "Influencer Outreach",
    "Microservices Arch", "Brand Visual Identity", "Disaster Recovery Plan", "PPC Campaign Audit",
    "Smart Contract Audit", "Packaging & Print Design", "Dedicated Hosting Setup", "Customer Persona Research",
    "iOS Swift Development", "3D Product Modeling", "Network Load Balancing", "Affiliate Program Setup",
    "Legacy Code Refactoring", "Design System Dev", "Cybersecurity Firewall", "Email Automation Flows",
    "SaaS Platform Build", "Iconography Library", "Database Sharding", "TikTok Ad Strategy",
    "Machine Learning Model", "User Journey Mapping", "CDN Configuration", "SEO Keyword Mapping",
    "Android Kotlin App", "Editorial Layout Design", "Virtual Private Server", "Viral Content Creation",
    "DevOps Pipeline Setup", "Logo Mark Evolution", "Storage Area Network", "B2B Lead Generation",
    "QA Automation Testing", "Infographic Artistry", "Edge Computing Nodes", "Webinar Funnel Design",
    "Chatbot NLP Training", "Typography Research", "VPN Tunneling Setup", "Podcasting Strategy",
    "Bug Bounty Program", "Web Interface Refresh"
];

const companies = [
    "Quantum Logic", "Velox Studio", "Ironclad Networks", "Prism Marketing", "Neon Byte",
    "Summit Systems", "Aura Creative", "Vanguard Data", "Echo Media Group", "Vector Solutions",
    "Omni Flow", "Zenith Digital", "Titan Infrastructure", "Pulse Advertising", "Nebula Software",
    "Pixel Foundry", "Cortex Cloud", "Bloom Strategy", "Horizon Tech", "Forge Design",
    "Cipher Security", "Momentum Marketing", "Syntax Labs", "Abstract Artistry", "Grid Core",
    "Signal Growth", "Aether Apps", "Modus Design", "Static Shield", "Impact Agency",
    "Catalyst Code", "Spectrum UI", "Uptime Ops", "Ascent Branding", "Node Nexus",
    "Draft & Detail", "Vault Systems", "Reach Digital", "Alpha Stack", "Iconic Studio",
    "Base Layer", "Convert Analytics", "Gravity Dev", "Canvas & Co.", "Sentry Hosting",
    "Market Magnet", "Logic Gate", "Element Design", "Backbone Tech", "Viral Venture"
];

export const generateMockPartners = (baseData, categories, count = 15) => {
    const generatedData = [...baseData];
    const maxId = baseData.length > 0 
        ? Math.max(...baseData.map(p => Number(p.id) || 0)) 
        : 0;

   
    for (let i = 0; i < count; i++) {
        const categoryObj = categories[getRandomInt(0, categories.length - 1)];
        const randomCompany = companies[getRandomInt(0, companies.length - 1)];
        const regionObj = regions[getRandomInt(0, regions.length - 1)];


      generatedData.push({
            id: maxId + i + 1, 
            title: titles[getRandomInt(0, titles.length - 1)],
            titles: [titles[getRandomInt(0, titles.length - 1)]], 
            category: categoryObj.id, 
            company: randomCompany,
            cost: getRandomInt(500, 15000),
            duration: getRandomInt(1, 52),
            region: regionObj.id, 
            regions: [regionObj.id], 
            contact: `info@${randomCompany.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
            description: "Generated placeholder description."
        });
    }

    return generatedData;
};