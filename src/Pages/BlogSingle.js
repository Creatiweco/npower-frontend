import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import FormArea from '../Components/FormArea.js'
import Loader from "../Components/Loader.js";

function BlogSingle() {
  const { slug } = useParams();
  const { data, loading, error, api } = useFetch(
    `/blogs?filters[Slug][$eq]=${slug}&populate=Content.Image&populate=Content.BlogtwocolImage&populate=FeaturedImage`
  );

  if (loading) return <div className="loader-container"><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;

  const blog = data?.[0];
  const featuredImage = blog?.FeaturedImage.url;

  if (!blog) return <div>Blog not found</div>;

  const { Title, Content } = blog;

  return (
    <>
    <div className="blog-single">
      <div className="blog-single-hero">
        <img src={api + featuredImage} alt="Main"/>
        <h2>{Title}</h2>
      </div>
      <div className="blog-single-content container">
        {Content.map((block, index) => {
          switch (block.__component) {
            case "blog-content.blog-image":
              return (
                <div key={index} className="blog-image">
                  <img
                    src={`${api}${block.Image.url}`}
                    alt={block.Caption || "Blog Image"}
                  />
                  {block.Caption && <p>{block.Caption}</p>}
                </div>
              );
            case "blog-content.blog-content":
              return (
                <div key={index} className="blog-text">
                  {block.Content.map((contentBlock, contentIndex) => {
                    if (contentBlock.type === "paragraph") {
                      return (
                        <p
                          key={contentIndex}
                          dangerouslySetInnerHTML={{
                            __html: contentBlock.children
                              .map((child) => child.text)
                              .join(""),
                          }}
                        />
                      );
                    } else if (contentBlock.type === "heading") {
                      return (
                        <h3 key={contentIndex}>
                          {contentBlock.children
                            .map((child) => child.text)
                            .join("")}
                        </h3>
                      );
                    } else if (contentBlock.type === "list") {
                      return (
                        <ul key={contentIndex}>
                          {contentBlock.children.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              {item.children
                                .map((child) => child.text)
                                .join("")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            case "blog-content.blogtwocol-content":
              return (
                <div key={index} className="blog-two-column">
                  <div className="row">
                    <div className="col-md-6">
                      {block.BlogtwocolText.map((contentBlock, textIndex) => {
                        if (contentBlock.type === "heading") {
                          return (
                            <h3 key={textIndex}>
                              {contentBlock.children
                                .map((child) => child.text)
                                .join("")}
                            </h3>
                          );
                        } else if (contentBlock.type === "paragraph") {
                          return (
                            <p
                              key={textIndex}
                              dangerouslySetInnerHTML={{
                                __html: contentBlock.children
                                  .map((child) => child.text)
                                  .join(""),
                              }}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                      <img
                        src={`${api}${block.BlogtwocolImage.url}`}
                        alt="Two Column"
                      />
                    </div>
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
    <FormArea/>
    </>
  );
}

export default BlogSingle;
