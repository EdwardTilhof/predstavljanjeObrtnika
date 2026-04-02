import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useDataSource } from '../DataSource/DataSourceContext';
import AuthLogic from './AuthLogic';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';

const Register = () => {
    const { dataSource } = useDataSource();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState({ text: '', variant: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', variant: '' });

        if (formData.password !== formData.confirmPassword) {
            setMessage({ text: "Passwords do not match!", variant: "danger" });
            return;
        }

        try {
            const result = await AuthLogic.register(formData, dataSource);
            console.log("Registered in:", dataSource, "Current Data:", localStorage.getItem('users'));

            if (result.success) {
                setMessage({
                    text: `Account created successfully in ${dataSource}!`,
                    variant: "success"
                });
                setFormData({ username: '', email: '', password: '', confirmPassword: '' });
            } else {
                setMessage({ text: result.error || "Registration failed", variant: "danger" });
            }
        } catch (error) {
            setMessage({ text: "A system error occurred.", variant: "danger" });
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card className="shadow-sm p-4">
                        <Card.Body>
                            <h2 className="text-center mb-4">Register</h2>

                            <p className="text-center text-muted small">
                                Saving to: <strong>{dataSource}</strong>
                            </p>

                            {message.text && (
                                <Alert variant={message.variant} className="py-2 text-center">
                                    {message.text}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="regUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        placeholder="Choose a username"
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="regEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        placeholder="Enter email"
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="regPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        placeholder="Create password"
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="regConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        placeholder="Repeat password"
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100">
                                    Create Account
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                <small>Already have an account?
                                    <Link to={ROUTES.login}>Login here</Link></small>                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;