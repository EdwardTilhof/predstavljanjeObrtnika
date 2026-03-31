import { Button, Col, Form, Row, Container, Stack, InputGroup, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useEffect, useState } from "react";
import ServiceLogic from "./Services";

export default function ChangeService() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [service, setService] = useState(null);

    async function fetchService() {
        try {
            const response = await ServiceLogic.getById(id);
            setService(response.data);
        } catch (error) {
            console.error("Error loading service:", error);
        }
    }

    useEffect(() => {
        if (id) { fetchService(); }
    }, [id]);

    async function handleUpdate(updatedData) {
        try {
            await ServiceLogic.update(id, updatedData);
            navigate(ROUTES.services);
        } catch (error) {
            alert("Failed to update service data.");
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
            title: formData.get('title'),
            category: formData.get('category'),
            company: formData.get('company'),
            contact: formData.get('contact'),
            description: formData.get('description'),
            cost: updatedCost,
            duration: updatedDuration,
        });
    }

    if (!service) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading service data...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h3 className="mb-4 dynamic-heading">Edit Service: {service.title}</h3>
            <Form onSubmit={handleSubmit} className="shadow p-4 rounded custom-card border">
                <Row className="mb-3">
                    <Col md={8}>
                        <Form.Group controlId="title">
                            <Form.Label className="fw-bold dynamic-text">Service Name / Title</Form.Label>
                            <Form.Control
                                type="text" name="title" required
                                defaultValue={service.title}
                                placeholder="e.g. Web Development"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="category">
                            <Form.Label className="fw-bold dynamic-text">Service Category</Form.Label>
                            <Form.Control
                                type="text" name="category" required
                                defaultValue={service.category}
                                placeholder="e.g. IT & Software"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="company">
                            <Form.Label className="fw-bold dynamic-text">Service Provider / Company Name</Form.Label>
                            <Form.Control
                                type="text" name="company"
                                defaultValue={service.company}
                                placeholder="Enter company name"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="contact">
                            <Form.Label className="fw-bold dynamic-text">Contact Information</Form.Label>
                            <Form.Control
                                type="text" name="contact"
                                defaultValue={service.contact}
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
                                    defaultValue={service.cost}
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
                                    defaultValue={service.duration}
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
                        defaultValue={service.description}
                        placeholder="Describe the service details here..."
                    />
                </Form.Group>

                <hr className="my-4" />

                <Stack direction="horizontal" gap={3} className="justify-content-end">
                    <Link to={ROUTES.services} className="btn btn-outline-secondary px-4">
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