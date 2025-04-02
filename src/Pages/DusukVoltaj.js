import React from 'react';
import PageTitle from '../Components/PageTitle';
import ProductMain from '../Components/ProductMain';
import ContactDesc from '../Components/ContactDesc';
import OfferForm from '../Components/OfferForm';
import useFetch from '../hooks/useFetch';
import Loader from '../Components/Loader';

function DusukVoltaj() {
  const { data, loading, error} = useFetch(
    '/low-voltage-page?populate=MainImage&populate=FeaturesHead.Icon&populate=Brands&populate=FeaturesRight'
  );

  if (loading) return <div className="loader-container"><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;

  const {
    Title,
    Content,
    MainImage,
    FeaturesHead,
    FeaturesLeft,
    FeaturesRight,
  } = data;

  return (
    <>
      <PageTitle title={Title} />
      <ProductMain
        image={`${MainImage.url}`}
        content={Content.map((block) =>
          block.children.map((child) => child.text).join('')
        ).join('<br><br>')}
      />
      <div className="ses-yalitim-features">
        <div className="container features-container">
          <div className="row">
            <div className="col-lg-4 features-head">
              <h2>{FeaturesHead.Title}</h2>
              <img src={`${FeaturesHead.Icon[0]?.url}`} alt="" />
            </div>
            <div className="col-lg-8 features-body">
              <p
                dangerouslySetInnerHTML={{
                  __html: FeaturesHead.FeaturesHeadRight.map((block) =>
                    block.children.map((child) => child.text).join('')
                  ).join('<br><br>'),
                }}
              ></p>
            </div>
          </div>
        </div>

        <div className="container features-container">
          <div className="row">
            <div className="col-lg-7 features-left">
              <p
                dangerouslySetInnerHTML={{
                  __html: FeaturesLeft.map((block) =>
                    block.children.map((child) => child.text).join('')
                  ).join('<br><br>'),
                }}
              ></p>
            </div>
            <div className="col-lg-5 features-right">
              <ul>
                {FeaturesRight.map((feature, index) => (
                  <li key={index}>{feature.FeatureName}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ContactDesc />
      <OfferForm />
    </>
  );
}

export default DusukVoltaj;
