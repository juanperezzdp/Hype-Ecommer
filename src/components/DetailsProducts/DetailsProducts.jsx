import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./DetailsProducts.scss";
import Loading from "../Loading/Loading";

function DetailsProducts() {
  const [valueImag, setvalueImag] = useState("");
  const [imageWidth, setImageWidth] = useState(null);

  const location = useLocation();
  const detailData = location.state && location.state.detailData;

  const handleValueImg = (imageUrl) => {
    setvalueImag(imageUrl);
  };

  const handleImageClick = (index) => {
    setImageWidth(index);
  };

  if (detailData === null) {
    return <Loading />;
  }

  const discount =
    (parseFloat(detailData.price) * parseFloat(detailData.stock)) / 100;
  const discountedPrice = parseFloat(detailData.price) - discount;
  const formattedDiscountedPrice = discountedPrice.toLocaleString("es-CO");

  return (
    <>
      <Navbar />
      <div className="container-datails">
        <div className="container-img-details">
          <div className="container-btn-product-image">
            <img
              onClick={() => {
                handleValueImg(detailData.urls[0]);
                handleImageClick(0);
              }}
              className="btn-product-image"
              style={{
                width: imageWidth === 0 ? "6rem" : "5rem",
                border:
                  imageWidth === 0
                    ? "2px solid seagreen"
                    : "2px solid #7878786d",
              }}
              src={detailData.urls[0]}
              alt="img"
            />

            <img
              onClick={() => {
                handleValueImg(detailData.urls[1]);
                handleImageClick(1);
              }}
              className="btn-product-image"
              style={{
                width: imageWidth === 1 ? "6rem" : "5rem",
                border:
                  imageWidth === 1
                    ? "2px solid seagreen"
                    : "2px solid #7878786d",
              }}
              src={detailData.urls[1]}
              alt="img"
            />
            <img
              onClick={() => {
                handleValueImg(detailData.urls[2]);
                handleImageClick(2);
              }}
              className="btn-product-image"
              style={{
                width: imageWidth === 2 ? "6rem" : "5rem",
                border:
                  imageWidth === 2
                    ? "2px solid seagreen"
                    : "2px solid #7878786d",
              }}
              src={detailData.urls[2]}
              alt="img"
            />
            <img
              onClick={() => {
                handleValueImg(detailData.urls[3]);
                handleImageClick(3);
              }}
              className="btn-product-image"
              style={{
                width: imageWidth === 3 ? "6rem" : "5rem",
                border:
                  imageWidth === 3
                    ? "2px solid seagreen"
                    : "2px solid #7878786d",
              }}
              src={detailData.urls[3]}
              alt="img"
            />
          </div>
          <div className="img-products-view">
            <img src={valueImag ? valueImag : detailData.urls[0]} alt="img" />
          </div>
        </div>

        <div className="container-details-description">
          <div className="cart-details-description">
            <div className="container-details-description">
              <h1 className="details-description">{detailData.title}</h1>
              <p className="details-percentage">-{detailData.stock}%</p>
            </div>

            <p className="details-price">
              $
              {typeof detailData.price === "string" &&
                parseFloat(detailData.price).toLocaleString("es-CO")}
            </p>
            <p className="details-price">$ {formattedDiscountedPrice}</p>
            <p>{detailData.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsProducts;
