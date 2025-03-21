import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";

const AboutCertificate = ({ aboutCertificateData }) => {
  const { t } = useTranslation();

  if (!aboutCertificateData || aboutCertificateData.length === 0) return null;

  return (
    <div className="certificate-area">
      <div className="container">
        <h3>{t('certificate.title')}</h3>
        <p>
          {t('certificate.description')}
        </p>
        <div style={{ position: "relative" }}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            spaceBetween={24}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 0 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {aboutCertificateData.map((certificate, index) => (
              <SwiperSlide key={index}>
                <div className="certificate-item">
                  <img src={certificate.img} alt={certificate.title} />
                  <p>{certificate.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="custom-prev">
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button className="custom-next">
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutCertificate;
