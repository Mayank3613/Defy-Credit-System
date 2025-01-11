import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/rest-auth/login/', {
        email,
        password,
      });

      const token = response.data.key;
      localStorage.setItem('token', token);  // Save the token in localStorage

      setResponseMessage('Login successful!');
      setTimeout(() => {
        navigate('/income-list');  // Redirect to the income list page
      }, 2000); // Wait for 2 seconds before redirect
    } catch (error) {
      setErrorMessage('Invalid credentials, please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', paddingTop: 5 }}>
      <Typography variant="h3" gutterBottom>Login</Typography>
      <Card sx={{ padding: 3, boxShadow: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Login
          </Button>
        </form>
        {responseMessage && (
          <Typography variant="body1" color="green" sx={{ marginTop: 2 }}>
            {responseMessage}
          </Typography>
        )}
        {errorMessage && (
          <Typography variant="body1" color="red" sx={{ marginTop: 2 }}>
            {errorMessage}
          </Typography>
        )}
      </Card>
    </Container>
  );
}

export default Login;