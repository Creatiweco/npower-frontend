import React from 'react';
import Hero from '../Components/hero.js';
import ServicesArea from '../Components/ServicesArea.js';
import CounterArea from '../Components/CounterArea.js';
import FormArea from '../Components/FormArea.js';
import BlogArea from '../Components/BlogArea.js';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import useFetch from '../hooks/useFetch.js';
import Loader from '../Components/Loader.js';

function Home() {
  const { data, loading, error, api } = useFetch(
    '/home-page?populate=Brands.Logo&populate=HeroSection.HeroItem&populate=HeroSection.HeroItem.Image&populate=HeroSection.HeroItem.Background&populate=ServicesSection&populate=ServicesSection.Image&populate=CounterSection.CounterItem.Icon'
  );

  const { data: blogsData, loading: blogsLoading, error: blogsError } = useFetch(
    "/blogs?populate=Content.Image&populate=FeaturedImage"
  );

  if (loading || blogsLoading) return <div className="loader-container"><Loader/></div>;
  if (error || blogsError) return <div>Error: {error?.message || blogsError?.message}</div>;

  const logos = data.Brands?.map((brand) => ({
    id: brand.id,
    url: brand.Logo?.url,
    alt: brand.Logo?.alternativeText || brand.Logo?.name || "Brand Logo",
  })) || [];

  const heroData = data.HeroSection;

  const services = data.ServicesSection?.map((service) => {
    const description = service.Description?.map((desc) =>
      desc.children?.map((child) => child.text).join(' ')
    ).join(' ');

    return {
      id: service.id,
      img: `${api}${service.Image?.[0]?.url}`,
      title: service.Title,
      description: description,
      link: service.Link,
    };
  }) || [];

  const counterSection = data.CounterSection || {};
  const counters = counterSection.CounterItem?.map((counter) => ({
    id: counter.id,
    title: counter.Title,
    value: counter.Value,
    icon: `${api}${counter.Icon?.[0]?.url}`,
  })) || [];

  const blogs = blogsData?.slice(0, 3).map((blog) => {
    const featuredImage =
      blog.FeaturedImage?.formats?.medium?.url ||
      blog.FeaturedImage?.url ||
      "/Assets/default-image.png";

    return {
      id: blog.id,
      title: blog.Title,
      description: blog.Content.find(
        (content) => content.__component === "blog-content.blog-content"
      )?.Content?.[0]?.children?.[0]?.text || "",
      date: new Date(blog.PublishedTime).toLocaleDateString("tr-TR"),
      img: `${api}${featuredImage}`,
      link: `/blogs/${blog.Slug}`,
    };
  }) || [];

  return (
    <>
      <Hero heroData={heroData} api={api} />
      <div className="brand-area">
        <div className="container">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={45}
            slidesPerView={5}
            breakpoints={{
              280: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
            }}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={5000}
          >
            {logos.map((logo) => (
              <SwiperSlide key={logo.id}>
                <img
                  src={api + logo.url}
                  alt={logo.alt}
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
      <ServicesArea services={services} />
      <CounterArea counterSection={counterSection} counters={counters} />
      <FormArea />
      <BlogArea blogs={blogs} />
    </>
  );
}

export default Home;
