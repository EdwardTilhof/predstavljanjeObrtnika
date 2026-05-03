import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { registerUser } from '../../Permissions/AuthService';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: '', firstName: '', lastName: '',
    phone: '', email: '', password: '', confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match!");
    }

    const success = await registerUser(form);

    if (success) {
      navigate('/');
    } else {
      setError("Registration failed. That username might be taken.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '550px' }} className="p-4 shadow-sm">
        <h2 className="text-center mb-4">Create an Account</h2>

        {error && <div className="alert alert-danger text-center py-2">{error}</div>}

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Choose a username"
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />
          </Form.Group>

          {/* Group First Name and Last Name side-by-side using a Row */}
          <Row className="mb-3">
            <Form.Group as={Col} sm={6}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                onChange={e => setForm({ ...form, firstName: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group as={Col} sm={6}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={e => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              onChange={e => setForm({ ...form, phone: e.target.value })}
              required
            />
          </Form.Group>

          <Row className="mb-4">
            <Form.Group as={Col} sm={6}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group as={Col} sm={6}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                required
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" className="w-100 fw-bold py-2">
            Create Account
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default RegisterPage;