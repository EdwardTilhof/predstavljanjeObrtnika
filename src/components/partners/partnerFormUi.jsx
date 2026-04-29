import React from 'react';
import { Button, Col, Form, Row, Stack, InputGroup, Alert, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";
import RichTextEditorQuill from '../../crossPageComponents/txtEditors/txtEditorQuill/EditorQuill';

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

    const handleGeneratePlaceholder = () => {
        const company = formData.company || "Company";
        const categoryObj = categories.find(c => c.id === formData.category);
        const categoryName = categoryObj ? categoryObj.name : "Category";

        const generatedUrl = `https://placehold.co/600x400?text=${company.replace(/\s/g, '+')}+|+${categoryName.replace(/\s/g, '+')}`;

        setFormData(prev => ({ ...prev, companyImage: generatedUrl }));
    };

    /* Update array section */
    const updateArray = (key, index, value) => {
        setFormData(prev => {
            if (key === 'regions') {
                const isDuplicate = prev[key].some((item, i) => i !== index && item === value);
                if (isDuplicate && value !== "") {
                    alert("This region has already been added.");
                    return prev;
                }
            }
            const newArray = [...prev[key]];
            newArray[index] = value;
            return { ...prev, [key]: newArray };
        });
    };

    const addField = (key) => {
        setFormData(prev => ({ ...prev, [key]: [...prev[key], ""] }));
    };

    const removeField = (key, index) => {
        setFormData(prev => {
            const newArray = prev[key].filter((_, i) => i !== index);
            return { ...prev, [key]: newArray.length ? newArray : [""] };
        });
    };

    return (
        <Form onSubmit={onSubmit} className="shadow p-4 rounded custom-card border bg-white">
            <h2 className="mb-4 text-primary">{title}</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {/* Image Management Section */}
            <Row className="mb-4 align-items-end">
                <Col md={8}>
                    <Form.Group>
                        <Form.Label className="fw-bold">Company Logo / Image URL</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="https://example.com/image.png"
                                value={formData.companyImage || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, companyImage: e.target.value }))}
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={handleGeneratePlaceholder}
                                title="Generate placeholder based on name and category"
                            >
                                <i className="bi bi-magic me-2"></i>
                                Generate
                            </Button>
                        </InputGroup>
                        <Form.Text className="text-muted">
                            Provide a company name and category click "Generate" to create a placeholder.
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col md={4} className="text-center">
                    <div className="border rounded bg-light d-flex align-items-center justify-content-center" style={{ height: '100px', overflow: 'hidden' }}>
                        {formData.companyImage ? (
                            <Image src={formData.companyImage} alt="Preview" fluid style={{ maxHeight: '100%' }} />
                        ) : (
                            <span className="text-muted small">No Image Preview</span>
                        )}
                    </div>
                </Col>
            </Row>

            {/* Work Titles Section */}
            <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Partner Titles / Services</Form.Label>
                {formData.titles.map((t, index) => (
                    <InputGroup className="mb-2" key={`title-${index}`}>
                        <Form.Control
                            placeholder="e.g. Senior Software Architect"
                            value={t}
                            onChange={(e) => updateArray('titles', index, e.target.value)}
                            required
                        />
                        {formData.titles.length > 1 && (
                            <Button variant="outline-danger" onClick={() => removeField('titles', index)}>
                                <i className="bi bi-dash-lg"></i>
                            </Button>
                        )}
                    </InputGroup>
                ))}
                <Button variant="outline-primary" size="sm" onClick={() => addField('titles')}>
                    + Add Another Title
                </Button>
            </Form.Group>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold">Main Category</Form.Label>
                        <Form.Select
                            value={formData.category}
                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                            required
                        >
                            <option value="">Select Category...</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold">Company Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. Tech Solutions Ltd."
                            value={formData.company}
                            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            {/* Regions Section */}
            <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Operating Regions</Form.Label>
                <Row>
                    {formData.regions.map((regId, index) => (
                        <Col md={4} key={`region-${index}`} className="mb-2">
                            <InputGroup>
                                <Form.Select
                                    value={regId}
                                    onChange={(e) => updateArray('regions', index, e.target.value)}
                                    required
                                >
                                    <option value="">Select Region...</option>
                                    {regions.map(r => (
                                        <option key={r.id} value={r.id}>{r.name}</option>
                                    ))}
                                </Form.Select>
                                {formData.regions.length > 1 && (
                                    <Button variant="outline-danger" onClick={() => removeField('regions', index)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                )}
                            </InputGroup>
                        </Col>
                    ))}
                </Row>
                <Button variant="outline-primary" size="sm" onClick={() => addField('regions')}>
                    + Add Region
                </Button>
            </Form.Group>

            <Row className="mb-4">
                <Col md={3}>
                    <Form.Label className="fw-bold">Cost (EUR)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="3000"
                        value={formData.cost}
                        onChange={(e) => setFormData(prev => ({ ...prev, cost: e.target.value }))}
                    />
                </Col>
                <Col md={3}>
                    <Form.Label className="fw-bold">Duration (Days)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="30"
                        value={formData.duration}
                        onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    />
                </Col>
                <Col md={3}>
                    <Form.Label className="fw-bold">Contact Info</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="email or phone"
                        value={formData.contact}
                        onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                    />
                </Col>
                <Col md={3}>
                    <Form.Label className="fw-bold">Importance</Form.Label>
                    <Form.Control
                        type="number"
                        min="1"
                        placeholder="1 (Lowest)"
                        value={formData.importanceValue}
                        onChange={(e) => setFormData(prev => ({ ...prev, importanceValue: Number(e.target.value) }))}
                    />
                </Col>
            </Row>

            <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Project Description</Form.Label>
                <RichTextEditorQuill
                    value={formData.description}
                    onChange={(html) => setFormData(prev => ({ ...prev, description: html }))}
                    rows={4}
                />
            </Form.Group>

            <Stack direction="horizontal" gap={3} className="justify-content-end">
                <Link to={ROUTES.CooperatingPartners} className="btn btn-outline-secondary px-4">
                    Cancel
                </Link>
                <Button type="submit" variant="primary" className="px-5">
                    {isEdit ? "Update Partner" : "Create Partner"}
                </Button>
            </Stack>
        </Form>
    );
};

export default PartnerFormUI;