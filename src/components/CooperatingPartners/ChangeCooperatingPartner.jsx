import { Button, Col, Form, Row, Container, Stack, InputGroup, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useEffect, useState } from "react";
import CooperatingPartnerLogic from "./CooperatingPartners";

export default function ChangeCooperatingPartner() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [CooperatingPartner, setCooperatingPartner] = useState(null);

    async function fetchCooperatingPartner() {
        try {
            const response = await CooperatingPartnerLogic.getById(id);
            setCooperatingPartner(response.data);
        } catch (error) {
            console.error("Error loading CooperatingPartner:", error);
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
            alert("Failed to update CooperatingPartner data.");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const updatedCost = parseFloat(formData.get('cost'));
        const updatedDuration = parseInt(formData.get('duration'), 10);

        if (isNaN(updatedCost) || isNaN(updatedDuration)) {
            alert("Please provide valid numbers for Investment and Duration.");
            return;
        }

        handleUpdate({
            WorkTitle: formData.get('WorkTitle'),
            category: formData.get('category'),
            company: formData.get('company'),
            contact: formData.get('contact'),
            description: formData.get('description'),
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
            <Form onSubmit={handleSubmit} className="shadow p-4 rounded custom-card border">
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="title">
                            <Form.Label className="fw-bold dynamic-text">Work title</Form.Label>
                            <Form.Control
                                type="text" name="title" required
                                defaultValue={CooperatingPartner.title}
                                placeholder="e.g. Web Development"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="category">
                            <Form.Label className="fw-bold dynamic-text">CooperatingPartner Category</Form.Label>
                            <Form.Control
                                type="text" name="category" required
                                defaultValue={CooperatingPartner.category}
                                placeholder="e.g. IT & Software"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="company">
                            <Form.Label className="fw-bold dynamic-text">Company Name/Provider</Form.Label>
                            <Form.Control
                                type="text" name="company"
                                defaultValue={CooperatingPartner.company}
                                placeholder="Enter company name"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="contact">
                            <Form.Label className="fw-bold dynamic-text">Contact Information</Form.Label>
                            <Form.Control
                                type="text" name="contact"
                                defaultValue={CooperatingPartner.contact}
                                placeholder="Email or Phone number"
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
                                    type="number" name="cost" step={0.01}
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
                                    type="number" name="duration"
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
                        as="textarea" rows={4} name="description"
                        defaultValue={CooperatingPartner.description}
                        placeholder="Describe the CooperatingPartner details here..."
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