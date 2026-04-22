import React, { useState, useEffect } from 'react';
import { Alert, Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES, DATA_SOURCE } from "../../Constants";
import PartnerFormUI from "../../components/partners/partnerFormUi";
import CooperatingPartnerLogic from "../../components/partners/CooperatingPartnersLogic";
import { useDataSource } from "../../dataSource/DataSourceContext";

import { mainCategories as staticCategories } from "../../../dataRepository/partnersData/PartnersData";
import { regions as staticRegions } from "../../../dataRepository/locations/RegionsData";

const EditPartnerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { partners, setPartners } = useDataSource();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState(null);

    // Dynamic Lists for the Form Dropdowns
    const [dynamicCategories, setDynamicCategories] = useState([]);
    const [dynamicRegions, setDynamicRegions] = useState([]);

   useEffect(() => {
    const load = async () => {
        const savedCats = localStorage.getItem('globalCategories');
        const savedRegs = localStorage.getItem('globalRegions');
        
        // Use the same merged logic as the Main page
        const mergedCats = [...new Map([...staticCategories, ...(savedCats ? JSON.parse(savedCats) : [])].map(item => [String(item.id), item])).values()];
        const mergedRegs = [...new Map([...staticRegions, ...(savedRegs ? JSON.parse(savedRegs) : [])].map(item => [String(item.id), item])).values()];
        
        setDynamicCategories(mergedCats);
        setDynamicRegions(mergedRegs);

        const res = await CooperatingPartnerLogic.getById(id, 'localStorage', partners);
        if (res.success) {
            setFormData({
                ...res.data,
                titles: res.data.titles || (res.data.title ? [res.data.title] : [""]),
                regions: res.data.regions || [""],
                importanceValue: res.data.importanceValue || 1,
                companyImage: res.data.companyImage || ""
            });
        } else {
            setError("Partner not found.");
        }
        setLoading(false);
    };
    load();
}, [id, partners]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Update local storage
        const result = await CooperatingPartnerLogic.update(id, formData, 'localStorage');
        
        if (result.success) {
            setPartners(result.data); 
            window.dispatchEvent(new Event("partnersUpdated"));
            navigate(ROUTES.CooperatingPartners);
        } else {
            setError("Failed to update partner.");
        }
    };

    if (loading) return <Spinner className="d-block mx-auto mt-5" />;
    if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
    if (!formData) return null;

    return (
        <Container className="mt-5">
            <PartnerFormUI 
                title={`Edit: ${formData.company}`}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                error={error}
                categories={dynamicCategories} 
                regions={dynamicRegions}       
                isEdit={true}
            />
        </Container>
    );
};

export default EditPartnerPage;