import React from "react";

const WhatWeDo = ({ whatWeDoData }) => {
  if (!whatWeDoData) return null;

  return (
    <div className="whatwedo-area">
      <div className="container whatwedo-main">
        {whatWeDoData.image && <img src={whatWeDoData.image} alt={whatWeDoData.imageAlt} />}
        <div className="whatwedo-content">
          <h2>{whatWeDoData.title}</h2>
          <p className="desc1">{whatWeDoData.description1}</p>
          <p className="desc2">{whatWeDoData.description2}</p>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
