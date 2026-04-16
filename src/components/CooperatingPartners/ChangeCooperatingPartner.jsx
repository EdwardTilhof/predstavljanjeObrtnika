import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Container, Stack, InputGroup, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants";
import CooperatingPartnerLogic from "./CooperatingPartners";
import { useDataSource } from "../../DataSource/DataSourceContext";
import { mainCategories } from "./CooperatingPartnersData/CooperatingPartnersMainCategoriesData";
import { regions as allRegions } from "../../DataSource/regionData";

export default function ChangeCooperatingPartner() {
    const navigate = useNavigate();
    const { id } = useParams();
    // Removed setDataSource - it's no longer needed in the UI
    const { dataSource, setPartners, partners } = useDataSource();

    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedRegions, setSelectedRegions] = useState([]);

    // Simplified options logic
    const options = mainCategories; 

    useEffect(() => {
        const fetchPartner = async () => {
            setLoading(true);
            try {
                const response = await CooperatingPartnerLogic.getById(id, dataSource, partners);
                if (response.success && response.data) {
                    setPartner(response.data);
                    setSelectedRegions(response.data.regions || []);
                } else {
                    setError("Partner not found.");
                }
            } catch (err) {
                setError("Error loading partner data.");
            } finally {
                setLoading(false);
            }
        };
        fetchPartner();
    }, [id, dataSource, partners]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const updatedPartner = {
            title: formData.get("title"),
            company: formData.get("company"),
            category: formData.get("category"),
            cost: parseFloat(formData.get("cost")),
            duration: parseInt(formData.get("duration")),
            contact: formData.get("contact"),
            description: formData.get("description"),
            regions: selectedRegions
        };

        const result = await CooperatingPartnerLogic.update(id, updatedPartner, dataSource, partners);

        if (result.success) {
            if (dataSource === 'memory') {
                setPartners(result.data); // Update global context list
            }
            window.dispatchEvent(new Event("partnersUpdated"));
            navigate(ROUTES.CooperatingPartners);
        } else {
            alert("Failed to update partner.");
        }
    };

    if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
    if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Edit Partner: {partner?.company}</h2>
            <Form onSubmit={handleSubmit}>
                {/* Form fields remain the same, ensuring defaultValue={partner?.field} is used */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label className="fw-bold">Project Title</Form.Label>
                        <Form.Control name="title" defaultValue={partner?.title} required />
                    </Col>
                    <Col md={6}>
                        <Form.Label className="fw-bold">Company Name</Form.Label>
                        <Form.Control name="company" defaultValue={partner?.company} required />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label className="fw-bold">Category</Form.Label>
                        <Form.Select name="category" defaultValue={partner?.category}>
                            {options.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col md={6}>
                        <Form.Label className="fw-bold">Investment (EUR)</Form.Label>
                        <Form.Control type="number" name="cost" defaultValue={partner?.cost} />
                    </Col>
                </Row>

                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" defaultValue={partner?.description} />
                </Form.Group>

                <Stack direction="horizontal" gap={3} className="justify-content-end">
                    <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button type="submit" variant="primary">Update Partner</Button>
                </Stack>
            </Form>
        </Container>
    );
}