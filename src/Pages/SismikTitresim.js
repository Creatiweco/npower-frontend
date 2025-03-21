import React from 'react';
import PageTitle from '../Components/PageTitle';
import ProductMain from '../Components/ProductMain';
import ContactDesc from '../Components/ContactDesc';
import OfferForm from '../Components/OfferForm'; 
import useFetch from '../hooks/useFetch';
import Loader from '../Components/Loader';

function SismikTitresim() {
  const { data, loading, error, api } = useFetch(
    '/seismic-vibration-page?populate=MainImage&populate=RightImage&populate=BrandLogos.Image'
  );

  if (loading) return <div className="loader-container"><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;

  const {
    Title,
    Content,
    LeftSection,
    FeaturesLeft,
    FeaturesRight,
    MainImage,
    RightImage, 
  } = data;

  const contentText = Content?.map((section) => section.children[0]?.text).join('<br><br>') || '';
  const leftSectionText = LeftSection?.map((section) => section.children[0]?.text).join('<br>') || '';
  const featuresLeftText = FeaturesLeft?.map((section) => section.children[0]?.text).join('<br>') || '';
  const featuresRightText = FeaturesRight?.map((section) => section.children[0]?.text).join('<br>') || ''; 

  return (
    <>
      <PageTitle title={Title} />
      <ProductMain 
        image={`${api}${MainImage[0]?.url}`} 
        content={contentText} 
      />

      <div className='seismic-area'>
        <div className='container'>
          <div className="row">
            <div className="col-lg-6 col-12 siesmic-left">
              <p dangerouslySetInnerHTML={{ __html: leftSectionText }} />
            </div>
            <div className="col-lg-6 col-12 siesmic-right">
              <img src={`${api}${RightImage[0]?.url}`} alt='' />
            </div>
          </div>
        </div>
      </div>

      <div className='seismic-features'>
        <div className='container features-container'>
          <div className='row'>
            <div className='col-lg-6 features-left'>
              <p dangerouslySetInnerHTML={{ __html: featuresLeftText }} />
            </div>
            <div className='col-lg-6 features-right'>
              <p dangerouslySetInnerHTML={{ __html: featuresRightText }} />
            </div>
          </div>
        </div>
      </div>

      <ContactDesc /> 
      <OfferForm />
    </>
  );
}

export default SismikTitresim;
