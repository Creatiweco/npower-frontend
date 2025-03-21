import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { submitForm } from "../hooks/formapi.js";
import { useTranslation } from "react-i18next";

const FormArea = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    formType: "offer",
    companyName: "",
    email: "",
    phone: "",
    productDetails: {},
    message: "",
  });

  const [isOpen, setIsOpen] = useState({
    select1: false,
    select2: false,
    select3: false,
  });

  const toggleOpen = (key) => {
    setIsOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductChange = (e) => {
    setFormData({
      ...formData,
      productDetails: { ...formData.productDetails, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitForm(formData);
      alert(t("form.success"));
      setFormData({
        formType: "offer",
        companyName: "",
        email: "",
        phone: "",
        productDetails: {},
        message: "",
      });
    } catch (error) {
      alert(t("form.error"));
    }
  };

  return (
    <div className="form-area">
      <div className="container form-container">
        <h2>{t("form.title")}</h2>
        <div className="form-title">
          <h3>{t("form.companyInfo")}</h3>
          <h3>{t("form.productInfo")}</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-input-area">
            <div className="form-group">
              <input
                type="text"
                className="company-input"
                name="companyName"
                id="firmaAdi"
                placeholder={t("form.companyName")}
                value={formData.companyName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                className="mail-input"
                name="email"
                id="mail"
                placeholder={t("form.email")}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="phone-input"
                name="phone"
                id="phone"
                placeholder={t("form.phone")}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <div className="custom-select">
                <select
                  onFocus={() => toggleOpen("select1")}
                  onBlur={() => toggleOpen("select1")}
                  name="generatorPower"
                  id="urunBilgisi"
                  onChange={handleProductChange}
                  required
                >
                  <option value="" disabled selected>
                    {t("form.generatorPower")}
                  </option>
                  <option value="10kVa">10 kVa</option>
                  <option value="20kVa">20 kVa</option>
                  <option value="50kVa">50 kVa</option>
                </select>
                <FontAwesomeIcon icon={faAngleDown} className={isOpen.select1 ? "rotate" : ""} />
              </div>

              <div className="custom-select">
                <select
                  onFocus={() => toggleOpen("select2")}
                  onBlur={() => toggleOpen("select2")}
                  name="generatorEngine"
                  id="urunBilgisi"
                  onChange={handleProductChange}
                  required
                >
                  <option value="" disabled selected>
                    {t("form.generatorEngine")}
                  </option>
                  <option value="perkins">Perkins</option>
                  <option value="cummins">Cummins</option>
                </select>
                <FontAwesomeIcon icon={faAngleDown} className={isOpen.select2 ? "rotate" : ""} />
              </div>

              <div className="custom-select">
                <select
                  onFocus={() => toggleOpen("select3")}
                  onBlur={() => toggleOpen("select3")}
                  name="generatorHz"
                  id="urunBilgisi"
                  onChange={handleProductChange}
                  required
                >
                  <option value="" disabled selected>
                    {t("form.generatorHz")}
                  </option>
                  <option value="50Hz">50 Hz</option>
                  <option value="60Hz">60 Hz</option>
                </select>
                <FontAwesomeIcon icon={faAngleDown} className={isOpen.select3 ? "rotate" : ""} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <input
              className="message-input"
              name="message"
              id="message"
              placeholder={t("form.message")}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button className="form-button" type="submit">
            {t("form.send")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormArea;
