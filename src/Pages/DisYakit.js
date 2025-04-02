import React from 'react';
import PageTitle from '../Components/PageTitle';
import ProductMain from '../Components/ProductMain';
import ContactDesc from '../Components/ContactDesc';
import OfferForm from '../Components/OfferForm';
import useFetch from '../hooks/useFetch';
import Loader from '../Components/Loader';

function DisYakit() {
  const { data, loading, error, api } = useFetch(
    '/outer-fuel-tank?populate=Image&populate=OuterFuelTank'
  );

  if (loading) return <div className="loader-container"><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;

  const { Title, Content, Image, OuterFuelTank } = data;

  return (
    <>
      <PageTitle title={Title} />
      <ProductMain 
        image={`${Image[0]?.url}`} 
        content={Content[0]?.children[0]?.text || ''} 
      />
      
      <div className='container panel-types-area'>
        <h2>External Fuel Tank Applications</h2>
        <img className='diagram5 d-lg-flex d-none' src='Assets/image/diagram2.svg' alt='' />
        <img className='diagram6 d-lg-flex d-none' src='Assets/image/diagram3.svg' alt='' />
        <img className='diagram7 d-lg-flex d-none' src='Assets/image/diagram2.svg' alt='' />
        <div className="panel-types">
          {OuterFuelTank.map((panel) => (
            <div key={panel.id} className='panel-items'>
              <p dangerouslySetInnerHTML={{ __html: panel.Title }} />
            </div>
          ))}
        </div>
      </div>

      <ContactDesc />
      <OfferForm />
    </>
  );
}

export default DisYakit;
