import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setResponseMessage('');

    try {
      await axios.post('http://127.0.0.1:8000/rest-auth/registration/', formData);
      setResponseMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } catch (error) {
      setErrorMessage(
        error.response?.data?.non_field_errors ||
        error.response?.data?.username ||
        error.response?.data?.email ||
        error.response?.data?.password1 ||
        error.response?.data?.password2 ||
        'An error occurred during registration.'
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', paddingTop: 5 }}>
      <Typography variant="h3" gutterBottom>Register</Typography>
      <Card sx={{ padding: 3, marginTop: 3, boxShadow: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            name="password1"
            label="Password"
            value={formData.password1}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            name="password2"
            label="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Register
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

export default Registration;