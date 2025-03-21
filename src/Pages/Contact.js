import React, { useState } from "react";
import { submitForm } from "../hooks/formapi.js";

function Contact() {
  const [formData, setFormData] = useState({
    formType: "contact",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitForm(formData);
      alert("İletişim formu başarıyla gönderildi!");
      setFormData({
        formType: "contact",
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      alert("Form gönderilirken hata oluştu.");
    }
  };

  return (
    <div className="contact-page">
      <div className="container contact">
        <div className="row">
          <div className="col-lg-6 col-12 contact-left">
            <h3>Contact us</h3>
            <form className="p-0" onSubmit={handleSubmit}>
              <div className="form-group flex-column gap-0 p-0">
                <input type="text" className="company-input mb-20" name="name" id="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                <input type="email" className="mail-input mb-20" name="email" id="mail" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
                <input type="text" className="phone-input mb-20" name="phone" id="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                <input type="text" className="message-input mb-20" name="message" id="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
              </div>
              <button className="form-button w-100" type="submit">Send</button>
            </form>
          </div>
          <div className="col-lg-6 col-12 contact-right">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.4747170596006!2d29.064995176528164!3d40.99298172036579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x14cac7ea10128501%3A0x7f25b9a27a3c5731!2sBusiness%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1734880972945!5m2!1str!2str" title="Harita"></iframe>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default Contact;
