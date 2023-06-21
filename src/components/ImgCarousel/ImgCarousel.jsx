import React, { useState, useEffect } from "react";
import "./CarouselStyle.scss";

const ImgCarousel = ({ img, imgMobile, slideDuration }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const Mobile = window.innerWidth <= 600;

  const images = Mobile ? imgMobile : img;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, slideDuration);

    return () => clearInterval(interval);
  }, [images.length, slideDuration]);

  return (
    <div className="carousel">
      <div className="container-carousel">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="carousel-slide">
              <img
                className="carousel-slide-img"
                src={img}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImgCarousel;
