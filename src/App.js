import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import MedicineDetails from './components/MedicineDetails/MedicineDetails';
import EditMedicine from './components/MedicineDetails/EditMedicine';


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
      </Routes>
    </Router>
  );
};

export default App;