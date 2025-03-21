import React from 'react';
import PageTitle from '../Components/PageTitle';
import ProductMain from '../Components/ProductMain';
import OfferForm from '../Components/OfferForm';
import useFetch from '../hooks/useFetch';
import Loader from '../Components/Loader';

function SesYalitimi() {
  const { data, loading, error, api } = useFetch(
    '/sound-proof-container?populate=MainImage&populate=SoundProofGeneratorData.GeneratorDataDescription&populate=SoundProofGeneratorData.GeneratorDataFeatures&populate=SoundProofGeneratorData.SoundProofGeneratorImage&populate=SoundProofFeatures.FeaturesImage&populate=SoundProofFeatures.SoundProofFeaturItems'
  );

  if (loading) return <div className="loader-container"><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;

  const {
    Title,
    Content,
    MainImage,
    SoundProofGeneratorData,
    SoundProofFeatures,
  } = data;

  return (
    <>
      <PageTitle title={Title} />
      <ProductMain
        image={`${api}${MainImage.url}`}
        content={Content.map(paragraph => paragraph.children.map(child => child.text).join('')).join('<br/>')}
      />

      <div className="generator-container-area">
        {SoundProofGeneratorData.map((generator, index) => (
          <div className="generator-area" key={index}>
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-lg-5 col-12 generator-content">
                  {generator.GeneratorDataDescription.map((desc, descIndex) => (
                    <div className="generator-desc" key={descIndex}>
                      <h4>{desc.Title}</h4>
                      <p>{desc.Dimensions}</p>
                    </div>
                  ))}
                  {generator.GeneratorDataFeatures.map((feature, featureIndex) => (
                    <p key={featureIndex}>・{feature.Feature}</p>
                  ))}
                </div>
                <div className="col-lg-7 col-12 generator-image">
                  <img
                    src={`${api}${generator.SoundProofGeneratorImage.url}`}
                    alt="Generator"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ses-yalitim-features">
        <div className="container features-container">
          <div className="row">
            <div className="col-lg-3 features-head">
              <h2>{SoundProofFeatures.FeaturesTitle}</h2>
              <img
                src={`${api}${SoundProofFeatures.FeaturesImage.url}`}
                alt="Features Icon"
              />
            </div>
            <div className="col-lg-9 features-body">
              <ul>
                {SoundProofFeatures.SoundProofFeaturItems.map((item, index) => (
                  <li key={index}>{item.FeatureName}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <OfferForm />
    </>
  );
}

export default SesYalitimi;
