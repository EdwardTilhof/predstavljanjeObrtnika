import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { regions } from "../../../../dataRepository/locations/RegionsData";
import { useUser } from "@clerk/clerk-react";

const AddEditModalProjectsMain = ({ show, onHide, onSave, data, setData, editMode }) => {
    const { user, isLoaded } = useUser();

    const isDevAdmin = localStorage.getItem("dev_admin") === "true";
    const isEditor = isDevAdmin || (isLoaded && (user?.publicMetadata?.role === 'admin' || user?.publicMetadata?.role === 'editor'));

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? "Edit Project" : "Add New Project"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Project Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={data.title || ''}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                    placeholder="e.g. Apartment building 205"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={data.image || ''}
                                    onChange={(e) => setData({ ...data, image: e.target.value })}
                                    placeholder="https://placehold.co/600x400"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Description (Short Text)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={data.text || ''}
                            onChange={(e) => setData({ ...data, text: e.target.value })}
                            placeholder="Briefly describe the project..."
                        />
                    </Form.Group>

                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Select
                                    value={data.location || ''}
                                    onChange={(e) => setData({ ...data, location: e.target.value })}
                                >
                                    <option value="">Select a region...</option>
                                    {regions.map((region) => (
                                        <option key={region.id} value={region.name}>
                                            {region.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={data.date || ''}
                                    onChange={(e) => setData({ ...data, date: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Investment (EUR)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={data.investment || ''}
                                    onChange={(e) => setData({ ...data, investment: e.target.value })}
                                    placeholder="3000"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
           <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button
                    variant="primary"
                    onClick={onSave}
                    disabled={!isEditor} 
                >
                    {editMode ? "Update Project" : "Create Project"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEditModalProjectsMain;