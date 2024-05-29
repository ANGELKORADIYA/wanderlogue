import React, { useState } from 'react';
import './photogallery.css';

const PhotoGallery = ({ photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const goToNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const goToPreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  return (
    <div className="photo-gallery">
      <div className="photo-container">
        <img src={photos[currentPhotoIndex]} alt={`Photo ${currentPhotoIndex + 1}`} />
        <div className="overlay">
          <button className="prev" onClick={goToPreviousPhoto}>&#10094;</button>
          <button className="next" onClick={goToNextPhoto}>&#10095;</button>
        </div>
      </div>
      <div className="photo-indicator">{`${currentPhotoIndex + 1}/${photos.length}`}</div>
    </div>
  );
};

export default PhotoGallery;
