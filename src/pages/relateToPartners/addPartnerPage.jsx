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
        cost: 0, 
        duration: 0, 
        contact: "", 
        description: ""
    });

    const [availableCategories, setAvailableCategories] = useState([]);
    const [availableRegions, setAvailableRegions] = useState([]);

    useEffect(() => {
        const savedCats = localStorage.getItem('globalCategories');
        const savedRegs = localStorage.getItem('globalRegions');
        
        setAvailableCategories(savedCats ? JSON.parse(savedCats) : mainCategories);
        setAvailableRegions(savedRegs ? JSON.parse(savedRegs) : regions);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await CooperatingPartnerLogic.create(formData, DATA_SOURCE);
        if (result.success) {
            setPartners(prev => [...prev, result.data]);
            navigate(ROUTES.CooperatingPartners);
        } else {
            setError("Failed to create partner.");
        }
    };

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