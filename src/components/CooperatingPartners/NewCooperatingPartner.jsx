import { Button, Col, Form, Row, Container, Stack, InputGroup, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../constants";
import CooperatingPartnerLogic from "./CooperatingPartners";

export function NewCooperatingPartner() {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const isValidContact = (value) => {
        const parts = value.split(/[,\s]+/).filter(part => part.length > 0);
        if (parts.length === 0) return false;
        const emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneExpression = /^(\+?\d[\d\s-]{5,}\d)$/;
        return parts.every(part =>
            emailExpression.test(part) || phoneExpression.test(part)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);

        const title = formData.get("title").trim();
        const category = formData.get("category").trim();
        const company = formData.get("company").trim();
        const contact = formData.get("contact").trim();
        const description = formData.get("description").trim();
        const rawCost = formData.get("cost");
        const rawDuration = formData.get("duration");

        if (!title || !category || !company || !contact || !description) {
            setError("Fields cannot be empty or contain only spaces.");
            return;
        }

        if (!isValidContact(contact)) {
            setError("Please enter a valid email address or phone number.");
            return;
        }

        const costValue = parseFloat(rawCost);
        const durationValue = parseInt(rawDuration, 10);

        if (isNaN(costValue) || costValue < 0 || isNaN(durationValue) || durationValue < 0) {
            setError("Please enter valid positive numbers for Investment and Duration.");
            return;
        }

        const newCooperatingPartner = {
            id: Date.now(),
            title,
            category,
            company,
            contact,
            description,
            cost: costValue,
            duration: durationValue,
        };

        try {
            await CooperatingPartnerLogic.create(newCooperatingPartner);
            navigate(ROUTES.CooperatingPartners);
        } catch (error) {
            console.error("Error creating CooperatingPartner:", error);
            setError("Failed to save the new partner to the data source.");
        }
    };

    return (
        <Container className="mt-5">
            <h3 className="mb-4 dynamic-heading">Add New Cooperating Partner</h3>

            {error && <Alert variant="danger" className="shadow-sm">{error}</Alert>}

            <Form onSubmit={handleSubmit} className="shadow p-4 rounded custom-card border">

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="title">
                            <Form.Label className="fw-bold dynamic-text">Work Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="e.g. Web Development"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="category">
                            <Form.Label className="fw-bold dynamic-text">Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                placeholder="e.g. IT & Software"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="company">
                            <Form.Label className="fw-bold dynamic-text">Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="company"
                                placeholder="Enter company name"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="contact">
                            <Form.Label className="fw-bold dynamic-text">Contact (Email or Phone)</Form.Label>
                            <Form.Control
                                type="text"
                                name="contact"
                                placeholder="user@mail.com or +xxx..."
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="cost">
                            <Form.Label className="fw-bold dynamic-text">Total Investment</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    name="cost"
                                    step="0.01"
                                    placeholder="0.00"
                                />
                                <InputGroup.Text>EUR</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="duration">
                            <Form.Label className="fw-bold dynamic-text">Duration</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    name="duration"
                                    placeholder="0"
                                />
                                <InputGroup.Text>weeks</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-4" controlId="description">
                    <Form.Label className="fw-bold dynamic-text">Detailed Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        placeholder="Describe details here..."
                    />
                </Form.Group>

                <hr className="my-4" />

                <Stack direction="horizontal" gap={3} className="justify-content-end">
                    <Link to={ROUTES.CooperatingPartners} className="btn btn-outline-secondary px-4">
                        Cancel
                    </Link>
                    <Button type="submit" variant="primary" className="px-5 shadow-sm">
                        Add CooperatingPartner
                    </Button>
                </Stack>
            </Form>
        </Container>
    );
}