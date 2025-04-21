import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import ScreenShot from './Components/ScreenShot';
import Employees from './Components/Employees';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/screenshot" element={<ScreenShot />} />
            <Route path="/Employees" element={<Employees />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
