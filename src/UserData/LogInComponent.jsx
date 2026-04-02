import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'; 
import { useDataSource } from '../DataSource/DataSourceContext';
import AuthLogic from './AuthLogic'; 

const Login = () => {
  const { dataSource, loginUser } = useDataSource(); 
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await AuthLogic.login(credentials, dataSource);
    
    if (result.success) {
        // 1. Update the global state so NavBar shows the username
        loginUser(result.user); 
        
        // 2. Redirect to home
        navigate('/'); 
    } else {
        alert("Login failed: " + result.error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm border-0 p-4">
            <Card.Body>
              <h2 className="text-center mb-4 fw-bold">Login</h2>
              <Form onSubmit={handleLogin}>
                <p className="text-muted text-center small">
                  Authenticating via: <span className="badge bg-secondary">{dataSource}</span>
                </p>
                
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    placeholder="name@example.com" 
                    value={credentials.email}
                    onChange={handleChange}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password"
                    placeholder="Enter your password" 
                    value={credentials.password}
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2 fw-bold">
                  Login
                </Button>
              </Form>

              <hr className="my-4" />

              <div className="text-center">
                <p className="mb-1 text-muted">Don't have an account?</p>
                <Button as={Link} to="/register" variant="outline-success" size="sm">
                  Create New Account
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;