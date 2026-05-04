import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import dataFacade from '../../services/dataFacade'; 

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const currentUsername = localStorage.getItem('user_name');
    if (currentUsername) {
      const fetchedUser = await dataFacade.getUserByUsername(currentUsername);
      if (fetchedUser) {
        setUser(fetchedUser);
        setEditData(fetchedUser);
      }
    }
  };

  const handleShow = () => {
    setEditData(user); 
    setError('');
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = async () => {
    setError('');
    try {
      if (editData.username !== user.username) {
        const existingUser = await dataFacade.getUserByUsername(editData.username);
        if (existingUser) {
          setError("Username is already taken. Please choose another.");
          return;
        }
      }

      await dataFacade.updateUser(user.id, editData);

      if (editData.username !== user.username) {
        localStorage.setItem('user_name', editData.username);
      }

      setUser(editData);
      handleClose();
    } catch (err) {
      console.error("Failed to update profile", err);
      setError("Failed to update profile. Please try again.");
    }
  };

  if (!user) return <Container className="py-5 text-center">Loading profile...</Container>;

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card style={{ width: '600px' }} className="shadow-sm p-4">
        <h2 className="text-center mb-4">User Profile</h2>
        <Card.Body>
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">Username:</Col>
            <Col sm={8}>{user.username}</Col>
          </Row>
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">Full Name:</Col>
            <Col sm={8}>{user.firstName} {user.lastName}</Col>
          </Row>
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">Email:</Col>
            <Col sm={8}>{user.email}</Col>
          </Row>
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">Phone:</Col>
            <Col sm={8}>{user.phone}</Col>
          </Row>
          
          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleShow} className="px-4 py-2 fw-bold">
              Edit Profile
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger text-center py-2">{error}</div>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={editData.username || ''}
                onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value.trim() }))}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editData.firstName || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editData.lastName || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={editData.email || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={editData.phone || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfile;