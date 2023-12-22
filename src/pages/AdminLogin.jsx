import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      console.log('hello')
      navigate('/dashboard')
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Container className='pt-5'>
      <h1>Admin Login</h1>
      <p>User: admin,  password: password</p>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-4'>
          Login
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Form>
    </Container>
  );
};

export default AdminLogin;
