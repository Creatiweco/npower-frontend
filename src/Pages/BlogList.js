import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import FormArea from '../Components/FormArea.js'
import Loader from "../Components/Loader.js";

const BlogItem = ({ img, title, date, link }) => {
  return (
    <div className="blog-list-item">
      <Link to={link}>
        <img src={img} alt={title} />
      </Link>
      <div className="blog-list-description">
        <Link to={link}>
          <h4>{title}</h4>
        </Link>
      </div>
      <div className="blog-meta">
        <Link to={link}>Devamını Oku</Link>
        <p>{date}</p>
      </div>
    </div>
  );
};

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const { data, loading, error, api } = useFetch(
    `/blogs?populate=FeaturedImage&Content.Image&pagination[page]=${currentPage}&pagination[pageSize]=${blogsPerPage}`
  );

  if (loading) return <div className="loader-container"><Loader/></div>;
  if (error) return <p>Hata: {error.message}</p>;

  const blogs = data || [];
  const totalPages = Math.ceil((data?.meta?.pagination?.total || 0) / blogsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const truncateText = (text, wordLimit) => {
  //   const words = text.split(" ");
  //   if (words.length > wordLimit) {
  //     return words.slice(0, wordLimit).join(" ") + "...";
  //   }
  //   return text;
  // };

  return (

    <>
      <div className="blog-list-area container">
        <h2>News</h2>
        <div className="blog-list-grid">
          {blogs.map((blog) => {
            const featuredImage =
              blog.FeaturedImage?.formats?.medium?.url || 
              blog.FeaturedImage?.url || 
              ""; 
  
            const title = blog.Title;
            const date = new Date(blog.PublishedTime).toLocaleDateString("tr-TR");
            const link = `/blogs/${blog.Slug}`;
  
            return (
              <BlogItem
                key={blog.id}
                img={`${api}${featuredImage}`}
                title={title}
                date={date}
                link={link}
              />
            );
          })}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={index + 1 === currentPage ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      
      <FormArea/>
    </>
  );
};

export default BlogList;