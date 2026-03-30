import { Button, Col, Form, Row, Container, Stack, InputGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useEffect, useState } from "react";
import CooperatingPartnerLogic from "./CooperatingPartners";

export default function ChangeCooperatingPartner() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [CooperatingPartner, setCooperatingPartner] = useState({});

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

        handleUpdate({
            title: formData.get('title'),
            category: formData.get('category'),
            company: formData.get('company'),
            contact: formData.get('contact'),
            description: formData.get('description'),
            cost: parseFloat(formData.get('cost')),
            duration: parseInt(formData.get('duration')),
        });
    }

    return (
        <Container className="mt-5">
            <h3 className="mb-4 dynamic-heading">Edit CooperatingPartner: {CooperatingPartner.title || "Loading..."}</h3>
            <Form onSubmit={handleSubmit} className="shadow p-4 rounded custom-card border">

                <Row className="mb-3">
                    <Col md={8}>
                        <Form.Group controlId="title">
                            <Form.Label className="fw-bold dynamic-text">CooperatingPartner Name / Title</Form.Label>
                            <Form.Control
                                type="text" name="title" required
                                defaultValue={CooperatingPartner.title}
                                placeholder="e.g. Web Development"
                                key={`title-${CooperatingPartner.id}`}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="category">
                            <Form.Label className="fw-bold dynamic-text">CooperatingPartner Category</Form.Label>
                            <Form.Control
                                type="text" name="category" required
                                defaultValue={CooperatingPartner.category}
                                placeholder="e.g. IT & Software"
                                key={`cat-${CooperatingPartner.id}`}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="company">
                            <Form.Label className="fw-bold dynamic-text">CooperatingPartner Provider / Company Name</Form.Label>
                            <Form.Control
                                type="text" name="company"
                                defaultValue={CooperatingPartner.company}
                                placeholder="Enter company name"
                                key={`comp-${CooperatingPartner.id}`}
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
                                key={`cont-${CooperatingPartner.id}`}
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
                                    key={`cost-${CooperatingPartner.id}`}
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
                                    key={`dur-${CooperatingPartner.id}`}
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
                        key={`desc-${CooperatingPartner.id}`}
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