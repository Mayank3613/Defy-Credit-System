import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import IncomeList from './components/IncomeList';
import IncomeForm from './components/IncomeForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/income-list"
          element={
            <ProtectedRoute>
              <IncomeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-income"
          element={
            <ProtectedRoute>
              <IncomeForm />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;