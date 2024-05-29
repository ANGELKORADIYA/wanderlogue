import React from 'react';
import Card from './Card';
import './cardcontainer.css'; // Import CSS file for styling

const CardContainer = ({ isSidebarActive }) => {
  return (
    <div className={`card-container ${isSidebarActive ? 'sidebar-open' : ''}`}>
      <Card
        title="Quiz"
        description="Test your knowledge with interactive quizzes."
        link="quiz"
      />
      <Card
        title="Quiz"
        description="Test your knowledge with interactive quizzes."
        link="hi"
      />
      <Card
        title="Quiz"
        description="Test your knowledge with interactive quizzes."
        link="hi"
      />
      <Card
        title="Quiz"
        description="Test your knowledge with interactive quizzes."
        link="hi"
      />
      <Card
        title="Article"
        description="Read interesting articles on various topics."
      />
      <Card
        title="Quiz"
        description="Test your knowledge with interactive quizzes."
      />
      <Card
        title="Article"
        description="Read interesting articles on various topics."
      />
      <Card
        title="Quiz"
        description="Test your knowledge with interactive quizzes."
      />
      <Card
        title="Article"
        description="Read interesting articles on various topics."
      />
      {/* Add more Card components here with different titles and descriptions */}
    </div>
  );
};

export default CardContainer;
