import React from 'react';
import { Button, Col, Form, Row, Stack, InputGroup, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";

const PartnerFormUI = ({
    title,
    formData,
    setFormData,
    onSubmit,
    error,
    categories,
    regions,
    isEdit = false
}) => {

    {/*Update array section */ }
    const updateArray = (key, index, value) => {
        const newArray = [...formData[key]];
        newArray[index] = value;
        setFormData({ ...formData, [key]: newArray });
    };

    const addField = (key) => setFormData({ ...formData, [key]: [...formData[key], ""] });

    const removeField = (key, index) => {
        const newArray = formData[key].filter((_, i) => i !== index);
        setFormData({ ...formData, [key]: newArray.length ? newArray : [""] });
    };

    return (
        <Form onSubmit={onSubmit} className="shadow p-4 rounded custom-card border bg-white">
            <h3 className="mb-4">{title}</h3>
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Work Titles Section */}
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Work Titles</Form.Label>
                {formData?.titles?.map((t, i) => (
                    <InputGroup className="mb-2" key={i}>
                        <Form.Control
                            value={t}
                            onChange={(e) => updateArray('titles', i, e.target.value)}
                            placeholder="e.g. Web Development"
                            required
                        />
                        <Button variant="outline-danger" onClick={() => removeField('titles', i)} disabled={formData.titles.length === 1}>×</Button>
                    </InputGroup>
                ))}
                <Button variant="outline-primary" size="sm" onClick={() => addField('titles')}>+ Add Title</Button>
            </Form.Group>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Label className="fw-bold">Category</Form.Label>
                    <Form.Select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                    >
                        <option value="">Select category...</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </Form.Select>
                </Col>
                <Col md={6}>
                    <Form.Label className="fw-bold">Company Name</Form.Label>
                    <Form.Control
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                    />
                </Col>
            </Row>

            {/* Regions Section */}
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Operating Regions</Form.Label>
                {formData?.regions?.map((r, i) => (
                    <InputGroup className="mb-2" key={i}>
                        <Form.Select
                            value={r}
                            onChange={(e) => updateArray('regions', i, e.target.value)}
                            required
                        >
                            <option value="">Select region...</option>
                            {regions.map(reg => <option key={reg.id} value={reg.id}>{reg.name}</option>)}
                        </Form.Select>
                        <Button variant="outline-danger" onClick={() => removeField('regions', i)}>×</Button>
                    </InputGroup>
                ))}
                <Button variant="outline-primary" size="sm" onClick={() => addField('regions')}>+ Add Region</Button>
            </Form.Group>

            <Row className="mb-3">
                <Col md={4}><Form.Label>Investment (EUR)</Form.Label><Form.Control type="number" value={formData.cost} onChange={(e) => setFormData({ ...formData, cost: e.target.value })} /></Col>
                <Col md={4}><Form.Label>Duration (Wks)</Form.Label><Form.Control type="number" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} /></Col>
                <Col md={4}><Form.Label>Contact</Form.Label><Form.Control type="text" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} /></Col>
            </Row>

            <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </Form.Group>

            <Stack direction="horizontal" gap={3} className="justify-content-end">
                <Link to={ROUTES.CooperatingPartners} className="btn btn-outline-secondary">Cancel</Link>
                <Button type="submit" variant="primary" className="px-4">{isEdit ? "Save Changes" : "Add Partner"}</Button>
            </Stack>
        </Form>
    );
};

export default PartnerFormUI;