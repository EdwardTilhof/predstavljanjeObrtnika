import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PLACEHOLDER_IMAGE } from "../../Constants";
import RichTextEditorQuill from "../../crossPageComponents/txtEditors/txtEditorQuill/EditorQuill";

const AddEditModalProjectGallery = ({ show, onHide, onSave, data, setData, editMode, title }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? `Edit ${title}` : `Add ${title}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Uniform CSS */}
                    <div className="text-center mb-3">
                        <p className="small text-muted">Preview:</p>
                        <img
                            src={data.url || PLACEHOLDER_IMAGE}
                            alt="Preview"
                            className="uniform-gallery-img"
                        />
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            value={data.url || ''}
                            onChange={(e) => setData(prev => ({ ...prev, url: e.target.value }))}
                            placeholder={PLACEHOLDER_IMAGE}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={data.title || ''}
                            onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter image title"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <RichTextEditorQuill
                            rows={3}
                            value={data.description || ''}
                            onChange={(html) => setData(prev => ({ ...prev, description: html }))}
                            placeholder="Enter image description"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={onSave}>
                    {editMode ? "Save Changes" : "Add Image"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEditModalProjectGallery;