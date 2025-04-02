import React from 'react';
import PageTitle from '../Components/PageTitle';
import ProductMain from '../Components/ProductMain';
import ContactDesc from '../Components/ContactDesc';
import OfferForm from '../Components/OfferForm';
import useFetch from '../hooks/useFetch';
import Loader from '../Components/Loader';

function KurulumMontaj() {
  const { data, loading, error} = useFetch('/installation-page?populate=Image');

  if (loading) return <div className="loader-container"><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;

  const { Title, Content, Image } = data;

  const contentHtml = Content?.map((section) => section.children[0]?.text).join('<br><br>') || '';

  return (
    <>
      <PageTitle title={Title} />
      <ProductMain 
        image={`${Image[0]?.url}`} 
        content={contentHtml} 
      />
      <ContactDesc />
      <OfferForm />
    </>
  );
}

export default KurulumMontaj;
