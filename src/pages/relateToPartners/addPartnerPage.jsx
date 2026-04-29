import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants"; 
import PartnerFormUI from "../../components/partners/partnerFormUi"; 
import CooperatingPartnerLogic from "../../components/partners/CooperatingPartnersLogic";

import dataFacade from "../../services/dataFacade";



const AddPartnerPage = () => {
    const navigate = useNavigate();
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
    try {
        await dataFacade.addPartner(formData); 
        window.dispatchEvent(new Event("partnersUpdated"));
        navigate(ROUTES.CooperatingPartners);
    } catch (error) {
        setError("Failed to create partner.");
    }
};

useEffect(() => {
    const loadDropdowns = async () => {
        setAvailableCategories(await dataFacade.getCategories());
        setAvailableRegions(await dataFacade.getRegions());
    };
    loadDropdowns();
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