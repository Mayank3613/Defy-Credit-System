import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function IncomeForm() {
  const [incomeData, setIncomeData] = useState({
    main_income: '',
    equity_profit: '',
    crypto_profit: '',
    rental_income: '',
    which_month: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/user-income/', incomeData, {
        headers: { Authorization: `Token ${token}` },
      });
      setResponseMessage('Income added successfully!');
      setTimeout(() => navigate('/income-list'), 2000); // Redirect after 2 seconds
    } catch (error) {
      setErrorMessage('Failed to add income. Please check your input.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', paddingTop: 5 }}>
      <Typography variant="h3" gutterBottom>Add Income</Typography>
      <Card sx={{ padding: 3, marginTop: 3, boxShadow: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="main_income"
            label="Main Income"
            value={incomeData.main_income}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="equity_profit"
            label="Equity Profit"
            value={incomeData.equity_profit}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="crypto_profit"
            label="Crypto Profit"
            value={incomeData.crypto_profit}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="rental_income"
            label="Rental Income"
            value={incomeData.rental_income}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="which_month"
            label="Which Month"
            value={incomeData.which_month}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Submit
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

export default IncomeForm;