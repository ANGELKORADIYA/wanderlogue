import React from 'react';
import PhotoGallery from './PhotoGallery';
import './postdetails.css';

const PostDetails = ({ post }) => {
  const { title, destination, description, country, state, district, photoData, date, category, rating, itinerary } = post;

  // Function to generate star icons based on the rating
  const renderRatingStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return stars;
  };

  return (
    <section className="post-details-container">
      <PhotoGallery photos={photoData} />
      <div className="post-details">
        <div className="details">
          <h2>{title}</h2>
          <div className="info">
              <h3>Description: {description}</h3>
              <h3>Location: {country}, {state}, {district}</h3>
              <h3>Category: {category}</h3>
              <h3>Rating: {renderRatingStars()}</h3>
              <h3>Itinerary: {itinerary}</h3>
          </div>
        </div>
      </div>
      <div className="location">
        <h3>Location: {destination}</h3>
              <h3>Date: {date}</h3>
      </div>
    </section>
  );
};

export default PostDetails;
