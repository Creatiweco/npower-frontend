import React from 'react';
import PageTitle from '../Components/PageTitle';
import ProductMain from '../Components/ProductMain';
import ContactDesc from '../Components/ContactDesc';
import OfferForm from '../Components/OfferForm';
import useFetch from '../hooks/useFetch';
import Loader from '../Components/Loader';

function YakitTanki() {
  const { data, loading, error, api } = useFetch(
    '/fuel-tank-page?populate=Image'
  );

  if (loading) return <div className="loader-container"><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;

  const { Title, Image, Content } = data;

  const imageUrl = Image?.[0]?.url || "";

  const contentHtml = Content?.[0]?.children?.[0]?.text || "";

  console.log(data);

  return (
    <>
      <PageTitle title={Title} />
      <ProductMain 
        image={`${imageUrl}`} 
        content={contentHtml} 
      />
      <ContactDesc />
      <OfferForm />
    </>
  );
}

export default YakitTanki;
