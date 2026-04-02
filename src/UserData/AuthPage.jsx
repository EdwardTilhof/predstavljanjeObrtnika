import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import AuthLogic from './AuthLogic'; 

const AuthPage = ({ isRegisterMode, dataSource }) => {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [message, setMessage] = useState({ text: '', variant: '' });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isRegisterMode) {
      const result = await AuthLogic.register(formData, dataSource);
      setMessage(result.success 
        ? { text: "Account created in " + dataSource, variant: "success" }
        : { text: result.error, variant: "danger" });
    } else {
      const result = await AuthLogic.login({ email: formData.email, password: formData.password }, dataSource);
      setMessage(result.success 
        ? { text: "Welcome back! (Source: " + dataSource + ")", variant: "success" }
        : { text: "Invalid credentials", variant: "danger" });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="shadow custom-card">
            <Card.Body>
              <h2 className="text-center mb-4">{isRegisterMode ? 'Register' : 'Login'}</h2>
              
              {message.text && <Alert variant={message.variant}>{message.text}</Alert>}

              <Form onSubmit={handleSubmit}>
                {isRegisterMode && (
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" onChange={handleInput} required />
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" type="email" onChange={handleInput} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" type="password" onChange={handleInput} required />
                </Form.Group>

                <Button variant={isRegisterMode ? "success" : "primary"} type="submit" className="w-100">
                  {isRegisterMode ? "Create Account" : "Sign In"}
                </Button>
              </Form>
              
              <div className="mt-3 text-center">
                <small className="text-muted">Currently using: <strong>{dataSource}</strong></small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;