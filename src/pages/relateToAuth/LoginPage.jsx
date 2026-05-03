import React, { useState } from 'react';
import { Container, Form, Button, Card, Nav } from 'react-bootstrap';
import { loginUser } from '../../Permissions/AuthService';
import { ROUTES } from '../../constants';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const success = await loginUser(username.trim(), password);
    if (success) {
      window.location.href = "/";
    } else {
      setLoginError("Invalid username or password.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <Card style={{ width: '400px' }} className="p-4 shadow">
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
          <Button as={Link} to={ROUTES.REGISTRATION} variant="primary" className="w-100 mt-2">
            Sign up
          </Button>
          <div>Admin log in information:</div>
          <div> username- admin / password- 0000</div>
        </Form>
        {loginError && (
          <p className="text-danger text-center mt-3">{loginError}</p>
        )}
      </Card>
    </Container>
  );
};

export default LoginPage; 