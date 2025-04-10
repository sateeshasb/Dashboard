import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import ScreenShot from './Components/ScreenShot';
// Remove the CSS import for now, we'll add the styles directly to an existing CSS file

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;