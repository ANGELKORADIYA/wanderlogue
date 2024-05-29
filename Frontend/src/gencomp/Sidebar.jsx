import React, { useState } from 'react';
import './sidebar.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const Sidebar = ({setIsSidebarActive,isSidebarActive}) => {

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    
    <div className={`sidebar ${isSidebarActive ? 'open' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/contactus">Contact Us</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
