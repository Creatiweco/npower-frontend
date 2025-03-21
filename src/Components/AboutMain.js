import React from "react";

const AboutMain = ({ aboutMainData }) => {
  if (!aboutMainData) return null;

  return (
    <div className="about-main-area">
      <div className="container about-main">
        <div className="about-main-content">
          <h2>{aboutMainData.title}</h2>
          <h4>{aboutMainData.subtitle}</h4>
          <p>{aboutMainData.description}</p>
        </div>
        {aboutMainData.image && <img src={aboutMainData.image} alt={aboutMainData.imageAlt} />}
      </div>
    </div>
  );
};

export default AboutMain;
