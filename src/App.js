// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SnackSelection from './components/SnackSelector';
import UserAnalytics from './components/UserAnalytics.js';
import './App.css'; // Optional: Create a CSS file for styling the overall app
import Navigation from './Navigation';

function App() {
  return (
    <Router>
       <div>
       <Navigation />
      <Routes>
       
        <Route path="/analytics" element={<UserAnalytics />} /> {/* Updated syntax for v6 */}
        <Route path="/" element={<SnackSelection />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
