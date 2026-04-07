import { Button, Col, Form, Row, Container, Stack, InputGroup, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useEffect, useState } from "react";
import CooperatingPartnerLogic from "./CooperatingPartners";
import { mainCategories } from "./CooperatingPartnersData/CooperatingPartnersMainCategoriesData";
import CooperatingPartnersMemory from "./CooperatingPartnersMemory";

export default function ChangeCooperatingPartner() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [CooperatingPartner, setCooperatingPartner] = useState(null);
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

    async function fetchCooperatingPartner() {
        try {
            const response = await CooperatingPartnerLogic.getById(id);
            setCooperatingPartner(response.data);
        } catch (error) {
            console.error("Error loading CooperatingPartner:", error);
            setError("Could not load partner data.");
        }
    }

    useEffect(() => {
        if (id) { fetchCooperatingPartner(); }
    }, [id]);

    async function handleUpdate(updatedData) {
        try {
            await CooperatingPartnerLogic.update(id, updatedData);
            navigate(ROUTES.CooperatingPartners);
        } catch (error) {
            setError("Failed to update CooperatingPartner data in the database.");
        }
    }

    function handleSubmit(e) {
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
            setError("All fields are required and cannot be empty or just spaces.");
            return;
        }

        if (!isValidContact(contact)) {
            setError("Please enter valid emails and/or phone numbers separated by spaces or commas.");
            return;
        }

        const updatedCost = parseFloat(rawCost);
        const updatedDuration = parseInt(rawDuration, 10);

        if (isNaN(updatedCost) || updatedCost < 0 || isNaN(updatedDuration) || updatedDuration < 0) {
            setError("Please provide valid positive numbers for Investment and Duration.");
            return;
        }

        handleUpdate({
            title,
            category,
            company,
            contact,
            description,
            cost: updatedCost,
            duration: updatedDuration,
        });
    }

    if (!CooperatingPartner) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading CooperatingPartner data...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h3 className="mb-4 dynamic-heading">Edit CooperatingPartner: {CooperatingPartner.title}</h3>

            {error && <Alert variant="danger" className="shadow-sm">{error}</Alert>}

            <Form onSubmit={handleSubmit} className="shadow p-4 rounded custom-card border">
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="title">
                            <Form.Label className="fw-bold dynamic-text">Work title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                defaultValue={CooperatingPartner.title}
                                placeholder="e.g. Web Development"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Label className="fw-bold dynamic-text">Category</Form.Label>
                        <Form.Control
                            list="category-options"
                            name="category"
                            placeholder="Select or type a new category..."
                            defaultValue={CooperatingPartner.category}
                            onChange={(e) => {
                                const value = e.target.value;
                                console.log("Selected/Typed:", value);
                            }}
                        />

                        <datalist id="category-options">
                            {mainCategories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </datalist>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="company">
                            <Form.Label className="fw-bold dynamic-text">Company Name/Provider</Form.Label>
                            <Form.Control
                                type="text"
                                name="company"
                                defaultValue={CooperatingPartner.company}
                                placeholder="Enter company name"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="contact">
                            <Form.Label className="fw-bold dynamic-text">Contact Information</Form.Label>
                            <Form.Control
                                type="text"
                                name="contact"
                                defaultValue={CooperatingPartner.contact}
                                placeholder="Email and/or Phone (e.g. mail@co.com, +385...)"
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
                                    step={0.01}
                                    defaultValue={CooperatingPartner.cost}
                                />
                                <InputGroup.Text>EUR</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="duration">
                            <Form.Label className="fw-bold dynamic-text">Project Duration</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    name="duration"
                                    defaultValue={CooperatingPartner.duration}
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
                        defaultValue={CooperatingPartner.description}
                        placeholder="Describe the details here..."
                    />
                </Form.Group>

                <hr className="my-4" />

                <Stack direction="horizontal" gap={3} className="justify-content-end">
                    <Link to={ROUTES.CooperatingPartners} className="btn btn-outline-secondary px-4">
                        Cancel
                    </Link>
                    <Button type="submit" variant="success" className="px-5 shadow-sm">
                        Save Changes
                    </Button>
                </Stack>
            </Form>
        </Container>
    );
}