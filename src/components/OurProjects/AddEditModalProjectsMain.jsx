import React, { useRef, useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import RichTextEditorQuill from "../../crossPageComponents/txtEditors/txtEditorQuill/EditorQuill";
// date picker and calendar
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dataFacade from "../../services/dataFacade";



const AddEditModalProjectsMain = ({ show, onHide, onSave, data, setData, editMode }) => {
    
const dateInputRef = useRef(null);
const [regions, setRegions] = useState([]);

const handleInputClick = () => {
    if (dateInputRef.current) {
        dateInputRef.current.showPicker();
    }
};

useEffect(() => {
    if (show) {
        dataFacade.getRegions().then(setRegions);
    }
}, [show]);

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
                                    onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
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
                                    onChange={(e) => setData(prev => ({ ...prev, image: e.target.value }))}
                                    placeholder="https://placehold.co/600x400"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Description (Short Text)</Form.Label>
                        <RichTextEditorQuill
                            rows={2}
                            value={data.text || ''}
                            onChange={(html) => setData(prev => ({ ...prev, text: html }))}
                            placeholder="Briefly describe the project..."
                        />
                    </Form.Group>

                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Select
                                    value={data.location || ''}
                                    onChange={(e) => setData(prev => ({ ...prev, location: e.target.value }))}
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
                                <DatePicker
                                    selected={data.date ? new Date(data.date) : null}
                                    onChange={(date) => setData(prev => ({ ...prev, date: date.toISOString().split('T')[0] }))}
                                    className="form-control" 
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="Select a date"
                                    calendarClassName="custom-calendar-popup" 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Investment (EUR)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={data.investment || ''}
                                    onChange={(e) => setData(prev => ({ ...prev, investment: e.target.value }))}
                                    placeholder="3000"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={onSave}>
                    {editMode ? "Update Project" : "Create Project"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEditModalProjectsMain;