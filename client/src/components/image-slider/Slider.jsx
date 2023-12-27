import React, { useState, useEffect } from 'react';
import './Slider.css'; // Import CSS file for styling

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to go to the next slide
  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous slide
  const goToPreviousSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Function to change slide automatically after a specified interval
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000); // Change slide every 5 seconds (adjust the interval as needed)

    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex]);

  return (
    <div className="image-slider">
      <button className='prev-btn' onClick={goToPreviousSlide}><i className="fa-solid fa-angle-left"></i></button>
      {images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Slide ${index + 1}`}
          className={`slider-image ${
            index === currentImageIndex ? 'active' : ''
          }`}
        />
      ))}
      <button className='next-btn' onClick={goToNextSlide}><i className="fa-solid fa-angle-right"></i></button>
    </div>
  );
};

export default ImageSlider;
