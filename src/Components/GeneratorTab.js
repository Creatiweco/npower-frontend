import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GeneratorTab = ({ tabs, tableData }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [activeRow, setActiveRow] = useState(0);
  const [groupSize, setGroupSize] = useState(4);

  useEffect(() => {
    const updateGroupSize = () => {
      if (window.innerWidth <= 780) {
        setGroupSize(1);
      } else if (window.innerWidth <= 1024) {
        setGroupSize(2);
      } else {
        setGroupSize(4);
      }
    };

    updateGroupSize();
    window.addEventListener("resize", updateGroupSize);
    return () => window.removeEventListener("resize", updateGroupSize);
  }, []);

  const groupedTabs = [];
  for (let i = 0; i < tabs.length; i += groupSize) {
    groupedTabs.push(tabs.slice(i, i + groupSize));
  }

  const handleTabClick = (tabKey, rowIndex) => {
    setActiveTab(tabKey);
    setSelectedDetail(null);
    setActiveRow(rowIndex);
  };

  return (
    <div className="tab-area">
      <div className="tab-section container">
        {groupedTabs.map((group, rowIndex) => (
          <div className="tab-row" key={rowIndex}>
            <div className="tabs">
              {group.map((tab) => (
                <button
                  key={tab.key}
                  className={`tab-button ${activeTab === tab.key ? "active" : ""}`}
                  onClick={() => handleTabClick(tab.key, rowIndex)}
                >
                  <img src={tab.image} alt={tab.label} />
                  <p>{tab.label}</p>
                </button>
              ))}
            </div>
            {activeRow === rowIndex && (
              <>
                <div className="table-section-wrapper">
                  <div className="table-section">
                    <table>
                      <thead>
                        <tr>
                          <th>{t("generator.model")}</th>
                          <th>{t("generator.backupPower")}</th>
                          <th>{t("generator.primaryPower")}</th>
                          <th>{t("generator.hz")}</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData[activeTab].map((row) => (
                          <React.Fragment key={row.id}>
                            <tr>
                              <td>{row.model}</td>
                              <td>{row.yedekGuc}</td>
                              <td>{row.birincilGuc}</td>
                              <td>{row.hz}</td>
                              <td>
                                <div className="tabs-table-button">
                                  <button
                                    className="table-button"
                                    onClick={() => setSelectedDetail(row)}
                                    style={{ marginLeft: "10px" }}
                                  >
                                    {t("generator.detail")}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {selectedDetail && (
                  <div className="table-details">
                    <div className="table-details-heading">
                      <div>
                        <h3>{selectedDetail.model}</h3>
                        <div className="tab-details-features">
                          <p>
                            <span>{t("generator.backupPower")}:</span> {selectedDetail.yedekGuc}
                          </p>
                          <p>
                            <span>{t("generator.primaryPower")}:</span> {selectedDetail.birincilGuc}
                          </p>
                          <p>
                            <span>{t("generator.hz")}:</span> {selectedDetail.hz}
                          </p>
                        </div>
                      </div>
                      <a
                        href={selectedDetail.katalogLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="table-button d-lg-block d-none"
                      >
                        {pathname.includes("/portable-generator")
                          ? t("generator.buyNow")
                          : t("generator.downloadCatalog")}
                      </a>
                    </div>
                    <div className="row">
                      {/* <div className="col-lg-6 col-12 tab-details-image">
                        <img src={selectedDetail.image} alt={selectedDetail.model} />
                      </div> */}
                      <div className="col-lg-12 col-12 tab-details-description">
                        {selectedDetail.content.map((content, index) => (
                          <p key={index}>{content.children[0].text}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratorTab;
