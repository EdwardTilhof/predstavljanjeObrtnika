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
    const { dataSource, setPartners, partners } = useDataSource();

    const [partner, setPartner] = useState(null);
    const [error, setError] = useState("");
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedTitles, setSelectedTitles] = useState([]);

    const [options] = useState(() => {
        const saved = localStorage.getItem('globalCategories');
        return (dataSource === 'memory') ? mainCategories : (saved ? JSON.parse(saved) : mainCategories);
    });

    useEffect(() => {
    const fetchPartner = async () => {
        try {
            const response = await CooperatingPartnerLogic.getById(id, dataSource, partners);

            console.log("Raw Service Response:", response);

            const actualPartner = response.data; 

            if (actualPartner) {
                setPartner(actualPartner);

                setSelectedTitles(Array.isArray(actualPartner.titles) 
                    ? actualPartner.titles 
                    : [actualPartner.title || ""]);

                setSelectedRegions(Array.isArray(actualPartner.regions) 
                    ? actualPartner.regions 
                    : [actualPartner.region || ""]);
            } else {
                setError(`Partner with ID ${id} was not found in ${dataSource}.`);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            setError("Could not load partner data.");
        }
    };
    if (id) fetchPartner();
}, [id, dataSource, partners]);

    const handleTitleChange = (index, value) => {
        const updated = [...selectedTitles];
        updated[index] = value;
        setSelectedTitles(updated);
    };

    const addTitleField = () => setSelectedTitles([...selectedTitles, ""]);
    const removeTitleField = (index) => {
        const updated = selectedTitles.filter((_, i) => i !== index);
        setSelectedTitles(updated.length ? updated : [""]);
    };

    const handleRegionChange = (index, value) => {
        const updated = [...selectedRegions];
        updated[index] = value;
        setSelectedRegions(updated);
    };

    const addRegionField = () => setSelectedRegions([...selectedRegions, ""]);
    const removeRegionField = (index) => {
        const updated = selectedRegions.filter((_, i) => i !== index);
        setSelectedRegions(updated.length ? updated : [""]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const formData = new FormData(e.target);
        const finalRegions = selectedRegions.filter(r => r !== "");
        const finalTitles = selectedTitles.filter(t => t.trim() !== "");

        if (finalRegions.length === 0 || finalTitles.length === 0) {
            setError("Please provide at least one title and one region.");
            return;
        }

        const updatedData = {
            ...partner,
            titles: finalTitles,
            category: formData.get('category'),
            company: formData.get('company').trim(),
            contact: formData.get('contact').trim(),
            description: formData.get('description').trim(),
            regions: finalRegions,
            cost: parseFloat(formData.get('cost')),
            duration: parseInt(formData.get('duration'), 10)
        };

        try {
            await CooperatingPartnerLogic.update(id, updatedData, dataSource);
            window.dispatchEvent(new Event("partnersUpdated"));
            navigate(ROUTES.CooperatingPartners);
            setPartners(prev => prev.map(p => String(p.id) === String(id) ? updatedData : p));
        } catch (err) {
            setError("Failed to update data.");
        }
    };

    if (!partner) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

    return (
        <Container className="mt-5">
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} key={partner.id || 'loading'}>
                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Label className="fw-bold">Work Titles</Form.Label>
                        {selectedTitles.map((title, index) => (
                            <InputGroup className="mb-2" key={index}>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => handleTitleChange(index, e.target.value)}
                                    required
                                />
                                <Button variant="outline-danger" onClick={() => removeTitleField(index)} disabled={selectedTitles.length === 1}>×</Button>
                            </InputGroup>
                        ))}
                        <Button variant="outline-primary" size="sm" onClick={addTitleField}>+ Add Title</Button>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label className="fw-bold">Category</Form.Label>
                        <Form.Select name="category" defaultValue={partner?.category || ""}>
                            <option value="">Select a category...</option>
                            {options.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col md={6}>
                        <Form.Label className="fw-bold">Company</Form.Label>
                        <Form.Control type="text" name="company" defaultValue={partner?.company || ""} />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label className="fw-bold">Regions</Form.Label>
                        {selectedRegions.map((currentId, index) => (
                            <InputGroup className="mb-2" key={index}>
                                <Form.Select
                                    value={String(currentId || "")}
                                    onChange={(e) => handleRegionChange(index, e.target.value)}
                                >
                                    <option value="">Select region...</option>
                                    {allRegions.map(reg => (
                                        <option key={reg.id} value={reg.id}>{reg.name}</option>
                                    ))}
                                </Form.Select>
                                <Button variant="outline-danger" onClick={() => removeRegionField(index)}>×</Button>
                            </InputGroup>
                        ))}
                        <Button variant="outline-primary" size="sm" onClick={addRegionField}>+ Add Region</Button>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Label className="fw-bold">Investment</Form.Label>
                        <InputGroup>
                            <Form.Control type="number" name="cost" defaultValue={partner?.cost || 0} />
                            <InputGroup.Text>EUR</InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <Form.Label className="fw-bold">Duration</Form.Label>
                        <Form.Control type="number" name="duration" defaultValue={partner?.duration || 0} />
                    </Col>
                    <Col md={4}>
                        <Form.Label className="fw-bold">Contact</Form.Label>
                        <Form.Control type="text" name="contact" defaultValue={partner?.contact || ""} />
                    </Col>
                </Row>

                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Description</Form.Label>
                    <Form.Control as="textarea" rows={4} name="description" defaultValue={partner?.description || ""} />
                </Form.Group>

                <Stack direction="horizontal" gap={3} className="justify-content-end">
                    <Link to={ROUTES.CooperatingPartners} className="btn btn-outline-secondary">Cancel</Link>
                    <Button type="submit" variant="success">Save Changes</Button>
                </Stack>
            </Form>
        </Container>
    );
}