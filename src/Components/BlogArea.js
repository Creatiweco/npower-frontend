import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

const trimText = (text, limit) => {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  }
  return text;
};

const BlogItem = ({ img, title, description, date, link }) => {
  const { t } = useTranslation();

  return (
    <div className="blog-item">
      <Link to={link}>
        <img src={img} alt={title} />
      </Link>
      <div className="blog-content">
        <div className="blog-description">
          <Link to={link}>
            <h4>{title}</h4>
          </Link>
          <p>{trimText(description, 15)}</p>
        </div>
        <div className="blog-meta">
          <Link to={link}>{t('blog.more')}</Link>
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
};

const BlogArea = ({ blogs }) => {
  const { t } = useTranslation();

  if (!blogs || blogs.length === 0) return null;

  return (
    <div className="blog-area">
      <div className="container">
        <h2>{t('blog.news')}</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <BlogItem
                img={blog.img}
                title={blog.title}
                description={blog.description}
                date={blog.date}
                link={blog.link}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Link to="/blogs" className="blog-button">
          {t('blog.moreNews')}
        </Link>
      </div>
    </div>
  );
};

export default BlogArea;
