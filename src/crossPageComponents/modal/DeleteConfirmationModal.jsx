import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

const DeleteConfirmationModal = ({ 
    show, 
    onHide, 
    onConfirm, 
    itemName, 
    usageList = [], 
    title = "Confirm Delete" 
}) => {
  const isInUse = usageList.length > 0;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className={isInUse ? "text-danger" : ""}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isInUse ? (
          <>
            <Alert variant="danger">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <strong>Cannot delete "{itemName}"</strong>. It is currently being used by the following items:
            </Alert>
            <ul className="text-muted small" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {usageList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="mb-0 mt-2 small text-secondary">
               Please update these items before deleting this entry.
            </p>
          </>
        ) : (
          <p>Are you sure you want to remove <strong>{itemName || "this item"}</strong>?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
    <Button variant="secondary" onClick={onHide}>
        {usageList.length > 0 ? "Close" : "Cancel"}
    </Button>
    
    {usageList.length === 0 && (
        <Button variant="danger" onClick={onConfirm}>
            Delete
        </Button>
    )}
</Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;