import React, { useState } from 'react';
import '../Styles/Employees.css';

function Employees() {
  const [time , setTime ] = useState('Yesterday');
  
  const stats = {
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    activeTime: "8:00",
    idleTime: "0:30",
    productiveTime: "6:00",
    unproductiveTime: "2:00"
  };
  
  const tasks = [
    { name: "Saas", time: "6:00" },
    { name: "Advertising", time: "2:00" },
    { name: "Street Food", time: "0:10" },
    { name: "Freelancing", time: "40:00" }
  ];
  
  const apps = [
    { name: "Android Studio", time: "6:00" },
    { name: "Chrome", time: "2:00" }
  ];
  
  const websites = [
    { name: "ChatGPT", time: "6:00" },
    { name: "Google", time: "2:00" }
  ];
  
  const screenshots = [
    "/api/placeholder/120/220",
    "/api/placeholder/120/220",
    "/api/placeholder/120/220"
  ];

  return (
    <div className="employee-dashboard">
     
      <div className="employee-dashboard-header">
        <button className="employee-dashboard-back-button">← Back</button>
        <h1>User Activity Report</h1>
        
        <select 
          className="employee-dashboard-timeframe-select" 
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option>Yesterday</option>
          <option>Today</option>
          <option>Last 7 Days</option>
          <option>This Month</option>
        </select>
      </div>
      
      <div className="employee-dashboard-card-container">
        <div className="employee-dashboard-card">
          <h2>Activity Stats</h2>
          <div className="employee-dashboard-card-content">
            <p><span>Start Time:</span> <span>{stats.startTime}</span></p>
            <p><span>End Time:</span> <span>{stats.endTime}</span></p>
            <p><span>Active Time:</span> <span>{stats.activeTime}</span></p>
            <p><span>Idle Time:</span> <span>{stats.idleTime}</span></p>
            <p><span>Productive Time:</span> <span className="productive">{stats.productiveTime}</span></p>
            <p><span>Unproductive Time:</span> <span className="unproductive">{stats.unproductiveTime}</span></p>
          </div>
        </div>
       
        <div className="employee-dashboard-card">
          <h2>Time spent on tasks</h2>
          <div className="employee-dashboard-card-content">
            {tasks.map((task, index) => (
              <p key={index}>
                <span>{task.name}:</span> 
                <span>{task.time}</span>
              </p>
            ))}
          </div>
        </div>
         
        <div className="employee-dashboard-card">
          <h2>Time spent on apps</h2>
          <div className="employee-dashboard-card-content">
            {apps.map((app, index) => (
              <p key={index}>
                <span>{app.name}:</span>
                <span>{app.time}</span>
              </p>
            ))}
          </div>
        </div>
         
        <div className="employee-dashboard-card">
          <h2>Time spent on websites</h2>
          <div className="employee-dashboard-card-content">
            {websites.map((website, index) => (
              <p key={index}>
                <span>{website.name}:</span>
                <span>{website.time}</span>
              </p>
            ))}
          </div>
        </div>
         
        <div className="employee-dashboard-card employee-dashboard-wide-card">
          <div className="employee-dashboard-card-header">
            <h2>Screenshots</h2>
            <button className="employee-dashboard-view-all-button">View All</button>
          </div>
          <div className="employee-dashboard-screenshots-container">
            {screenshots.map((screenshot, index) => (
              <img 
                key={index}
                src={screenshot} 
                alt={`Screenshot ${index + 1}`} 
                className="employee-dashboard-screenshot"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
