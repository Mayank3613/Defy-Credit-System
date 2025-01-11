import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Button, Container, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function IncomeList() {
  const [incomeData, setIncomeData] = useState([]);
  const [creditScore, setCreditScore] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch income data and credit score
  const fetchIncomeData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    try {
      // Fetch income data
      const incomeResponse = await axios.get('http://127.0.0.1:8000/api/user-income/', {
        headers: { Authorization: `Token ${token}` },
      });
      setIncomeData(incomeResponse.data);

      // Fetch credit score data
      const creditScoreResponse = await axios.get('http://127.0.0.1:8000/api/user-income/your-credit-score/', {
        headers: { Authorization: `Token ${token}` },
      });
      setCreditScore(creditScoreResponse.data.credit_score);  // Update to use the correct key

    } catch (error) {
      setErrorMessage('Failed to fetch data. Please try again.');
    }
  };

  useEffect(() => {
    fetchIncomeData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
      <Typography variant="h3" gutterBottom>Income List</Typography>

      {errorMessage && (
        <Typography variant="body1" color="red" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <Card sx={{ padding: 3, marginBottom: 3, boxShadow: 3 }}>
        {/* Display credit score */}
        {creditScore !== null ? (
          <Typography variant="h6" color={creditScore > 700 ? 'green' : creditScore > 400 ? 'orange' : 'red'} sx={{ marginBottom: 2 }}>
            Your Credit Score: {creditScore}
          </Typography>
        ) : (
          <CircularProgress />
        )}

        {/* Add Income button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/add-income')}>
            Add Income
          </Button>
        </Box>

        {/* Income Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Main Income</TableCell>
                <TableCell>Equity Profit</TableCell>
                <TableCell>Crypto Profit</TableCell>
                <TableCell>Rental Income</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomeData.map((income) => (
                <TableRow key={income.id}>
                  <TableCell>{income.id}</TableCell>
                  <TableCell>{income.main_income}</TableCell>
                  <TableCell>{income.equity_profit}</TableCell>
                  <TableCell>{income.crypto_profit}</TableCell>
                  <TableCell>{income.rental_income}</TableCell>
                  <TableCell>{income.which_month}</TableCell>
                  <TableCell>{new Date(income.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}

export default IncomeList;