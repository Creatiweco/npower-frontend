import React from "react";
import { useTranslation } from "react-i18next";

const GeneratorDesc = () => {
  const { t } = useTranslation();

  return (
    <div className="container contact-desc">
      <p>{t('contact.generator')}</p>
    </div>
  );
};

export default GeneratorDesc;
