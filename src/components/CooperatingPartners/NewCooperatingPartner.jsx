import { Button, Col, Form, Row, Container, Stack, InputGroup } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import CooperatingPartnerLogic from "./CooperatingPartners";

export function NewCooperatingPartner() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const rawCost = formData.get("cost").replace(/[^0-9.]/g, "");
        const rawDuration = formData.get("duration").replace(/[^0-9]/g, "");

        const costValue = parseFloat(rawCost);
        const durationValue = parseInt(rawDuration, 10);

        if (isNaN(costValue) || isNaN(durationValue)) {
            alert("Please enter valid numbers for Investment and Duration.");
            return;
        }

        const newCooperatingPartner = {
            id: Date.now(),
            title: formData.get("title"),
            category: formData.get("category"),
            company: formData.get("company"),
            contact: formData.get("contact"),
            description: formData.get("description"),
            cost: costValue,
            duration: durationValue,
        };

        try {
            await CooperatingPartnerLogic.create(newCooperatingPartner);
            navigate(ROUTES.CooperatingPartners);
        } catch (error) {
            console.error("Error creating CooperatingPartner:", error);
            alert("Failed to create new CooperatingPartner.");
        }
    };

    return (
        <Container className="mt-5">
            <h3 className="mb-4 dynamic-heading">Add New Cooperating Partner</h3>
            <Form onSubmit={handleSubmit} className="shadow p-4 rounded custom-card border">
                
                {/* Title and Category */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="title">
                            <Form.Label className="fw-bold dynamic-text">Work Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                required
                                placeholder="e.g. Web Development"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="category">
                            <Form.Label className="fw-bold dynamic-text">CooperatingPartner Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                required
                                placeholder="e.g. IT & Software"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Company and Contact */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="company">
                            <Form.Label className="fw-bold dynamic-text">Company Name/Provider</Form.Label>
                            <Form.Control
                                type="text"
                                name="company"
                                required
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
                                required
                                placeholder="Email or phone"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Cost and Duration */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="cost">
                            <Form.Label className="fw-bold dynamic-text">Total Investment</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    name="cost"
                                    step={0.01}
                                    required
                                    placeholder="0.00"
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
                                    required
                                    placeholder="0"
                                />
                                <InputGroup.Text>weeks</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Description */}
                <Form.Group className="mb-4" controlId="description">
                    <Form.Label className="fw-bold dynamic-text">Detailed Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        required
                        placeholder="Describe the CooperatingPartner details here..."
                    />
                </Form.Group>

                <hr className="my-4" />

                {/* Actions */}
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