import React from "react";
import { useTranslation } from "react-i18next";

const ContactDesc = () => {
  const { t } = useTranslation();

  return (
    <div className="container contact-desc">
      <p>{t('contact.desc')}</p>
    </div>
  );
};

export default ContactDesc;
