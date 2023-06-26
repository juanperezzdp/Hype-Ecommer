import React, { useState, useEffect } from "react";
import "./CarouselStyle.scss";

const ImgCarousel = ({ img, imgMobile, slideDuration, titleOne, titletwo }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const Mobile = window.innerWidth <= 800;

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
          style={{
            width: "100%",
            height: "30rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "1",
            position: "absolute",
          }}
        >
          <div className="container-title">
            <h1 className="title-new">{titleOne}</h1>
            <h1 className="title-colletion">{titletwo}</h1>
          </div>
        </div>
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
