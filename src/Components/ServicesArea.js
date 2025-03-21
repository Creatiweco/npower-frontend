import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const ServicesArea = ({ services }) => {
  const { t } = useTranslation();

  if (!services || services.length === 0) return null;

  return (
    <div className="services-area">
      <div className="container services">
        <h2>{t('services.title')}</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`services-item ${index % 2 === 0 ? 'services-item-left' : 'services-item-right'}`}
            >
              {index % 2 === 0 && <img src={service.img} alt={service.title} />}
              <div className="services-content">
                <h4>{service.title}</h4>
                <p>{service.description}</p>
                <Link to={service.link}>{t('services.detail')}</Link>
              </div>
              {index % 2 !== 0 && <img src={service.img} alt={service.title} />}
            </div>
          ))}
        </div>
        <div className="services-contact">
          <p>{t('services.questions')}</p>
          <Link to="/contact">
            {t('services.call')} <FontAwesomeIcon icon={faPhone} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesArea;
