import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Container, Stack, InputGroup, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants";
import CooperatingPartnerLogic from "./CooperatingPartners";
import { useDataSource } from "../../DataSource/DataSourceContext";
import { mainCategories } from "./CooperatingPartnersData/CooperatingPartnersMainCategoriesData";

export default function ChangeCooperatingPartner() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { dataSource } = useDataSource();

    const [partner, setPartner] = useState(null);
    const [options, setOptions] = useState([]); // This is named 'options'
    const [error, setError] = useState("");

    useEffect(() => {
        const syncData = () => {
            const saved = localStorage.getItem('globalCategories');
            if (dataSource === 'memory') {
                setOptions(mainCategories); // Changed from setCategories to setOptions
            } else {
                setOptions(saved ? JSON.parse(saved) : mainCategories);
            }
        };

        syncData();
        // Add the listener so it stays in sync dynamically
        window.addEventListener("categoriesUpdated", syncData);
        return () => window.removeEventListener("categoriesUpdated", syncData);
    }, [dataSource]);

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const response = await CooperatingPartnerLogic.getById(id);
                setPartner(response.data);
            } catch (err) {
                console.error("Error loading Partner:", err);
                setError("Could not load partner data.");
            }
        };
        if (id) fetchPartner();
    }, [id]);

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

        const formData = new FormData(e.target);
        const title = formData.get('title').trim();
        const category = formData.get('category').trim();
        const company = formData.get('company').trim();
        const contact = formData.get('contact').trim();
        const description = formData.get('description').trim();
        const rawCost = formData.get('cost');
        const rawDuration = formData.get('duration');

        if (!title || !category || !company || !contact || !description) {
            setError("All fields are required.");
            return;
        }

        if (!isValidContact(contact)) {
            setError("Please enter valid contact information.");
            return;
        }

        const updatedCost = parseFloat(rawCost);
        const updatedDuration = parseInt(rawDuration, 10);

        if (isNaN(updatedCost) || updatedCost < 0 || isNaN(updatedDuration) || updatedDuration < 0) {
            setError("Please provide valid positive numbers.");
            return;
        }

        try {
            await CooperatingPartnerLogic.update(id, {
                title, category, company, contact, description,
                cost: updatedCost, duration: updatedDuration
            });
            navigate(ROUTES.CooperatingPartners);
        } catch (err) {
            setError("Failed to update data.");
        }
    };

    if (!partner) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading data...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h3 className="mb-4 dynamic-heading">Edit Partner: {partner.title}</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} className="shadow p-4 rounded custom-card border">
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="title">
                            <Form.Label className="fw-bold">Work title</Form.Label>
                            <Form.Control type="text" name="title" defaultValue={partner.title} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Label className="fw-bold">Category</Form.Label>
                        <Form.Select name="category" defaultValue={partner.category}>
                            <option value="">Select a category...</option>
                            {options.map((cat) => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="company">
                            <Form.Label className="fw-bold">Company Name</Form.Label>
                            <Form.Control type="text" name="company" defaultValue={partner.company} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="contact">
                            <Form.Label className="fw-bold">Contact Information</Form.Label>
                            <Form.Control type="text" name="contact" defaultValue={partner.contact} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="cost">
                            <Form.Label className="fw-bold">Total Investment</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" name="cost" step={0.01} defaultValue={partner.cost} />
                                <InputGroup.Text>EUR</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="duration">
                            <Form.Label className="fw-bold">Duration (weeks)</Form.Label>
                            <Form.Control type="number" name="duration" defaultValue={partner.duration} />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-4" controlId="description">
                    <Form.Label className="fw-bold">Description</Form.Label>
                    <Form.Control as="textarea" rows={4} name="description" defaultValue={partner.description} />
                </Form.Group>

                <Stack direction="horizontal" gap={3} className="justify-content-end">
                    <Link to={ROUTES.CooperatingPartners} className="btn btn-outline-secondary px-4">Cancel</Link>
                    <Button type="submit" variant="success" className="px-5 shadow-sm">Save Changes</Button>
                </Stack>
            </Form>
        </Container>
    );
}