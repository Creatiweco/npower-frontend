import React from "react";

const ProductMain = ({ image, content }) => {
    return (
        <div className="productmain-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-12 product-icon">
                        <img src={image} alt="product" />
                    </div>
                    <div className="col-lg-8 col-12 product-content">
                        <p dangerouslySetInnerHTML={{ __html: content }}></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductMain;
