import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const AboutBrands = () => {
  const { data, loading, error, api } = useFetch(
    "/about-page?populate=BrandTab.Images"
  );

  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    if (data && data.BrandTab && data.BrandTab.length > 0) {
      setActiveTab(data.BrandTab[0].id); 
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const tabs = data.BrandTab || [];
  const activeTabContent =
    tabs.find((tab) => tab.id === activeTab)?.Images || [];

  return (
    <div className="about-brand-area">
      <div className="container">
        <h2>Brands</h2>
        <div className="tab-buttons">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? "active" : ""}
            >
              {tab.TabName}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTabContent.map((image, index) => (
            <img
              key={index}
              src={`${api}${image.url}`}
              alt={`Tab ${activeTab} - ${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutBrands;
