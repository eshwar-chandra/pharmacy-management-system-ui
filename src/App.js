import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import MedicineDetails from './components/MedicineDetails/MedicineDetails';
import EditMedicine from './components/MedicineDetails/EditMedicine';
import StockEntry from './components/Stocks/StockEntry';
import StockReturns from './components/Stocks/StockReturns';
import Sales from './components/Sales/Sales';
import SalesReturn from './components/Sales/SalesReturn';
import Taxes from './components/Taxes/Taxes';
import Reports from './components/Reports/Reports';
import AddMedicine from './components/MedicineDetails/AddMedicine';


const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={<Layout username={user} onLogout={handleLogout} />} />
        <Route path="/medicine-details" element={
          <Layout username={user} onLogout={handleLogout}>
            <MedicineDetails />
          </Layout>
        } />
        <Route path="/edit-medicine/:id" element={
            <Layout username={user} onLogout={handleLogout}>
                <EditMedicine />
            </Layout>
        } />
        <Route path="/add-medicine" element={
            <Layout username={user} onLogout={handleLogout}>
                <AddMedicine />
            </Layout>
        } />
        <Route path="/stock-entry" element={
            <Layout username={user} onLogout={handleLogout}>
                <StockEntry />
            </Layout>
        } />
        <Route path="/stock-returns" element={
            <Layout username={user} onLogout={handleLogout}>
                <StockReturns />
            </Layout>
        } />
        <Route path="/sales" element={
            <Layout username={user} onLogout={handleLogout}>
                <Sales />
            </Layout>
        } />
        <Route path="/sales-return" element={
            <Layout username={user} onLogout={handleLogout}>
                <SalesReturn />
            </Layout>
        } />        
        <Route path="/taxes" element={
            <Layout username={user} onLogout={handleLogout}>
                <Taxes />
            </Layout>
        } />
        <Route path="/reports" element={
            <Layout username={user} onLogout={handleLogout}>
                <Reports />
            </Layout>
        } />                 
      </Routes>
    </Router>
  );
};

export default App;