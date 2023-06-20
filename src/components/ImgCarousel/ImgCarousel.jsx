import React, { useState, useEffect } from "react";
import "./CarouselStyle.scss";

const ImgCarousel = ({ img, slideDuration }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % img.length);
    }, slideDuration);

    return () => clearInterval(interval);
  }, [img.length, slideDuration]);

  return (
    <div className="carousel">
      <div className="container-carousel">
        <div
          className="carousel__inner"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {img.map((img, index) => (
            <div key={index} className="carousel__slide">
              <img src={img} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImgCarousel;
