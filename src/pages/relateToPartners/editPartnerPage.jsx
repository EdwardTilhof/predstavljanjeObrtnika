import React, { useState, useEffect } from 'react';
import { Alert, Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants";
import PartnerFormUI from "../../components/partners/partnerFormUi";
import CooperatingPartnerLogic from "../../components/partners/CooperatingPartnersLogic";

import dataFacade from "../../services/dataFacade";

const EditPartnerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState(null);

    // Dynamic Lists for the Form Dropdowns
    const [dynamicCategories, setDynamicCategories] = useState([]);
    const [dynamicRegions, setDynamicRegions] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [categories, regions, partner] = await Promise.all([
                    dataFacade.getCategories(),
                    dataFacade.getRegions(),
                    dataFacade.getPartnerById(id)
                ]);
                
                setDynamicCategories(categories);
                setDynamicRegions(regions);
                
                if (partner) {
                    setFormData(partner);
                } else {
                    setError("Partner not found.");
                }
            } catch (err) {
                setError("Failed to load partner data.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dataFacade.updatePartner(id, formData);
            window.dispatchEvent(new Event("partnersUpdated"));
            navigate(ROUTES.CooperatingPartners);
        } catch (error) {
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