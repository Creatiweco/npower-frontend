import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";

const Brands = ({ brandLogos }) => { 
  const { t } = useTranslation();

  return (
    <div className="brand-area">
      <div className="container">
        <h2>{t('brands.title')}</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={45}
          slidesPerView={5}
          loop={true}
          breakpoints={{
            280: { slidesPerView: 2 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={5000}
        >
          {brandLogos.map((logo, index) => ( 
            <SwiperSlide key={index}>
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                style={{
                  height: "40px",
                  width: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Brands;
