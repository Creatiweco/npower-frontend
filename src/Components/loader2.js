import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

const Loader = ({ progress }) => {

  return (
    <div className="loader-container">
      <img 
        style={{width:"10%"}}
        src="/Assets/image/gifimage/lightning5.gif"
        alt="NPower Full Logo"
      />
    </div>
  );
};

export default Loader;
