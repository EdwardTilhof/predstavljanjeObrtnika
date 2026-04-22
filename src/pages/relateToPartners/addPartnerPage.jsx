import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// 1. constants and components:
import { ROUTES, DATA_SOURCE } from "../../Constants"; 
import PartnerFormUI from "../../components/partners/partnerFormUi"; 
import CooperatingPartnerLogic from "../../components/partners/CooperatingPartnersLogic";
import { useDataSource } from "../../dataSource/DataSourceContext";

// 2. DataRepository
import { mainCategories } from "../../../dataRepository/partnersData/PartnersData"; 
import { regions } from "../../../dataRepository/locations/RegionsData";



const AddPartnerPage = () => {
    const navigate = useNavigate();
    const { setPartners } = useDataSource();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        titles: [""], 
        regions: [""], 
        category: "", 
        company: "",
        companyImage: "",
        cost: "", 
        duration: "", 
        contact: "", 
        description: "",
        importanceValue: 1
    });

    const [availableCategories, setAvailableCategories] = useState([]);
    const [availableRegions, setAvailableRegions] = useState([]);

   const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await CooperatingPartnerLogic.create(formData, 'localStorage'); 
    
    if (result.success) {
        setPartners(prev => [...prev, result.data]);
        
        window.dispatchEvent(new Event("partnersUpdated"));
        
        navigate(ROUTES.CooperatingPartners);
    } else {
        setError("Failed to create partner.");
    }
};

useEffect(() => {
    const savedCats = localStorage.getItem('globalCategories');
    const savedRegs = localStorage.getItem('globalRegions');
    
    const parsedCats = savedCats ? JSON.parse(savedCats) : [];
    const parsedRegs = savedRegs ? JSON.parse(savedRegs) : [];

    const mergedCats = [...new Map([...mainCategories, ...parsedCats].map(item => [item.id, item])).values()];
    const mergedRegs = [...new Map([...regions, ...parsedRegs].map(item => [item.id, item])).values()];

    setAvailableCategories(mergedCats);
    setAvailableRegions(mergedRegs);
}, []);

    return (
        <Container className="mt-5">
            <PartnerFormUI 
                title="Add New Partner"
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                error={error}
                categories={availableCategories} 
                regions={availableRegions}       
            />
        </Container>
    );
};

export default AddPartnerPage;