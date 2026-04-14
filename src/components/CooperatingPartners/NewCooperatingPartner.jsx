import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Container, Stack, InputGroup, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import CooperatingPartnerLogic from "./CooperatingPartners";
import { useDataSource } from "../../DataSource/DataSourceContext";
import { mainCategories } from "./CooperatingPartnersData/CooperatingPartnersMainCategoriesData";
import { regions as defaultRegions } from "../../DataSource/regionData";


export function NewCooperatingPartner() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { dataSource, setPartners, partners } = useDataSource();
    const [options, setOptions] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([""]);
    const [selectedTitles, setSelectedTitles] = useState([""]);
    const [allRegions, setAllRegions] = useState([]);

    useEffect(() => {
        const syncRegions = () => {
            const saved = localStorage.getItem('globalRegions');
            if (dataSource === 'memory') {
                setAllRegions(defaultRegions);
            } else {
                setAllRegions(saved ? JSON.parse(saved) : defaultRegions);
            }
        };
        syncRegions();
        window.addEventListener("regionsUpdated", syncRegions);
        return () => window.removeEventListener("regionsUpdated", syncRegions);
    }, [dataSource]);

    useEffect(() => {
        const syncData = () => {
            const saved = localStorage.getItem('globalCategories');
            if (dataSource === 'memory') {
                setOptions(mainCategories);
            } else {
                setOptions(saved ? JSON.parse(saved) : mainCategories);
            }
        };
        syncData();
        window.addEventListener("categoriesUpdated", syncData);
        return () => window.removeEventListener("categoriesUpdated", syncData);
    }, [dataSource]);

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

    const addRegionField = () => setSelectedRegions([...selectedRegions, ""]);
    const removeRegionField = (index) => {
        const updated = selectedRegions.filter((_, i) => i !== index);
        setSelectedRegions(updated.length ? updated : [""]);
    };

    const handleRegionChange = (index, value) => {
        const updated = [...selectedRegions];
        updated[index] = value;
        setSelectedRegions(updated);
    };

    const isValidContact = (value) => {
        const parts = value.split(/[,\s]+/).filter(part => part.length > 0);
        if (parts.length === 0) return false;
        const emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneExpression = /^(\+?\d[\d\s-]{5,}\d)$/;
        return parts.every(part => emailExpression.test(part) || phoneExpression.test(part));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);

        const categoryId = formData.get("category");
        const company = formData.get("company").trim();
        const contact = formData.get("contact").trim();
        const description = formData.get("description").trim();

        const finalRegions = selectedRegions.filter(id => id !== "");
        const finalTitles = selectedTitles.filter(t => t.trim() !== "");

        if (finalTitles.length === 0 || !categoryId || !company || !contact || !description || finalRegions.length === 0) {
            setError("All fields are required.");
            return;
        }

        if (!isValidContact(contact)) {
            setError("Please enter a valid email address or phone number.");
            return;
        }

        try {
            const currentIds = partners.map(p => Number(p.id)).filter(id => !isNaN(id));
            const maxId = currentIds.length > 0 ? Math.max(...currentIds) : 0;
            const newId = maxId + 1;

            const newPartner = {
                id: newId,
                titles: finalTitles,
                category: categoryId,
                company,
                contact,
                description,
                regions: finalRegions,
                cost: parseFloat(formData.get("cost")) || 0,
                duration: parseInt(formData.get("duration"), 10) || 0,
            };

            await CooperatingPartnerLogic.create(newPartner, dataSource);

            setPartners(prev => [...prev, newPartner]);

            window.dispatchEvent(new Event("partnersUpdated"));
            navigate(ROUTES.CooperatingPartners);

        } catch (error) {
            console.error("Creation Error:", error);
            setError("Failed to save the new partner.");
        }
    };

    return (
        <Container className="mt-5">
            <h3 className="mb-4 dynamic-heading">Add New Cooperating Partner</h3>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} className="shadow p-4 rounded custom-card border">
                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Label className="fw-bold">Work Titles</Form.Label>
                        {selectedTitles.map((title, index) => (
                            <InputGroup className="mb-2" key={index}>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. Web Development"
                                    value={title}
                                    onChange={(e) => handleTitleChange(index, e.target.value)}
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
                        <Form.Select name="category">
                            <option value="">Select a category...</option>
                            {options.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col md={6}>
                        <Form.Label className="fw-bold">Company Name</Form.Label>
                        <Form.Control type="text" name="company" placeholder="Enter company name" />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label className="fw-bold">Operating Regions</Form.Label>
                        {selectedRegions.map((currentId, index) => (
                            <InputGroup className="mb-2" key={index}>
                                <Form.Select
                                    value={currentId}
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
                    <Col md={12}>
                        <Row>
                            <Col md={4}>
                                <Form.Label className="fw-bold">Investment</Form.Label>
                                <InputGroup><Form.Control type="number" name="cost" step="0.01" /><InputGroup.Text>EUR</InputGroup.Text></InputGroup>
                            </Col>
                            <Col md={4}>
                                <Form.Label className="fw-bold">Duration</Form.Label>
                                <InputGroup><Form.Control type="number" name="duration" placeholder='Weeks' /><InputGroup.Text>wks</InputGroup.Text></InputGroup>
                            </Col>
                            <Col md={4}>
                                <Form.Label className="fw-bold">Contact</Form.Label>
                                <Form.Control type="text" name="contact" placeholder="Email or Phone" />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Detailed Description</Form.Label>
                    <Form.Control as="textarea" rows={4} name="description" />
                </Form.Group>

                <Stack direction="horizontal" gap={3} className="justify-content-end">
                    <Link to={ROUTES.CooperatingPartners} className="btn btn-outline-secondary px-4">Cancel</Link>
                    <Button type="submit" variant="primary" className="px-5 shadow-sm">Add Partner</Button>
                </Stack>
            </Form>
        </Container>
    );
}