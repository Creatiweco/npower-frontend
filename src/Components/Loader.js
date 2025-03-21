import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

const Loader = () => {

  return (
    <div className="loader-container">
      <img 
        className="npower-full"
        src="/Assets/image/n-powerunightning.png"
        alt="NPower Full Logo"
      />
      <img 
        className="npower-lightning" 
        src="/Assets/image/npowerlightning.png" 
        alt="NPower Lightning Logo"
      />
    </div>
  );
};

export default Loader;
