import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component for navigation
import './card.css'; // Import CSS file for styling

const Card = ({ title, description, link }) => {
  let currentPath = window.location.pathname; // Get the current path
  currentPath = currentPath.replace('/dashboard', ''); // Remove 'dashboard' from current path

  return (
    <Link to={`${currentPath}/${link}`} className="card-link">
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
