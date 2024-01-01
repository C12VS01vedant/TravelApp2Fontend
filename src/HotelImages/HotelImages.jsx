import { useState } from "react";
import "./HotelImages.css";

export const HotelImages = ({ SingleHotel }) => {
  const { image, imageArr } = SingleHotel;
  return(<div className="hotel-image-container d-flex gap-small">
  <div className="primary-image-container">
    <img
      className="primary-img"
      src={image}
      alt="primary-image"
    ></img>
  </div>
  <div className="d-flex wrap gap-small">
    {
        imageArr && imageArr.map(image => 
        <img 
        key={image} 
        className="hotel-img" 
        src={image} 
        alt='hotel-image'></img>)
    }
  </div>
</div>) ;
};
