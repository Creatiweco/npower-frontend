import React from "react";

const VisionMision = ({ visionMisionData }) => {
  if (!visionMisionData) return null;

  return (
    <div className="vision-area">
      <div className="container vision-grid">
        <div className="vision-col">
          <img src={visionMisionData.vissionMissionImage} alt={visionMisionData.title} />
          <div className="vision-content">
            <h3>{visionMisionData.title}</h3>
            {visionMisionData.description.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
        </div>
        <div className="arge-col">
          <div className="arge-content">
            <h3>{visionMisionData.argeTitle}</h3>
            {visionMisionData.argeDescription.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
          <img src={visionMisionData.argeImage} alt={visionMisionData.argeTitle} />
        </div>
      </div>
    </div>
  );
};

export default VisionMision;
